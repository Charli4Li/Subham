const softwareData = [
    { name: "Unity", icon: "devicon-unity-original" },
    { name: "Unreal Engine 5", icon: "devicon-unrealengine-original" },
    { name: "Godot", icon: "devicon-godot-plain" },
    { name: "Maya", icon: "devicon-maya-plain" },
    { name: "3D Substance Painter", icon: "ph ph-cube" },
    { name: "Blender", icon: "devicon-blender-original" },
    { name: "Github", icon: "devicon-github-original" },
    { name: "Adobe Photoshop", icon: "devicon-photoshop-plain" },
    { name: "Aseprite", icon: "ph ph-paint-brush" },
    { name: "C#", icon: "devicon-csharp-plain" },
    { name: "Tailwind Css", icon: "devicon-tailwindcss-original" },
    { name: "GD script", icon: "devicon-godot-plain" },
    { name: "HLSL", icon: "ph ph-file-code" }
];

function renderSoftwares() {
    const container = document.getElementById('softwares-container');
    if (!container) return;

    container.className = "w-full mx-auto";

    let html = '<div class="marquee-container" style="gap: 2rem;">';
    
    // We will create 4 rows.
    // Let's divide our items into 4 somewhat randomized chunks.
    const chunks = [[], [], [], []];
    
    // Fill chunks to ensure there are plenty of items
    for(let i = 0; i < 4; i++) {
        // Just push all items but shuffled or offset
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
        
        // 8 duplicates to guarantee no blank spaces
        return `<div class="marquee-track ${directionClass}" style="animation-duration: 60s;">
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
