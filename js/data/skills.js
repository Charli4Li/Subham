const skillsData = [
    { name: "Game Design", desc: "Well Versed in Game Design Pipelines, Concepts and Unique Gameplay Looping." },
    { name: "Level Design", desc: "Proficient with core principles of level design and Well Acquainted with video games." },
    { name: "Technical Art", desc: "Good Knowledge of Post-Process Shaders and basic HLSL Learning for Shader Creation." },
    { name: "3D Art", desc: "Familiarity with 3D art in game development Pipeline." },
    { name: "Front-End Web Development", desc: "Well versed in Web Design and Development." }
];

function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    let html = '';
    skillsData.forEach(skill => {
        html += `
        <div class="tech-focus-bar tech-bar-anim liquid-glass text-white/90">
            <span class="reveal-holder">
                <span class="reveal-block"></span>
                <span class="reveal-content">
                    <b class="text-secondary-pink">${skill.name}:</b> ${skill.desc}
                </span>
            </span>
        </div>
        `;
    });
    
    container.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', renderSkills);
