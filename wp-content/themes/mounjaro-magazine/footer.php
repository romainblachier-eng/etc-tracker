<?php
/**
 * The footer for our theme
 *
 * @package Mounjaro_Magazine
 */

?>
        </div>

        <footer id="colophon" class="site-footer">
            <div class="container">
                <div class="footer-content">
                    <?php
                    for ($i = 1; $i <= 3; $i++) {
                        echo '<div class="footer-widget-col">';
                        dynamic_sidebar('footer-' . $i);
                        echo '</div>';
                    }
                    ?>
                </div>

                <nav id="footer-navigation" class="footer-navigation" role="navigation">
                    <?php
                    wp_nav_menu([
                        'theme_location' => 'footer',
                        'fallback_cb'    => false,
                        'depth'          => 1,
                    ]);
                    ?>
                </nav>

                <div class="footer-bottom">
                    <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. <?php _e('All rights reserved.', 'mounjaro-magazine'); ?></p>
                    <p><?php _e('Designed with passion by', 'mounjaro-magazine'); ?> <a href="https://romainblachier.dev/" target="_blank" rel="noopener noreferrer">Romain Blachier</a></p>
                </div>
            </div>
        </footer>
    </div>

    <?php wp_footer(); ?>
</body>
</html>
