// Magazine Theme Main Scripts

(function() {
  'use strict';

  // Mobile menu toggle
  function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainMenu = document.getElementById('main-menu');

    if (!menuToggle || !mainMenu) return;

    menuToggle.addEventListener('click', function() {
      mainMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded',
        menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });

    // Close menu when link is clicked
    const menuLinks = mainMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mainMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

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

  // Add active class to current nav link
  function initActiveNavLink() {
    const currentLocation = location.pathname;
    const menuItems = document.querySelectorAll('.main-menu a');

    menuItems.forEach(item => {
      if (item.getAttribute('href') === currentLocation) {
        item.classList.add('active');
      }
    });
  }

  // Initialize all functions
  document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initLazyLoad();
    initActiveNavLink();
  });
})();
