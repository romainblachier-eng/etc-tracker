/**
 * Customizer Preview Script
 */

(function() {
    'use strict';

    // Primary color
    wp.customize('mounjaro_primary_color', function(value) {
        value.bind(function(to) {
            const style = document.getElementById('mounjaro-customizer-css') || document.createElement('style');
            style.id = 'mounjaro-customizer-css';
            style.innerHTML = `:root { --primary-color: ${to}; }`;

            if (!document.getElementById('mounjaro-customizer-css')) {
                document.head.appendChild(style);
            }
        });
    });

    // Secondary color
    wp.customize('mounjaro_secondary_color', function(value) {
        value.bind(function(to) {
            const style = document.getElementById('mounjaro-customizer-css-secondary') || document.createElement('style');
            style.id = 'mounjaro-customizer-css-secondary';
            style.innerHTML = `:root { --secondary-color: ${to}; }`;

            if (!document.getElementById('mounjaro-customizer-css-secondary')) {
                document.head.appendChild(style);
            }
        });
    });
})();
