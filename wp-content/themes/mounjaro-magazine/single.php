<?php
/**
 * Single post template
 *
 * @package Mounjaro_Magazine
 */

get_header();
?>

    <div class="container">
        <div class="content-area">
            <main id="main" class="primary">
                <?php
                while (have_posts()) :
                    the_post();
                    ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('post-content'); ?>>
                        <?php
                        if (has_post_thumbnail()) {
                            ?>
                            <div class="post-thumbnail">
                                <?php the_post_thumbnail('mounjaro-featured-large'); ?>
                            </div>
                            <?php
                        }
                        ?>

                        <div class="post-header">
                            <h1 class="post-title"><?php the_title(); ?></h1>

                            <div class="post-meta">
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
                                    <?php
                                    $read_time = mounjaro_magazine_get_read_time();
                                    echo esc_html($read_time) . ' ' . _n('min', 'mins', $read_time, 'mounjaro-magazine');
                                    ?>
                                </span>
                            </div>

                            <?php
                            $categories = get_the_category();
                            if (!empty($categories)) {
                                ?>
                                <div class="post-categories">
                                    <?php
                                    foreach ($categories as $category) {
                                        ?>
                                        <a href="<?php echo esc_url(get_category_link($category->term_id)); ?>" class="post-category">
                                            <?php echo esc_html($category->name); ?>
                                        </a>
                                        <?php
                                    }
                                    ?>
                                </div>
                                <?php
                            }
                            ?>
                        </div>

                        <div class="post-body">
                            <?php
                            the_content();
                            wp_link_pages([
                                'before'      => '<div class="page-links"><span class="page-links-title">' . __('Pages:', 'mounjaro-magazine') . '</span><span class="page-links-list">',
                                'after'       => '</span></div>',
                                'link_before' => '<span>',
                                'link_after'  => '</span>',
                            ]);
                            ?>
                        </div>

                        <?php
                        $tags = get_the_tags();
                        if (!empty($tags)) {
                            ?>
                            <div class="post-tags">
                                <strong><?php _e('Tags:', 'mounjaro-magazine'); ?></strong>
                                <?php
                                foreach ($tags as $tag) {
                                    ?>
                                    <a href="<?php echo esc_url(get_tag_link($tag->term_id)); ?>" class="post-tag">
                                        #<?php echo esc_html($tag->name); ?>
                                    </a>
                                    <?php
                                }
                                ?>
                            </div>
                            <?php
                        }
                        ?>

                        <?php
                        the_posts_navigation([
                            'prev_text' => __('← Previous Post', 'mounjaro-magazine'),
                            'next_text' => __('Next Post →', 'mounjaro-magazine'),
                        ]);
                        ?>
                    </article>

                    <?php
                    if (comments_open() || get_comments_number()) {
                        comments_template();
                    }
                    ?>

                    <!-- Related Posts -->
                    <?php
                    $current_post_id = get_the_ID();
                    $categories = get_the_category($current_post_id);

                    if (!empty($categories)) {
                        $cat_ids = wp_list_pluck($categories, 'term_id');

                        $args = [
                            'category__in'  => $cat_ids,
                            'post__not_in'  => [$current_post_id],
                            'posts_per_page' => 3,
                            'orderby'       => 'rand',
                        ];

                        $related_posts = new WP_Query($args);

                        if ($related_posts->have_posts()) {
                            ?>
                            <section class="related-posts">
                                <h3><?php _e('Related Articles', 'mounjaro-magazine'); ?></h3>
                                <div class="featured-grid">
                                    <?php
                                    while ($related_posts->have_posts()) :
                                        $related_posts->the_post();
                                        ?>
                                        <article class="featured-card">
                                            <?php
                                            if (has_post_thumbnail()) {
                                                ?>
                                                <div class="featured-card-image">
                                                    <?php the_post_thumbnail('mounjaro-featured-medium'); ?>
                                                </div>
                                                <?php
                                            }
                                            ?>
                                            <div class="featured-card-content">
                                                <?php
                                                $post_categories = get_the_category();
                                                if (!empty($post_categories)) {
                                                    ?>
                                                    <div class="featured-card-category">
                                                        <?php echo esc_html($post_categories[0]->name); ?>
                                                    </div>
                                                    <?php
                                                }
                                                ?>
                                                <h4 class="featured-card-title">
                                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                                </h4>
                                                <div class="featured-card-excerpt">
                                                    <?php the_excerpt(); ?>
                                                </div>
                                                <div class="featured-card-meta">
                                                    <span class="post-date"><?php echo get_the_date(); ?></span>
                                                </div>
                                            </div>
                                        </article>
                                        <?php
                                    endwhile;
                                    wp_reset_postdata();
                                    ?>
                                </div>
                            </section>
                            <?php
                        }
                    }
                    ?>

                <?php
                endwhile;
                ?>
            </main>

            <aside id="secondary" class="secondary widget-area">
                <!-- Search Widget -->
                <div class="widget">
                    <form role="search" method="get" class="widget-search-form" action="<?php echo esc_url(home_url('/')); ?>">
                        <input type="search" class="search-field" placeholder="<?php esc_attr_e('Search...', 'mounjaro-magazine'); ?>" value="<?php echo get_search_query(); ?>" name="s" />
                        <button type="submit" class="search-submit"><?php _e('Search', 'mounjaro-magazine'); ?></button>
                    </form>
                </div>

                <!-- Categories Widget -->
                <?php
                $categories = get_categories(['hide_empty' => true]);
                if (!empty($categories)) {
                    ?>
                    <div class="widget">
                        <h3 class="widget-title"><?php _e('Categories', 'mounjaro-magazine'); ?></h3>
                        <ul>
                            <?php
                            foreach ($categories as $category) {
                                ?>
                                <li>
                                    <a href="<?php echo esc_url(get_category_link($category->term_id)); ?>">
                                        <?php echo esc_html($category->name); ?>
                                        <span class="count">(<?php echo esc_html($category->count); ?>)</span>
                                    </a>
                                </li>
                                <?php
                            }
                            ?>
                        </ul>
                    </div>
                    <?php
                }
                ?>

                <!-- Recent Posts Widget -->
                <?php
                $recent_posts = get_posts(['numberposts' => 5]);
                if (!empty($recent_posts)) {
                    ?>
                    <div class="widget widget-recent-posts">
                        <h3 class="widget-title"><?php _e('Recent Posts', 'mounjaro-magazine'); ?></h3>
                        <ul>
                            <?php
                            foreach ($recent_posts as $post) {
                                ?>
                                <li>
                                    <a href="<?php echo esc_url(get_permalink($post->ID)); ?>">
                                        <?php echo esc_html($post->post_title); ?>
                                    </a>
                                    <div class="post-date">
                                        <?php echo get_the_date('M d, Y', $post->ID); ?>
                                    </div>
                                </li>
                                <?php
                            }
                            ?>
                        </ul>
                    </div>
                    <?php
                }
                ?>

                <!-- Dynamic Sidebar -->
                <?php dynamic_sidebar('primary-sidebar'); ?>
            </aside>
        </div>
    </div>

<?php
get_footer();
