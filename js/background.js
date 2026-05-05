function initThreeBackground() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
        window.innerWidth / -2, window.innerWidth / 2,
        window.innerHeight / 2, window.innerHeight / -2,
        1, 1000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const size = 4;

    const capsuleGeo = new THREE.SphereGeometry(size * 0.45, 8, 8);
    capsuleGeo.applyMatrix4(new THREE.Matrix4().makeScale(1, 2.5, 1));

    const geometries = [
        new THREE.BoxGeometry(size, size, size),
        capsuleGeo,
        new THREE.TetrahedronGeometry(size * 0.7),
        new THREE.OctahedronGeometry(size * 0.6)
    ];

    const pinkColor = new THREE.Color(0xFF9DE3);
    const whiteColor = new THREE.Color(0xFFFFFF);

    const material = new THREE.MeshBasicMaterial({
        color: whiteColor,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending
    });

    const shapes = [];
    const GRID_SPACING = 30;
    const cols = Math.ceil(window.innerWidth / GRID_SPACING) + 2;
    const rows = Math.ceil(window.innerHeight / GRID_SPACING) + 2;

    const group = new THREE.Group();
    scene.add(group);

    const startX = -(cols * GRID_SPACING) / 2;
    const startY = (rows * GRID_SPACING) / 2;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const geo = geometries[Math.floor(Math.random() * geometries.length)];
            const mesh = new THREE.Mesh(geo, material.clone());

            const gridX = startX + c * GRID_SPACING;
            const gridY = startY - r * GRID_SPACING;

            mesh.position.set(-window.innerWidth, (Math.random() - 0.5) * window.innerHeight, 0);

            mesh.userData = {
                originX: gridX,
                originY: gridY,
                rotSpeedX: (Math.random() - 0.5) * 0.01,
                rotSpeedY: (Math.random() - 0.5) * 0.01,
                rotSpeedZ: (Math.random() - 0.5) * 0.01,
                timerOffset: Math.random() * 100
            };

            group.add(mesh);
            shapes.push(mesh);
        }
    }

    const MAX_LIGHT_RADIUS = 450;
    const MAX_INNER_RADIUS = 250;
    const MAX_REPEL_RADIUS = 100;

    let currentLightRadius = 0;
    let currentInnerRadius = 0;
    let currentRepelRadius = 0;

    let mouseX = -9999;
    let mouseY = -9999;
    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let timer = 0;

    let animationPhase = 'explode';
    let repelEnabled = false;

    let physicsWeight = 0;

    window.addEventListener('mousemove', (e) => {
        targetMouseX = e.clientX - window.innerWidth / 2;
        targetMouseY = -(e.clientY - window.innerHeight / 2);
    });

    window.enableRepel = () => { repelEnabled = true; };

    function animate() {
        requestAnimationFrame(animate);
        timer += 0.005;

        mouseX += (targetMouseX - mouseX) * 0.1;
        mouseY += (targetMouseY - mouseY) * 0.1;

        if (repelEnabled) {
            currentLightRadius += (MAX_LIGHT_RADIUS - currentLightRadius) * 0.015;
            currentInnerRadius += (MAX_INNER_RADIUS - currentInnerRadius) * 0.015;
            currentRepelRadius += (MAX_REPEL_RADIUS - currentRepelRadius) * 0.015;
        }

        if (animationPhase === 'interactive' && physicsWeight < 1.0) {
            physicsWeight += 0.005;
            if (physicsWeight > 1.0) physicsWeight = 1.0;
        }

        shapes.forEach(mesh => {
            const u = mesh.userData;

            mesh.rotation.x += u.rotSpeedX;
            mesh.rotation.y += u.rotSpeedY;
            mesh.rotation.z += u.rotSpeedZ;

            let targetX = u.originX;
            let targetY = u.originY;

            const driftX = Math.sin(timer + u.originY * 0.01) * 10;
            const driftY = Math.cos(timer + u.originX * 0.01) * 10;

            let repelX = 0;
            let repelY = 0;
            const dx = mouseX - mesh.position.x;
            const dy = mouseY - mesh.position.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < currentRepelRadius && currentRepelRadius > 1) {
                const angle = Math.atan2(dy, dx);
                const repelDist = (1 - dist / currentRepelRadius) * 20;
                repelX = -Math.cos(angle) * repelDist;
                repelY = -Math.sin(angle) * repelDist;
            }

            targetX += (driftX + repelX) * physicsWeight;
            targetY += (driftY + repelY) * physicsWeight;

            mesh.position.x += (targetX - mesh.position.x) * 0.05;
            mesh.position.y += (targetY - mesh.position.y) * 0.05;

            if (animationPhase === 'explode' && mesh.material.opacity < 0.4) {
                mesh.material.opacity += 0.01;
            }

            if (physicsWeight > 0.1) {
                let targetOpacity = 0;
                let isLiquid = false;

                if (dist < currentLightRadius && currentLightRadius > 1) {
                    isLiquid = true;
                    if (dist < currentInnerRadius) {
                        if (currentInnerRadius > 1) targetOpacity = dist / currentInnerRadius;
                    } else {
                        if ((currentLightRadius - currentInnerRadius) > 1) {
                            targetOpacity = 1 - ((dist - currentInnerRadius) / (currentLightRadius - currentInnerRadius));
                        }
                    }
                    targetOpacity = Math.max(0, Math.min(1, targetOpacity));

                    mesh.material.opacity += (targetOpacity - mesh.material.opacity) * 0.1;
                } else {
                    const pulse = (Math.sin(timer * 0.5 + u.timerOffset) + 1) / 2;
                    const starOpacity = pulse * 0.4;

                    mesh.material.opacity += (starOpacity - mesh.material.opacity) * 0.05;
                    mesh.material.color.set(whiteColor);
                }

                if (isLiquid && mesh.material.opacity > 0.05) {
                    mesh.material.color.lerp(pinkColor, 0.1);
                    const targetScale = 1.5;
                    mesh.scale.setScalar(mesh.scale.x + (targetScale - mesh.scale.x) * 0.1);
                } else {
                    const targetScale = 0.8;
                    mesh.scale.setScalar(mesh.scale.x + (targetScale - mesh.scale.x) * 0.1);
                }
            }
        });

        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        camera.left = window.innerWidth / -2;
        camera.right = window.innerWidth / 2;
        camera.top = window.innerHeight / 2;
        camera.bottom = window.innerHeight / -2;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();

    setTimeout(() => {
        animationPhase = 'interactive';
    }, 1500);
}

window.addEventListener('load', initThreeBackground);
