<?php
/**
 * Template Tags
 *
 * @package Mounjaro_Magazine
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Display post categories
 */
function mounjaro_magazine_post_categories() {
    $categories = get_the_category();

    if (!empty($categories)) {
        echo '<div class="post-categories">';
        foreach ($categories as $category) {
            printf(
                '<a href="%s" class="post-category">%s</a>',
                esc_url(get_category_link($category->term_id)),
                esc_html($category->name)
            );
        }
        echo '</div>';
    }
}

/**
 * Display post tags
 */
function mounjaro_magazine_post_tags() {
    $tags = get_the_tags();

    if (!empty($tags)) {
        echo '<div class="post-tags">';
        echo '<strong>' . __('Tags:', 'mounjaro-magazine') . '</strong> ';
        foreach ($tags as $tag) {
            printf(
                '<a href="%s" class="post-tag">#%s</a> ',
                esc_url(get_tag_link($tag->term_id)),
                esc_html($tag->name)
            );
        }
        echo '</div>';
    }
}

/**
 * Display featured post badge
 */
function mounjaro_magazine_featured_badge() {
    if (get_post_meta(get_the_ID(), '_is_featured', true)) {
        echo '<span class="featured-badge">' . __('Featured', 'mounjaro-magazine') . '</span>';
    }
}

/**
 * Get excerpt by post ID
 */
function mounjaro_magazine_get_excerpt($post_id = null, $length = 20) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }

    $post = get_post($post_id);

    if (!empty($post->post_excerpt)) {
        $excerpt = $post->post_excerpt;
    } else {
        $excerpt = wp_trim_words($post->post_content, $length);
    }

    return $excerpt;
}

/**
 * Check if post has featured image
 */
function mounjaro_magazine_has_featured_image() {
    return has_post_thumbnail(get_the_ID());
}

/**
 * Get hero image URL
 */
function mounjaro_magazine_get_hero_image() {
    if (has_post_thumbnail()) {
        $image = wp_get_attachment_image_src(get_post_thumbnail_id(), 'mounjaro-featured-large');
        return $image[0];
    }
    return '';
}

/**
 * Display breadcrumbs
 */
function mounjaro_magazine_breadcrumbs() {
    if (is_home() || is_front_page()) {
        return;
    }

    echo '<div class="breadcrumbs">';
    echo '<a href="' . esc_url(home_url('/')) . '">' . __('Home', 'mounjaro-magazine') . '</a> / ';

    if (is_category()) {
        echo '<span>' . single_cat_title('', false) . '</span>';
    } elseif (is_tag()) {
        echo '<span>' . single_tag_title('', false) . '</span>';
    } elseif (is_single()) {
        $categories = get_the_category();
        if (!empty($categories)) {
            echo '<a href="' . esc_url(get_category_link($categories[0]->term_id)) . '">' . esc_html($categories[0]->name) . '</a> / ';
        }
        echo '<span>' . get_the_title() . '</span>';
    } elseif (is_page()) {
        echo '<span>' . get_the_title() . '</span>';
    } elseif (is_search()) {
        echo '<span>' . __('Search Results', 'mounjaro-magazine') . '</span>';
    }

    echo '</div>';
}
