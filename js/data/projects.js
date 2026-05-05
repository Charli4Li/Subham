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

// Global state
let currentProjectViewMode = 'carousel'; // 'carousel' or 'split'
let currentProjectIndex = 0;

function renderProjectsCarousel() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    currentProjectViewMode = 'carousel';

    let html = '<div class="projects-layout projects-carousel">';
    
    // We duplicate the items inside the track so it can scroll infinitely
    const createFolderItems = () => {
        return projectsData.map((project, index) => `
            <div class="folder-card liquid-glass" onclick="renderProjectsSplitView(${index})">
                <i class="ph ph-folder-open text-6xl text-secondary-pink mb-4"></i>
                <h3 class="text-xl font-bold text-white mb-2 px-4">${project.title}</h3>
                <p class="text-xs uppercase text-gray-300">${project.subtitle}</p>
                <div class="mt-4 text-xs font-light text-secondary-pink/70">
                    <i class="ph ph-magnifying-glass"></i> Click to Open
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
}

window.renderProjectsSplitView = function(selectedIndex) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    currentProjectViewMode = 'split';
    currentProjectIndex = selectedIndex;

    const selectedProject = projectsData[selectedIndex];

    // Left Dock (Titles)
    let dockHtml = '<div class="projects-dock-left">';
    projectsData.forEach((project, index) => {
        const isActive = index === selectedIndex ? 'active liquid-glass' : '';
        dockHtml += `
            <div class="dock-item ${isActive} bg-white/5 border border-white/10" onclick="renderProjectsSplitView(${index})">
                <p class="font-bold text-sm text-white">${project.title}</p>
            </div>
        `;
    });
    
    // Back to folders button
    dockHtml += `
        <div class="mt-4 text-center">
            <button onclick="renderProjectsCarousel()" class="top-nav-button text-sm w-full">
                <i class="ph ph-arrow-left"></i> Back to Folders
            </button>
        </div>
    `;
    dockHtml += '</div>';

    // Right Preview
    let bulletsHtml = selectedProject.bullets.map(bullet => `
        <li>
            <span class="mr-2 text-secondary-pink">⬤</span>${bullet}
        </li>
    `).join('');

    let previewHtml = `
        <div class="projects-preview-right liquid-glass">
            <div class="flex justify-between items-start mb-6 border-b border-white/20 pb-4">
                <div>
                    <h2 class="text-3xl font-extrabold text-secondary-pink mb-2">${selectedProject.title}</h2>
                    <p class="text-sm uppercase tracking-widest text-gray-300">Directory: /${selectedProject.directory}/</p>
                </div>
                <i class="ph ph-folder-open text-5xl text-white/20"></i>
            </div>
            
            <div class="flex-1">
                <h4 class="text-lg font-bold mb-4 text-white">Project Details</h4>
                <ul class="list-none space-y-3 text-sm text-white/90 mb-8">
                    ${bulletsHtml}
                </ul>
                
                <div class="w-full h-48 bg-black/40 rounded-lg border border-white/10 flex items-center justify-center mb-8 relative overflow-hidden">
                    <i class="ph ph-image text-4xl text-white/20 mb-2"></i>
                    <p class="text-xs text-white/30 absolute bottom-4">Preview Image Placeholder</p>
                </div>
            </div>
            
            <div class="mt-auto">
                <a href="${selectedProject.link}" target="_blank" class="project-button inline-flex">
                    Access File Data <span class="arrow-icon">➜</span>
                </a>
            </div>
        </div>
    `;

    let html = `
        <div class="projects-layout projects-dock-layout">
            ${dockHtml}
            ${previewHtml}
        </div>
    `;

    container.innerHTML = html;
};

// Initial load
window.addEventListener('DOMContentLoaded', renderProjectsCarousel);
