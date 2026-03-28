// Animations et interactivité
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter les animations aux éléments
    const animateElements = document.querySelectorAll('.archive-item, .latest-card, .stat-card');
    animateElements.forEach((el, index) => {
        el.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
    });

    // Hover effects
    document.querySelectorAll('.archive-item, .stat-card, .latest-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.style.setProperty('--mouse-x', x + 'px');
            this.style.setProperty('--mouse-y', y + 'px');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Keyframes pour les animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes glowPulse {
        0%, 100% {
            opacity: 0.6;
            filter: drop-shadow(0 0 20px rgba(0,212,170,0.3));
        }
        50% {
            opacity: 1;
            filter: drop-shadow(0 0 40px rgba(0,212,170,0.5));
        }
    }
`;
document.head.appendChild(style);
