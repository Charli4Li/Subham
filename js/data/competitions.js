const competitionsData = [
    {
        title: "Technex GameJam by IIT Banaras Hindu University",
        date: "Feb 2026 - Mar 2026",
        description: "Secured 3rd Position in Technex GameJam hosted by IIT Banaras Hindu University (BHU) for the Game Chunk The Robot a 2D Side Scroller."
    },
    {
        title: "Better Grounds Program by tGELF and Krafton - 2nd Position",
        date: "Jun 2025 - Aug 2025",
        description: "Secured 2nd Position in Better Grounds Program hosted by The Global Education & Leadership Foundation (tGELF) Partnered with Krafton. Position secured with Fast’N’Food a Food Service Game."
    }
];

function renderCompetitions() {
    const container = document.getElementById('competitions-container');
    if (!container) return;

    let html = '';
    
    competitionsData.forEach((comp, index) => {
        html += `
        <div class="project-card liquid-glass p-6 mb-8 w-full">
            <div>
                <h3 class="text-2xl font-bold mb-2 text-white flex justify-between items-end flex-wrap gap-2">
                    <span class="reveal-holder">
                        <span class="reveal-block"></span>
                        <span class="reveal-content">${comp.title}</span>
                    </span>
                    <span class="text-sm font-light text-secondary-pink">
                        <span class="reveal-holder">
                            <span class="reveal-block"></span>
                            <span class="reveal-content">${comp.date}</span>
                        </span>
                    </span>
                </h3>
                <ul class="list-none space-y-2 text-sm text-white/90 mt-4">
                    <li>
                        <span class="reveal-holder">
                            <span class="reveal-block"></span>
                            <span class="reveal-content"><span class="mr-2 text-secondary-pink">⬤</span>${comp.description}</span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        `;
    });

    container.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', renderCompetitions);
