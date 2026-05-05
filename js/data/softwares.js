const softwareData = [
    {
        category: "Game Engines & Softwares",
        items: ["Unity", "Unreal Engine 5", "Godot", "Maya", "3D Substance Painter", "Blender", "Github", "Adobe Photoshop", "Aseprite"]
    },
    {
        category: "Languages",
        items: ["C#", "Tailwind Css", "GD script", "HLSL"]
    }
];

function renderSoftwares() {
    const container = document.getElementById('softwares-container');
    if (!container) return;

    let html = '<div class="software-grid-container w-full">';
    
    softwareData.forEach(group => {
        let itemsHtml = group.items.map(item => `
            <li>
                <span class="reveal-holder">
                    <span class="reveal-block"></span>
                    <span class="reveal-content"><span class="mr-2 text-secondary-pink">⬤</span>${item}</span>
                </span>
            </li>
        `).join('');

        html += `
        <div class="software-block software-split-item liquid-glass">
            <p class="font-bold text-lg text-secondary-pink mb-2 border-b border-white/30 w-full pb-1 text-center">
                <span class="reveal-holder">
                    <span class="reveal-block"></span>
                    <span class="reveal-content">${group.category}</span>
                </span>
            </p>
            <ul class="text-sm text-white/90 list-none text-left w-full pl-6">
                ${itemsHtml}
            </ul>
        </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', renderSoftwares);
