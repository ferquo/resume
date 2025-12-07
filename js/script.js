document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 2. Intersection Observer for Scroll Reveals
    // Targets elements with .fade-in class
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 3. GSAP Elegant Entrance (Masthead)
    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

        // Initial state set in CSS or here
        gsap.set('.masthead-title h1', { opacity: 0, y: 30 });
        gsap.set('.masthead-subtitle', { opacity: 0 });
        gsap.set('.separator-line', { scaleX: 0, transformOrigin: 'center' });
        gsap.set('.masthead-top', { opacity: 0 });

        // Sequence
        tl.to('.masthead-top', { opacity: 1, duration: 0.8 })
            .to('.masthead-title h1', { opacity: 1, y: 0 }, '-=0.4')
            .to('.separator-line', { scaleX: 1, duration: 1.0 }, '-=0.6')
            .to('.masthead-subtitle', { opacity: 1 }, '-=0.8');
    }
});
