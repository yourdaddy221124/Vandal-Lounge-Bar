document.addEventListener('DOMContentLoaded', () => {

    const preloader = document.getElementById('preloader');
    
    function removeLoader() {
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

    // Attempt removal after load
    window.addEventListener('load', () => {
        setTimeout(removeLoader, 1000);
    });

    // Fallback removal after 5 seconds
    setTimeout(removeLoader, 5000);

    // Navbar Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Menu Tabs
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuPanes = document.querySelectorAll('.menu-pane');
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            menuPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === target) pane.classList.add('active');
            });
        });
    });

    // GSAP
    function initAnimations() {
        if (typeof gsap === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);
        gsap.from('.reveal-text', {
            y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                if (navMenu) navMenu.classList.remove('active');
            }
        });
    });
});
