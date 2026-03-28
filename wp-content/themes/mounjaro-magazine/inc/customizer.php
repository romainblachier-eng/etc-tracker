<?php
/**
 * Theme Customizer
 *
 * @package Mounjaro_Magazine
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add theme customizer settings
 */
function mounjaro_magazine_customize_register($wp_customize) {
    // Primary Color Section
    $wp_customize->add_section('mounjaro_magazine_colors', [
        'title'    => __('Theme Colors', 'mounjaro-magazine'),
        'priority' => 50,
    ]);

    // Primary Color Setting
    $wp_customize->add_setting('mounjaro_primary_color', [
        'default'           => '#667eea',
        'transport'         => 'postMessage',
        'sanitize_callback' => 'mounjaro_magazine_sanitize_color',
    ]);

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'mounjaro_primary_color', [
        'label'    => __('Primary Color', 'mounjaro-magazine'),
        'section'  => 'mounjaro_magazine_colors',
        'settings' => 'mounjaro_primary_color',
    ]));

    // Secondary Color Setting
    $wp_customize->add_setting('mounjaro_secondary_color', [
        'default'           => '#764ba2',
        'transport'         => 'postMessage',
        'sanitize_callback' => 'mounjaro_magazine_sanitize_color',
    ]);

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'mounjaro_secondary_color', [
        'label'    => __('Secondary Color', 'mounjaro-magazine'),
        'section'  => 'mounjaro_magazine_colors',
        'settings' => 'mounjaro_secondary_color',
    ]));

    // Featured Posts Section
    $wp_customize->add_section('mounjaro_magazine_featured', [
        'title'    => __('Featured Posts', 'mounjaro-magazine'),
        'priority' => 55,
    ]);

    // Featured Posts Count
    $wp_customize->add_setting('mounjaro_featured_count', [
        'default'           => 3,
        'transport'         => 'refresh',
        'sanitize_callback' => 'absint',
    ]);

    $wp_customize->add_control('mounjaro_featured_count', [
        'label'    => __('Number of Featured Posts', 'mounjaro-magazine'),
        'section'  => 'mounjaro_magazine_featured',
        'type'     => 'number',
        'input_attrs' => [
            'min'  => 1,
            'max'  => 10,
            'step' => 1,
        ],
    ]);

    // Posts Per Page Section
    $wp_customize->add_section('mounjaro_magazine_posts', [
        'title'    => __('Posts Settings', 'mounjaro-magazine'),
        'priority' => 60,
    ]);

    // Posts Per Page
    $wp_customize->add_setting('mounjaro_posts_per_page', [
        'default'           => 10,
        'transport'         => 'refresh',
        'sanitize_callback' => 'absint',
    ]);

    $wp_customize->add_control('mounjaro_posts_per_page', [
        'label'    => __('Posts Per Page', 'mounjaro-magazine'),
        'section'  => 'mounjaro_magazine_posts',
        'type'     => 'number',
        'input_attrs' => [
            'min'  => 1,
            'max'  => 50,
            'step' => 1,
        ],
    ]);

    // Show Related Posts
    $wp_customize->add_setting('mounjaro_show_related_posts', [
        'default'           => true,
        'transport'         => 'refresh',
        'sanitize_callback' => 'rest_sanitize_boolean',
    ]);

    $wp_customize->add_control('mounjaro_show_related_posts', [
        'label'    => __('Show Related Posts', 'mounjaro-magazine'),
        'section'  => 'mounjaro_magazine_posts',
        'type'     => 'checkbox',
    ]);

    // Show Read Time
    $wp_customize->add_setting('mounjaro_show_read_time', [
        'default'           => true,
        'transport'         => 'refresh',
        'sanitize_callback' => 'rest_sanitize_boolean',
    ]);

    $wp_customize->add_control('mounjaro_show_read_time', [
        'label'    => __('Show Read Time', 'mounjaro-magazine'),
        'section'  => 'mounjaro_magazine_posts',
        'type'     => 'checkbox',
    ]);
}
add_action('customize_register', 'mounjaro_magazine_customize_register');

/**
 * Customizer live preview
 */
function mounjaro_magazine_customize_preview_js() {
    wp_enqueue_script(
        'mounjaro-magazine-customizer-preview',
        MOUNJARO_MAGAZINE_URI . '/assets/js/customizer-preview.js',
        ['customize-preview'],
        MOUNJARO_MAGAZINE_VERSION,
        true
    );
}
add_action('customize_preview_init', 'mounjaro_magazine_customize_preview_js');

/**
 * Customizer CSS
 */
function mounjaro_magazine_customize_css() {
    $primary_color   = get_theme_mod('mounjaro_primary_color', '#667eea');
    $secondary_color = get_theme_mod('mounjaro_secondary_color', '#764ba2');

    $css = sprintf(
        ':root { --primary-color: %s; --secondary-color: %s; }',
        sanitize_hex_color($primary_color),
        sanitize_hex_color($secondary_color)
    );

    wp_add_inline_style('mounjaro-magazine-style', $css);
}
add_action('wp_enqueue_scripts', 'mounjaro_magazine_customize_css');
