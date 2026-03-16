document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    window.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = 1;
    });

    const clickableSelectors = '.top-nav-button, #scrollToTopBtn, .project-button, #contact-footer a, #contact-footer i';

    document.body.addEventListener('mouseover', e => {
        if (e.target.closest(clickableSelectors)) {
            cursor.classList.add('active');
        }
    });

    document.body.addEventListener('mouseout', e => {
        if (e.target.closest(clickableSelectors)) {
            cursor.classList.remove('active');
        }
    });

    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
});
