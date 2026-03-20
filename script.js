document.addEventListener('DOMContentLoaded', () => {

function removePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                if (typeof initAnimations === 'function') {
                    initAnimations();
                }
            }, 800);
        }
    }

    // Preloader - Robust load check
    if (document.readyState === 'complete') {
        setTimeout(removePreloader, 1000);
    } else {
        window.addEventListener('load', () => {
            setTimeout(removePreloader, 1000);
        });
    }

    // Safety timeout in case load event hangs
    setTimeout(removePreloader, 5000);

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Menu Tab Switching
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuPanes = document.querySelectorAll('.menu-pane');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            
            // Update tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update panes
            menuPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === target) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // GSAP Animations
    function initAnimations() {
        if (typeof gsap === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        // Hero Reveal
        gsap.from('.reveal-text', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out"
        });

        // About Fade In
        gsap.from('.about-img', {
            scrollTrigger: {
                trigger: '.about-img',
                start: "top 80%",
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: '.about-content',
                start: "top 80%",
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Gallery Stagger
        gsap.from('.gallery-item', {
            scrollTrigger: {
                trigger: '.gallery-track',
                start: "top 70%",
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
        });

        // Menu Cards
        gsap.from('.menu-card', {
            scrollTrigger: {
                trigger: '.menu-content',
                start: "top 75%",
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out"
        });
    }

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });

});
