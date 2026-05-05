const softwareData = [
    { name: "Unity", icon: "devicon-unity-original" },
    { name: "Unreal Engine 5", icon: "devicon-unrealengine-original" },
    { name: "Godot", icon: "devicon-godot-plain" },
    { name: "Maya", icon: "ph ph-cube" },
    { name: "3D Substance Painter", icon: "ph ph-paint-brush-broad" },
    { name: "Blender", icon: "devicon-blender-original" },
    { name: "Github", icon: "devicon-github-original" },
    { name: "Adobe Photoshop", icon: "devicon-photoshop-plain" },
    { name: "Aseprite", icon: "ph ph-pencil" },
    { name: "C#", icon: "devicon-csharp-plain" },
    { name: "Tailwind Css", icon: "devicon-tailwindcss-original" },
    { name: "GD script", icon: "devicon-godot-plain" },
    { name: "HLSL", icon: "ph ph-file-code" }
];

function renderSoftwares() {
    const container = document.getElementById('softwares-container');
    if (!container) return;

    container.className = "w-full mx-auto";

    // Extra padding on container prevents clipping of box-shadow
    let html = '<div class="marquee-container" style="gap: 2.5rem; padding-top: 2rem; padding-bottom: 2rem;">';
    
    const chunks = [[], [], [], []];
    
    for(let i = 0; i < 4; i++) {
        let offsetItems = [...softwareData].sort(() => 0.5 - Math.random());
        chunks[i] = offsetItems;
    }

    const createTrackHtml = (items, directionClass) => {
        let trackItemsHtml = items.map(item => `
            <div class="marquee-item liquid-glass text-lg font-bold">
                <i class="${item.icon} mr-3 text-2xl text-secondary-pink"></i> 
                ${item.name}
            </div>
        `).join('');
        
        return `<div class="marquee-track ${directionClass}" style="animation-duration: 60s; padding: 0.5rem 0;">
            ${trackItemsHtml}
            ${trackItemsHtml}
            ${trackItemsHtml}
            ${trackItemsHtml}
            ${trackItemsHtml}
            ${trackItemsHtml}
            ${trackItemsHtml}
            ${trackItemsHtml}
        </div>`;
    };

    html += createTrackHtml(chunks[0], 'left');
    html += createTrackHtml(chunks[1], 'right');
    html += createTrackHtml(chunks[2], 'left');
    html += createTrackHtml(chunks[3], 'right');
    
    html += '</div>';
    container.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', renderSoftwares);
