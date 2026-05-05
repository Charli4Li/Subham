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

    // Reset max-width on the container so the marquee can stretch full width
    container.className = "w-full mx-auto";

    let html = '<div class="marquee-container">';
    
    let allItems = [];
    softwareData.forEach(group => {
        group.items.forEach(item => {
            allItems.push(`<span class="mr-2 text-secondary-pink">⬤</span> <span class="text-xs font-light text-white/50 mr-2 uppercase tracking-widest">[${group.category}]</span> <span class="text-white/90 font-bold">${item}</span>`);
        });
    });

    // We'll shuffle or just split them
    const track1 = allItems.slice(0, 7);
    const track2 = allItems.slice(7);

    const createTrackHtml = (items, directionClass) => {
        let trackItemsHtml = items.map(item => `
            <div class="marquee-item liquid-glass">
                ${item}
            </div>
        `).join('');
        
        // Duplicate items extensively to guarantee a seamless loop even on ultra-wide monitors
        return `<div class="marquee-track ${directionClass}">
            ${trackItemsHtml}
            ${trackItemsHtml}
            ${trackItemsHtml}
            ${trackItemsHtml}
        </div>`;
    };

    html += createTrackHtml(track1, 'left');
    html += createTrackHtml(track2, 'right');
    
    html += '</div>';
    container.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', renderSoftwares);
