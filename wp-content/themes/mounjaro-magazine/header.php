<?php
/**
 * The header for our theme
 *
 * @package Mounjaro_Magazine
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>

    <div id="page" class="site">
        <header id="masthead" class="site-header">
            <div class="container">
                <div class="header-top">
                    <div class="header-search">
                        <?php get_search_form(); ?>
                    </div>
                    <div class="header-social">
                        <?php
                        if (function_exists('the_custom_logo')) {
                            if (has_custom_logo()) {
                                the_custom_logo();
                            }
                        }
                        ?>
                    </div>
                </div>

                <div class="site-branding">
                    <?php
                    if (has_custom_logo()) {
                        the_custom_logo();
                    }
                    ?>
                    <div>
                        <?php
                        if (is_front_page() && is_home()) {
                            ?>
                            <h1 class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>" rel="home"><?php bloginfo('name'); ?></a></h1>
                            <?php
                        } else {
                            ?>
                            <p class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>" rel="home"><?php bloginfo('name'); ?></a></p>
                            <?php
                        }

                        $mounjaro_magazine_description = get_bloginfo('description', 'display');
                        if ($mounjaro_magazine_description || is_customize_preview()) :
                            ?>
                            <p class="site-description"><?php echo $mounjaro_magazine_description; ?></p>
                        <?php endif; ?>
                    </div>
                </div>

                <button id="menu-toggle" class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
                    <span class="menu-toggle-text"><?php _e('Menu', 'mounjaro-magazine'); ?></span>
                </button>

                <nav id="site-navigation" class="main-navigation" role="navigation" aria-label="<?php esc_attr_e('Primary Menu', 'mounjaro-magazine'); ?>">
                    <?php
                    wp_nav_menu([
                        'theme_location' => 'primary',
                        'menu_id'        => 'primary-menu',
                        'fallback_cb'    => 'wp_page_menu',
                    ]);
                    ?>
                </nav>
            </div>
        </header>

        <div id="content" class="site-content">
