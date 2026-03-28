<?php
/**
 * Mounjaro Magazine Theme Functions
 *
 * @package Mounjaro_Magazine
 */

if (!defined('ABSPATH')) {
    exit;
}

define('MOUNJARO_MAGAZINE_VERSION', '1.0.0');
define('MOUNJARO_MAGAZINE_DIR', get_template_directory());
define('MOUNJARO_MAGAZINE_URI', get_template_directory_uri());

/**
 * Theme Setup
 */
function mounjaro_magazine_setup() {
    // Load text domain
    load_theme_textdomain('mounjaro-magazine', MOUNJARO_MAGAZINE_DIR . '/languages');

    // Add theme support
    add_theme_support('automatic-feed-links');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ]);

    // Custom logo support
    add_theme_support('custom-logo', [
        'height'      => 100,
        'width'       => 100,
        'flex-height' => true,
        'flex-width'  => true,
    ]);

    // Featured images sizes
    add_image_size('mounjaro-featured-large', 800, 450, true);
    add_image_size('mounjaro-featured-medium', 600, 400, true);
    add_image_size('mounjaro-featured-small', 300, 200, true);
    add_image_size('mounjaro-thumbnail', 200, 150, true);

    // Register navigation menus
    register_nav_menus([
        'primary'   => __('Primary Menu', 'mounjaro-magazine'),
        'secondary' => __('Secondary Menu', 'mounjaro-magazine'),
        'footer'    => __('Footer Menu', 'mounjaro-magazine'),
    ]);
}
add_action('after_setup_theme', 'mounjaro_magazine_setup');

/**
 * Register Widget Areas
 */
function mounjaro_magazine_widgets_init() {
    register_sidebar([
        'name'          => __('Sidebar', 'mounjaro-magazine'),
        'id'            => 'primary-sidebar',
        'description'   => __('Main sidebar widget area', 'mounjaro-magazine'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ]);

    register_sidebar([
        'name'          => __('Footer Widget Area 1', 'mounjaro-magazine'),
        'id'            => 'footer-1',
        'description'   => __('First footer widget area', 'mounjaro-magazine'),
        'before_widget' => '<div id="%1$s" class="widget footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ]);

    register_sidebar([
        'name'          => __('Footer Widget Area 2', 'mounjaro-magazine'),
        'id'            => 'footer-2',
        'description'   => __('Second footer widget area', 'mounjaro-magazine'),
        'before_widget' => '<div id="%1$s" class="widget footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ]);

    register_sidebar([
        'name'          => __('Footer Widget Area 3', 'mounjaro-magazine'),
        'id'            => 'footer-3',
        'description'   => __('Third footer widget area', 'mounjaro-magazine'),
        'before_widget' => '<div id="%1$s" class="widget footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ]);
}
add_action('widgets_init', 'mounjaro_magazine_widgets_init');

/**
 * Enqueue Styles and Scripts
 */
function mounjaro_magazine_scripts() {
    wp_enqueue_style(
        'mounjaro-magazine-style',
        MOUNJARO_MAGAZINE_URI . '/style.css',
        [],
        MOUNJARO_MAGAZINE_VERSION
    );

    wp_enqueue_script(
        'mounjaro-magazine-scripts',
        MOUNJARO_MAGAZINE_URI . '/assets/js/main.js',
        [],
        MOUNJARO_MAGAZINE_VERSION,
        true
    );

    // Localize script
    wp_localize_script('mounjaro-magazine-scripts', 'moujaroData', [
        'ajaxUrl' => admin_url('admin-ajax.php'),
    ]);

    // Comment reply script
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'mounjaro_magazine_scripts');

/**
 * Custom Excerpt Length
 */
function mounjaro_magazine_excerpt_length($length) {
    return 20;
}
add_filter('excerpt_length', 'mounjaro_magazine_excerpt_length');

/**
 * Custom Excerpt More
 */
function mounjaro_magazine_excerpt_more($more) {
    return '... <a class="read-more" href="' . get_the_permalink() . '">' . __('Read More', 'mounjaro-magazine') . '</a>';
}
add_filter('excerpt_more', 'mounjaro_magazine_excerpt_more');

/**
 * Get Featured Posts for Homepage
 */
function mounjaro_magazine_get_featured_posts($count = 3) {
    $args = [
        'posts_per_page' => $count,
        'meta_key'       => '_is_featured',
        'meta_value'     => '1',
        'orderby'        => ['meta_value_num' => 'DESC', 'date' => 'DESC'],
        'post_type'      => 'post',
        'post_status'    => 'publish',
    ];

    return new WP_Query($args);
}

/**
 * Get Recent Posts
 */
function mounjaro_magazine_get_recent_posts($count = 10) {
    $args = [
        'posts_per_page' => $count,
        'post_type'      => 'post',
        'post_status'    => 'publish',
        'orderby'        => 'date',
        'order'          => 'DESC',
    ];

    return new WP_Query($args);
}

/**
 * Get Posts by Category
 */
function mounjaro_magazine_get_category_posts($category_id, $count = 5) {
    $args = [
        'posts_per_page' => $count,
        'cat'            => $category_id,
        'post_type'      => 'post',
        'post_status'    => 'publish',
        'orderby'        => 'date',
        'order'          => 'DESC',
    ];

    return new WP_Query($args);
}

/**
 * Body Class Filter
 */
function mounjaro_magazine_body_classes($classes) {
    if (is_home() || is_front_page()) {
        $classes[] = 'homepage';
    }

    if (is_single()) {
        $classes[] = 'single-post-view';
    }

    return $classes;
}
add_filter('body_class', 'mounjaro_magazine_body_classes');

/**
 * Post Class Filter
 */
function mounjaro_magazine_post_class($classes) {
    if (has_post_thumbnail()) {
        $classes[] = 'has-thumbnail';
    }

    return $classes;
}
add_filter('post_class', 'mounjaro_magazine_post_class');

/**
 * Custom Comments Callback
 */
function mounjaro_magazine_comment($comment, $args, $depth) {
    $GLOBALS['comment'] = $comment;
    ?>
    <div <?php comment_class('comment', $comment->comment_ID); ?> id="comment-<?php comment_ID(); ?>">
        <div class="comment-inner">
            <div class="comment-meta">
                <div class="comment-author">
                    <?php echo get_comment_author_link(); ?>
                </div>
                <div class="comment-date">
                    <a href="<?php echo esc_url(get_comment_link($comment->comment_ID)); ?>">
                        <?php echo get_comment_date('F j, Y \a\t g:i a'); ?>
                    </a>
                </div>
            </div>

            <?php if ($comment->comment_approved == '0') : ?>
                <p class="comment-awaiting-moderation">
                    <?php _e('Your comment is awaiting moderation.', 'mounjaro-magazine'); ?>
                </p>
            <?php endif; ?>

            <div class="comment-text">
                <?php comment_text(); ?>
            </div>

            <?php
            comment_reply_link([
                'depth'     => $depth,
                'max_depth' => $args['max_depth'],
                'before'    => '<div class="comment-reply-link">',
                'after'     => '</div>',
            ]);
            ?>
        </div>
    </div>
    <?php
}

/**
 * Custom Comment Form Args
 */
function mounjaro_magazine_comment_form_args($args) {
    $args['class_submit'] = 'submit-comment';
    $args['label_submit'] = __('Submit Comment', 'mounjaro-magazine');
    return $args;
}
add_filter('comment_form_defaults', 'mounjaro_magazine_comment_form_args');

/**
 * Get Post Read Time
 */
function mounjaro_magazine_get_read_time($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }

    $post = get_post($post_id);
    $word_count = str_word_count(strip_tags($post->post_content));
    $read_time = ceil($word_count / 200);

    return max(1, $read_time);
}

/**
 * Display Post Meta
 */
function mounjaro_magazine_post_meta() {
    $read_time = mounjaro_magazine_get_read_time();
    ?>
    <div class="post-item-meta">
        <span class="post-date">
            <strong><?php _e('Published:', 'mounjaro-magazine'); ?></strong>
            <?php echo get_the_date(); ?>
        </span>
        <span class="post-author">
            <strong><?php _e('By:', 'mounjaro-magazine'); ?></strong>
            <?php the_author_posts_link(); ?>
        </span>
        <span class="read-time">
            <strong><?php _e('Read Time:', 'mounjaro-magazine'); ?></strong>
            <?php echo esc_html($read_time) . ' ' . _n('min', 'mins', $read_time, 'mounjaro-magazine'); ?>
        </span>
    </div>
    <?php
}

/**
 * Sanitize Color
 */
function mounjaro_magazine_sanitize_color($color) {
    return sanitize_hex_color($color);
}

/**
 * Load Theme Files
 */
require_once MOUNJARO_MAGAZINE_DIR . '/inc/customizer.php';
require_once MOUNJARO_MAGAZINE_DIR . '/inc/template-tags.php';
