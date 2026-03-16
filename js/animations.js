const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function smoothScroll(targetElement) {
    const targetTop = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetTop;
    const duration = 700;
    let startTime = null;

    function step(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(1, timeElapsed / duration);
        const easeOutQuad = t => t * (2 - t);
        const easedProgress = easeOutQuad(progress);
        window.scrollTo({ top: startPosition + distance * easedProgress, left: 0, behavior: 'auto' });
        if (progress < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

document.getElementById('top-nav')?.addEventListener('click', function (e) {
    const targetLink = e.target.closest('.top-nav-button');
    if (targetLink) {
        e.preventDefault();
        const targetId = targetLink.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) smoothScroll(targetElement);
    }
});

const topbar = document.getElementById('topbar-nav');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (topbar && scrollToTopBtn) {
    window.addEventListener('scroll', function () {
        const topbarBottom = topbar.getBoundingClientRect().bottom;
        if (topbarBottom < 0) {
            scrollToTopBtn.classList.remove('hidden-transition');
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.add('hidden-transition');
            scrollToTopBtn.classList.remove('visible');
        }
    });
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function enableNameInteraction() {
    const nameWrapper = document.querySelector('.name-wrapper');
    if (nameWrapper) {
        nameWrapper.classList.add('name-interactive');
    }
}

const nameTitle = document.getElementById('name-title');
if (nameTitle) {
    const text = nameTitle.innerText;
    nameTitle.innerHTML = '';

    const wrapper = document.createElement('span');
    wrapper.className = 'name-wrapper';

    text.split('').forEach(char => {
        let span;
        if (char === ' ') {
            span = document.createElement('span');
            span.className = 'name-char';
            span.style.display = 'inline-block';
            span.style.width = '0.3em';
            span.innerHTML = '&nbsp;';
            span.setAttribute('data-char', ' ');
        } else {
            span = document.createElement('span');
            span.className = 'name-char';
            span.innerText = char;
            span.setAttribute('data-char', char);
        }

        span.addEventListener('mouseenter', () => {
            if (!wrapper.classList.contains('name-interactive')) return;

            const allChars = Array.from(document.querySelectorAll('.name-char'));
            const index = allChars.indexOf(span);
            allChars.forEach((c, i) => {
                const distance = Math.abs(index - i);
                let lift = 0;
                if (distance === 0) lift = -35;
                else if (distance === 1) lift = -20;
                else if (distance === 2) lift = -10;
                if (lift !== 0) c.style.transform = `translateY(${lift}px)`;
                else c.style.transform = 'translateY(0)';
            });
        });

        wrapper.appendChild(span);
    });

    nameTitle.appendChild(wrapper);
    nameTitle.addEventListener('mouseleave', () => {
        document.querySelectorAll('.name-char').forEach(c => c.style.transform = 'translateY(0)');
    });
}

const cardObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProjectCard(entry.target);
            cardObserver.unobserve(entry.target);
        }
    });
}, cardObserverOptions);

async function animateProjectCard(card) {
    card.classList.add('card-visible');
    await wait(600);
    const revealElements = card.querySelectorAll('.reveal-holder');
    for (let i = 0; i < revealElements.length; i++) {
        const el = revealElements[i];
        el.classList.add('animate-reveal');
        await wait(200);
    }
    const btn = card.querySelector('.project-button-wrapper');
    if (btn) btn.classList.add('btn-visible');
    await wait(500);
    card.classList.add('interaction-ready');
}

function initObservers() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => cardObserver.observe(card));

    const techBars = document.querySelectorAll('.tech-bar-anim');
    const skillSection = document.getElementById('skills');
    const skillObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            triggerStagger(techBars, 300);
            skillObserver.disconnect();
        }
    }, { threshold: 0.1 });
    if (skillSection) skillObserver.observe(skillSection);

    const softwareContainer = document.querySelector('.software-grid-container');
    const softwareObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateSoftwareSplit();
            softwareObserver.disconnect();
        }
    }, { threshold: 0.1 });
    if (softwareContainer) softwareObserver.observe(softwareContainer);

    const aboutSection = document.getElementById('about');
    const aboutObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            document.querySelectorAll('.about-text-block, .about-image-container')
                .forEach(block => block.classList.add('interaction-ready'));
            aboutObserver.disconnect();
        }
    }, { threshold: 0.3 });
    if (aboutSection) aboutObserver.observe(aboutSection);

    const footer = document.getElementById('contact-footer');
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add('pop-up');
            }
        });
    }, { threshold: 0.1 });
    if (footer) footerObserver.observe(footer);
}

async function animateTechBar(bar) {
    bar.classList.add('bar-expanded');
    await wait(800);
    const revealElements = bar.querySelectorAll('.reveal-holder');
    for (let i = 0; i < revealElements.length; i++) {
        revealElements[i].classList.add('animate-reveal');
        await wait(100);
    }
    await wait(600);
    bar.classList.add('interaction-ready');
}

async function animateSoftwareSplit() {
    const softwareItems = document.querySelectorAll('.software-split-item');
    softwareItems.forEach(item => {
        item.classList.add('split-active');
        item.style.visibility = 'visible';
    });
    await wait(1000);
    for (let i = 0; i < softwareItems.length; i++) {
        const item = softwareItems[i];
        const revealElements = item.querySelectorAll('.reveal-holder');
        for (let j = 0; j < revealElements.length; j++) {
            revealElements[j].classList.add('animate-reveal');
            await wait(50);
        }
        item.classList.add('interaction-ready');
    }
}

async function triggerStagger(elements, delay) {
    for (let i = 0; i < elements.length; i++) {
        animateTechBar(elements[i]);
        await wait(delay);
    }
}

window.onload = function () {
    setTimeout(() => {
        const wrapper = document.querySelector('.name-wrapper');
        if (wrapper) wrapper.classList.add('split');

        const chars = document.querySelectorAll('.name-char');
        chars.forEach((c, i) => {
            setTimeout(() => {
                c.classList.add('visible');
            }, i * 50);
        });
    }, 400);

    setTimeout(() => {
        const jobBox = document.querySelector('.job-title-box');
        if (jobBox) jobBox.classList.add('expanded');
    }, 1100);

    setTimeout(async () => {
        const jobBox = document.querySelector('.job-title-box');
        if (jobBox) {
            jobBox.style.overflow = 'visible';

            const reveals = jobBox.querySelectorAll('.reveal-holder');
            for (let i = 0; i < reveals.length; i++) {
                const content = reveals[i].querySelector('.job-item');
                if (content) content.classList.add('revealed');

                reveals[i].classList.add('animate-reveal');

                const nextSep = reveals[i].nextElementSibling;
                if (nextSep && nextSep.classList.contains('separator')) {
                    nextSep.classList.add('revealed');
                }

                await wait(200);
            }
        }
    }, 1800);

    setTimeout(() => {
        const topbar = document.getElementById('topbar-nav');
        if (topbar) topbar.classList.add('slide-in');
    }, 2100);

    setTimeout(() => {
        if (window.enableRepel) window.enableRepel();
        enableNameInteraction();
        initObservers(); // Initialize observers after DOM is ready and injected
    }, 2500);
};
