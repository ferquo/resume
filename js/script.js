document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.experience-item, .skill-category, .personal-card');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Add initial visible class to already visible elements
    window.addEventListener('load', revealOnScroll);
    
    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);
    
    // Highlight the current section in navigation (if you add navigation later)
    const highlightCurrentSection = () => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                if (id) {
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    };
    
    // This will be useful if you add navigation later
    window.addEventListener('scroll', highlightCurrentSection);

    // GSAP hero text animations with ScrambleText
    try {
        // Ensure GSAP is available (loaded via CDN in index.html)
        if (typeof gsap !== 'undefined') {
            // Register ScrambleTextPlugin when available
            if (typeof ScrambleTextPlugin !== 'undefined') {
                gsap.registerPlugin(ScrambleTextPlugin);
            }

            const nameEl = document.querySelector('.hero-name');
            const roleEl = document.querySelector('.hero-role');
            const subtitleEl = document.querySelector('.hero-subtitle');
            const imageEl = document.querySelector('.hero-image img');
            const scrollEl = document.querySelector('.hero-scroll');

            const nameText = nameEl?.textContent?.trim() || '';
            const roleText = roleEl?.textContent?.trim() || '';
            const subtitleText = subtitleEl?.textContent?.trim() || '';

            // Pre-state: hide text and image slightly for a composed entrance
            gsap.set([nameEl, roleEl, subtitleEl], { opacity: 0 });
            gsap.set(imageEl, { opacity: 0, y: 20 });
            gsap.set(scrollEl, { opacity: 0, y: 10 });

            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

            // Helper to animate one element with ScrambleText if plugin exists; otherwise fade-in
            const scrambleTo = (el, text, duration = 1.2, overlap = '+=0.1') => {
                if (!el) return tl;
                // Clear existing text to avoid flicker
                const original = text || '';
                el.textContent = '';

                if (typeof ScrambleTextPlugin !== 'undefined') {
                    tl.to(el, {
                        duration,
                        opacity: 1,
                        scrambleText: {
                            text: original,
                            chars: 'upperAndLowerCase',
                            speed: 0.38,
                            revealDelay: 0.1
                        }
                    }, overlap);
                } else {
                    // Graceful fallback: simple fade-in with text set immediately
                    el.textContent = original;
                    tl.to(el, { duration: duration * 0.5, opacity: 1 }, overlap);
                }
                return tl;
            };

            // Bring in portrait
            if (imageEl) {
                tl.to(imageEl, { duration: 0.6, opacity: 1, y: 0 }, 0);
            }

            // Sequence hero texts
            scrambleTo(nameEl, nameText, 1.1, 0.1);
            scrambleTo(roleEl, roleText, 1.0, '>-0.1');
            scrambleTo(subtitleEl, subtitleText, 1.0, '>-0.1');

            // Subtle reveal for scroll indicator
            if (scrollEl) {
                tl.to(scrollEl, { duration: 0.5, opacity: 1, y: 0 }, '>-0.2');
            }
        }
    } catch (e) {
        // Fail silently to avoid breaking other interactions
        console.error('GSAP hero animation error:', e);
    }
});
