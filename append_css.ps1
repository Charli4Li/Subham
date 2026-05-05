$css = @"

/* --- Marquee Animation --- */
@keyframes marquee-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

@keyframes marquee-right {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
}

.marquee-container {
    width: 100%;
    overflow: hidden;
    position: relative;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.marquee-container::before, .marquee-container::after {
    content: `"`;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    z-index: 10;
    pointer-events: none;
}
.marquee-container::before {
    left: 0;
    background: linear-gradient(to right, var(--accent-black), transparent);
}
.marquee-container::after {
    right: 0;
    background: linear-gradient(to left, var(--accent-black), transparent);
}

.marquee-track {
    display: flex;
    width: max-content;
    gap: 1.5rem;
}

.marquee-track.left {
    animation: marquee-left 20s linear infinite;
}

.marquee-track.right {
    animation: marquee-right 20s linear infinite;
}

.marquee-item {
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.marquee-track:hover {
    animation-play-state: paused;
}

/* --- Project Carousel & Dock Layout --- */
.projects-layout {
    transition: all 0.5s ease-out;
}

.projects-carousel {
    display: flex;
    overflow-x: hidden;
    gap: 2rem;
    padding: 2rem 1rem;
    width: 100%;
    position: relative;
    scroll-behavior: smooth;
    cursor: pointer;
}

.projects-carousel-track {
    display: flex;
    gap: 2rem;
    width: max-content;
    animation: marquee-left 40s linear infinite;
}
.projects-carousel-track:hover {
    animation-play-state: paused;
}

.folder-card {
    min-width: 320px;
    max-width: 350px;
    height: 250px;
    border-radius: 0.5rem 1rem 0.5rem 0.5rem;
    position: relative;
    transition: all 0.4s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

/* Folder Tab styling */
.folder-card::before {
    content: `"`;
    position: absolute;
    top: -20px;
    left: -1px;
    width: 40%;
    height: 22px;
    background-color: rgba(20, 20, 20, 0.2);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 157, 227, 0.5);
    border-bottom: none;
    border-radius: 0.5rem 0.5rem 0 0;
    z-index: -1;
}

.folder-card:hover {
    transform: translateY(-10px);
}

.projects-dock-layout {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: flex-start;
}

.projects-dock-left {
    flex: 0 0 300px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 600px;
    overflow-y: auto;
    padding-right: 1rem;
}

.projects-dock-left::-webkit-scrollbar {
    width: 6px;
}
.projects-dock-left::-webkit-scrollbar-thumb {
    background: var(--secondary-pink);
    border-radius: 10px;
}

.dock-item {
    padding: 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0.6;
}

.dock-item.active, .dock-item:hover {
    opacity: 1;
    transform: translateX(10px);
    border-left: 4px solid var(--secondary-pink);
}

.projects-preview-right {
    flex: 1;
    min-height: 500px;
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    animation: fade-in 0.5s ease-out forwards;
}

@keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
    .projects-dock-layout {
        flex-direction: column;
    }
    .projects-dock-left {
        flex: 1;
        max-height: 200px;
        flex-direction: row;
        overflow-x: auto;
        overflow-y: hidden;
        width: 100%;
        padding-right: 0;
        padding-bottom: 1rem;
    }
    .dock-item {
        min-width: 200px;
    }
    .dock-item.active, .dock-item:hover {
        transform: translateY(-5px);
        border-left: none;
        border-bottom: 4px solid var(--secondary-pink);
    }
}
"@

Add-Content -Path "C:\Users\Charlie\Documents\GitHub\Subham\css\styles.css" -Value $css
