const projectsData = [
    {
        title: "Parcel Prasad (GameJam Project)",
        subtitle: "Itch.io Game Build",
        bullets: [
            "Level Design: Quick Level Design for Gameplay looping and faster traversal of the Player.",
            "Map Artifacts: Blueprint scripting for Multiple Map artifacts and Resource Management."
        ],
        link: "#"
    },
    {
        title: "12 TILES (Unity Game Prototype)",
        subtitle: "Game Prototype Showcase",
        bullets: [
            "Procedural Level Generation: Game uses an unique script which generates the level elements randomly.",
            "Anchor System: Unique Anchor System Design which controls the gameplay loop.",
            "Game Design: Paper Prototyping to Game Generation and all Scripting."
        ],
        link: "#"
    },
    {
        title: "Fast’N’Food Showcase",
        subtitle: "Technical Art & Texture Art",
        bullets: [
            "Developed unique Post Process Shaders using HLSL and Blueprints on Unreal Engine 5.",
            "Created 12+ Post Process Shaders with modular nodes (Toon, Outline, Posterized, Pixelated).",
            "Textured Stylized Assets for Game Props and Food Items."
        ],
        link: "https://docs.google.com/presentation/d/1zor-x2IDyLBThWrv6ZLjsVA44IDvUjAdfcoTEa4GdOU/edit?usp=sharing"
    },
    {
        title: "Post-Process Shaders Showcase",
        subtitle: "HLSL & Technical Art",
        bullets: [
            "Showcase of 12+ Post Process Shaders with modular nodes under different stylized art styles.",
            "Shaders include: Toon Shader, Outline Shader, Posterized Shader, Pixelated Shaders through Unreal.",
            "Creation of Material Functions and HLSL Codes for better Shader Volume functionality."
        ],
        link: "https://docs.google.com/presentation/d/1wW1diNIsfEuRFndMYDs5oWtjH2_nkr4aUaGCNr0zfyk/edit?usp=sharing"
    },
    {
        title: "Road Rush",
        subtitle: "3D Modelling & Texture Art",
        bullets: [
            "Created stylized 3D assets for Vehicles and Cars.",
            "Textured 3D meshes for a stylized look in the Itch.io Game Build.",
            "Focus on creating game-ready assets for a complete pipeline."
        ],
        link: "https://rrover.itch.io/road-rush"
    },
    {
        title: "Malorian 3516 (Cyberpunk 2077)",
        subtitle: "Hard Surface Modelling",
        bullets: [
            "Developed a Combat Revolver 3D asset from scratch using Maya and 3D Substance Painter.",
            "Focus on texture painting for adding depth and boldness, matching the Cyberpunk aesthetic."
        ],
        link: "https://www.artstation.com/artwork/dyLXNW"
    },
    {
        title: "Stylized Nintendo Switch",
        subtitle: "3D Modelling (3DS Max)",
        bullets: [
            "Game Ready 3D mesh created on 3DS Max.",
            "Demonstrated skill in the creation of modular 3D elements."
        ],
        link: "https://www.linkedin.com/posts/artcharlie4li_3dsmax-nintendoswitch-3dmodeling-activity-7319770677018771456-PSDl?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD4NqcAB-_11aoyoLZt7Gtt0SMD7uv1EY9g"
    }
];

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    let html = '';
    
    for (let i = 0; i < projectsData.length; i += 2) {
        if (i + 1 < projectsData.length) {
            html += '<div class="grid md:grid-cols-2 gap-8 mb-8">';
            html += generateProjectCardHTML(projectsData[i]);
            html += generateProjectCardHTML(projectsData[i+1]);
            html += '</div>';
        } else {
            html += '<div class="flex justify-center mb-8">';
            html += '<div class="project-card liquid-glass p-6 w-full md:w-1/2">';
            html += generateProjectCardInteriorHTML(projectsData[i]);
            html += '</div></div>';
        }
    }

    container.innerHTML = html;
}

function generateProjectCardHTML(project) {
    return `<div class="project-card liquid-glass p-6">${generateProjectCardInteriorHTML(project)}</div>`;
}

function generateProjectCardInteriorHTML(project) {
    let bulletsHtml = project.bullets.map(bullet => `
        <li>
            <span class="reveal-holder">
                <span class="reveal-block"></span>
                <span class="reveal-content"><span class="mr-2 text-secondary-pink">⬤</span>${bullet}</span>
            </span>
        </li>
    `).join('');

    return `
        <div>
            <h3 class="text-2xl font-bold mb-2 text-white">
                <span class="reveal-holder">
                    <span class="reveal-block"></span>
                    <span class="reveal-content">${project.title}</span>
                </span>
            </h3>
            <p class="text-sm uppercase text-gray-300 mb-4">
                <span class="reveal-holder">
                    <span class="reveal-block"></span>
                    <span class="reveal-content">${project.subtitle}</span>
                </span>
            </p>
            <ul class="list-none space-y-2 text-sm text-white/90">
                ${bulletsHtml}
            </ul>
        </div>
        <div class="mt-6 project-button-wrapper">
            <a href="${project.link}" target="_self" class="project-button">
                View Project <span class="arrow-icon">➜</span>
            </a>
        </div>
    `;
}

window.addEventListener('DOMContentLoaded', renderProjects);
