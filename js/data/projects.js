const projectsData = [
    {
        title: "Parcel Prasad (GameJam Project)",
        subtitle: "Itch.io Game Build",
        bullets: [
            "Level Design: Quick Level Design for Gameplay looping and faster traversal of the Player.",
            "Map Artifacts: Blueprint scripting for Multiple Map artifacts and Resource Management."
        ],
        link: "#",
        directory: "projects/parcel_prasad"
    },
    {
        title: "12 TILES (Unity Game Prototype)",
        subtitle: "Game Prototype Showcase",
        bullets: [
            "Procedural Level Generation: Game uses an unique script which generates the level elements randomly.",
            "Anchor System: Unique Anchor System Design which controls the gameplay loop.",
            "Game Design: Paper Prototyping to Game Generation and all Scripting."
        ],
        link: "#",
        directory: "projects/12_tiles"
    },
    {
        title: "Fast’N’Food Showcase",
        subtitle: "Technical Art & Texture Art",
        bullets: [
            "Developed unique Post Process Shaders using HLSL and Blueprints on Unreal Engine 5.",
            "Created 12+ Post Process Shaders with modular nodes (Toon, Outline, Posterized, Pixelated).",
            "Textured Stylized Assets for Game Props and Food Items."
        ],
        link: "https://docs.google.com/presentation/d/1zor-x2IDyLBThWrv6ZLjsVA44IDvUjAdfcoTEa4GdOU/edit?usp=sharing",
        directory: "projects/fastnfood"
    },
    {
        title: "Post-Process Shaders Showcase",
        subtitle: "HLSL & Technical Art",
        bullets: [
            "Showcase of 12+ Post Process Shaders with modular nodes under different stylized art styles.",
            "Shaders include: Toon Shader, Outline Shader, Posterized Shader, Pixelated Shaders through Unreal.",
            "Creation of Material Functions and HLSL Codes for better Shader Volume functionality."
        ],
        link: "https://docs.google.com/presentation/d/1wW1diNIsfEuRFndMYDs5oWtjH2_nkr4aUaGCNr0zfyk/edit?usp=sharing",
        directory: "projects/post_process_shaders"
    },
    {
        title: "Road Rush",
        subtitle: "3D Modelling & Texture Art",
        bullets: [
            "Created stylized 3D assets for Vehicles and Cars.",
            "Textured 3D meshes for a stylized look in the Itch.io Game Build.",
            "Focus on creating game-ready assets for a complete pipeline."
        ],
        link: "https://rrover.itch.io/road-rush",
        directory: "projects/road_rush"
    },
    {
        title: "Malorian 3516 (Cyberpunk 2077)",
        subtitle: "Hard Surface Modelling",
        bullets: [
            "Developed a Combat Revolver 3D asset from scratch using Maya and 3D Substance Painter.",
            "Focus on texture painting for adding depth and boldness, matching the Cyberpunk aesthetic."
        ],
        link: "https://www.artstation.com/artwork/dyLXNW",
        directory: "projects/malorian_3516"
    },
    {
        title: "Stylized Nintendo Switch",
        subtitle: "3D Modelling (3DS Max)",
        bullets: [
            "Game Ready 3D mesh created on 3DS Max.",
            "Demonstrated skill in the creation of modular 3D elements."
        ],
        link: "https://www.linkedin.com/posts/artcharlie4li_3dsmax-nintendoswitch-3dmodeling-activity-7319770677018771456-PSDl?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD4NqcAB-_11aoyoLZt7Gtt0SMD7uv1EY9g",
        directory: "projects/nintendo_switch"
    }
];

// Inject dynamic CSS for Folder shape, drop-shadow glow wrapper, and transitions
const style = document.createElement('style');
style.innerHTML = `
.folder-glow-wrapper {
    /* Apply the pink glow using drop-shadow so it respects the clip-path shape of the child! */
    filter: drop-shadow(0 0 15px rgba(255, 157, 227, 0.4));
    transition: transform 0.4s ease, filter 0.4s ease;
    cursor: pointer;
    /* Extra padding to ensure glow is not clipped by wrapper bounds */
    padding: 1rem;
}
.folder-glow-wrapper:hover {
    transform: translateY(-10px);
    filter: drop-shadow(0 0 25px rgba(255, 157, 227, 0.7));
}
.true-folder-shape {
    /* Precise folder shape matching reference */
    clip-path: polygon(0 8%, 35% 8%, 42% 0, 100% 0, 100% 100%, 0 100%);
    background: rgba(20, 20, 20, 0.6) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    border: none !important;
    /* Height matched to slides view */
    min-width: 350px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
}
.true-folder-shape::before { display: none !important; }
.fade-transition {
    transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
}
.fade-out {
    opacity: 0;
    transform: scale(0.98);
}
.fade-in {
    opacity: 1;
    transform: scale(1);
}
/* Allow shadows to bleed outside carousel */
.projects-carousel, .projects-carousel-track {
    overflow-y: visible !important;
    padding-top: 2rem;
    padding-bottom: 2rem;
}
`;
document.head.appendChild(style);


let currentProjectViewMode = 'carousel'; 
let currentProjectIndex = 0;

window.renderProjectsCarousel = function(withFade = false) {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    // Animate out if content exists
    if (withFade && container.innerHTML.trim() !== '') {
        container.classList.remove('fade-in');
        container.classList.add('fade-out');
        setTimeout(() => buildCarouselHTML(container), 400);
    } else {
        buildCarouselHTML(container);
    }
}

function buildCarouselHTML(container) {
    currentProjectViewMode = 'carousel';

    let html = '<div class="projects-layout projects-carousel w-full">';
    
    const createFolderItems = () => {
        return projectsData.map((project, index) => `
            <div class="folder-glow-wrapper" onclick="renderProjectsSplitView(${index})">
                <div class="true-folder-shape">
                    <h3 class="text-2xl font-extrabold text-white px-4">${project.title}</h3>
                </div>
            </div>
        `).join('');
    };

    html += `<div class="projects-carousel-track">
        ${createFolderItems()}
        ${createFolderItems()}
        ${createFolderItems()}
    </div>`;
    
    html += '</div>';
    
    container.innerHTML = html;
    
    // Force reflow
    void container.offsetWidth;
    
    // Animate in
    container.classList.remove('fade-out');
    container.classList.add('fade-transition', 'fade-in');
}

window.renderProjectsSplitView = function(selectedIndex) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    // Animate out
    container.classList.remove('fade-in');
    container.classList.add('fade-out');

    setTimeout(() => {
        buildSplitViewHTML(container, selectedIndex);
    }, 400);
};

function buildSplitViewHTML(container, selectedIndex) {
    currentProjectViewMode = 'split';
    currentProjectIndex = selectedIndex;

    const selectedProject = projectsData[selectedIndex];

    // Left Dock (Titles) - full bleed to left
    let dockHtml = '<div class="projects-dock-left" style="flex: 0 0 350px; border-right: 1px solid rgba(255,157,227,0.2);">';
    projectsData.forEach((project, index) => {
        const isActive = index === selectedIndex ? 'active' : 'opacity-70';
        dockHtml += `
            <div class="dock-item ${isActive} liquid-glass w-full border border-white/10" onclick="renderProjectsSplitView(${index})">
                <p class="font-bold text-sm text-white">${project.title}</p>
            </div>
        `;
    });
    
    dockHtml += `
        <div class="mt-8 text-center">
            <button onclick="renderProjectsCarousel(true)" class="liquid-glass text-white font-bold text-sm w-full py-4 transition hover:bg-secondary-pink/20">
                <i class="ph ph-arrow-left"></i> Back to Folders
            </button>
        </div>
    `;
    dockHtml += '</div>';

    // Right Preview
    let bulletsHtml = selectedProject.bullets.map(bullet => `
        <li class="mb-2">
            <span class="mr-2 text-secondary-pink">⬤</span>${bullet}
        </li>
    `).join('');

    let previewHtml = `
        <div class="projects-preview-right liquid-glass" style="flex: 1; min-height: 500px;">
            <div class="flex justify-between items-start mb-6 border-b border-white/20 pb-4">
                <div>
                    <h2 class="text-4xl font-extrabold text-secondary-pink mb-2">${selectedProject.title}</h2>
                    <p class="text-sm uppercase tracking-widest text-gray-300">Directory: /${selectedProject.directory}/</p>
                </div>
                <i class="ph ph-folder-open text-6xl text-white/20"></i>
            </div>
            
            <div class="flex-1 mt-4">
                <h4 class="text-xl font-bold mb-4 text-white">Project Details</h4>
                <ul class="list-none space-y-3 text-base text-white/90 mb-8 max-w-3xl">
                    ${bulletsHtml}
                </ul>
                
                <div class="w-full h-80 bg-black/40 rounded-lg border border-white/10 flex flex-col items-center justify-center mb-8 relative overflow-hidden">
                    <i class="ph ph-image text-6xl text-white/20 mb-4"></i>
                    <p class="text-sm uppercase tracking-widest text-white/30">Preview Image Directory</p>
                </div>
            </div>
            
            <div class="mt-auto">
                <a href="${selectedProject.link}" target="_blank" class="liquid-glass inline-flex text-lg px-8 py-4 text-white font-bold hover:bg-secondary-pink/20 transition">
                    Access File Data <span class="arrow-icon ml-2">➜</span>
                </a>
            </div>
        </div>
    `;

    let html = `
        <div class="projects-layout projects-dock-layout w-full max-w-full">
            ${dockHtml}
            ${previewHtml}
        </div>
    `;

    container.innerHTML = html;

    // Force reflow
    void container.offsetWidth;

    // Animate in
    container.classList.remove('fade-out');
    container.classList.add('fade-in');
}

window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('projects-container');
    if (container) {
        container.classList.add('fade-transition');
    }
    renderProjectsCarousel();
});
