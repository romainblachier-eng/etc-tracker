/**
 * Main Theme Scripts
 */

(function() {
    'use strict';

    // Mobile menu toggle
    function initMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const navigation = document.getElementById('site-navigation');

        if (!menuToggle || !navigation) {
            return;
        }

        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navigation.classList.toggle('toggled');
        });

        // Close menu when link is clicked
        const menuLinks = navigation.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.setAttribute('aria-expanded', 'false');
                navigation.classList.remove('toggled');
            });
        });
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Lazy load images
    function initLazyLoad() {
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[data-src]');

            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // Table responsiveness
    function initResponsiveTables() {
        const tables = document.querySelectorAll('.post-body table');
        tables.forEach(table => {
            table.classList.add('responsive-table');
        });
    }

    // Code block styling
    function initCodeBlocks() {
        const codeBlocks = document.querySelectorAll('.post-body pre');
        codeBlocks.forEach(block => {
            block.classList.add('code-block');
        });
    }

    // Add smooth anchor links styling
    function initAnchorLinks() {
        const headers = document.querySelectorAll('.post-body h2, .post-body h3, .post-body h4');
        headers.forEach(header => {
            if (header.id) {
                const anchor = document.createElement('a');
                anchor.href = '#' + header.id;
                anchor.className = 'anchor-link';
                anchor.innerHTML = '&para;';
                header.appendChild(anchor);
            }
        });
    }

    // Share buttons (optional)
    function initShareButtons() {
        const shareButtons = document.querySelectorAll('.share-button');
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const url = this.getAttribute('data-url');
                const title = this.getAttribute('data-title');
                const network = this.getAttribute('data-network');

                let shareUrl = '';

                switch (network) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                        break;
                    case 'whatsapp':
                        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
                        break;
                }

                if (shareUrl) {
                    window.open(shareUrl, 'share', 'width=600,height=400');
                }
            });
        });
    }

    // Scroll to top button
    function initScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '↑';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollButton);

        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        });

        scrollButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Initialize all functions on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initSmoothScroll();
        initLazyLoad();
        initResponsiveTables();
        initCodeBlocks();
        initAnchorLinks();
        initShareButtons();
        initScrollToTop();
    });
})();
