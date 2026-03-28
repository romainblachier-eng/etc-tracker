<?php
/**
 * Main template file
 *
 * @package Mounjaro_Magazine
 */

get_header();
?>

    <div class="container">
        <div class="content-area">
            <main id="main" class="primary">
                <?php
                if (is_home() && !is_front_page()) {
                    ?>
                    <div class="hero-section">
                        <div class="container">
                            <div class="hero-content">
                                <h1><?php _e('News & Updates', 'mounjaro-magazine'); ?></h1>
                                <p><?php _e('Stay informed with the latest news and insights', 'mounjaro-magazine'); ?></p>
                            </div>
                        </div>
                    </div>
                    <?php
                }

                if (is_front_page() && is_home()) {
                    // Homepage
                    ?>
                    <div class="hero-section">
                        <div class="container">
                            <div class="hero-content">
                                <h1><?php bloginfo('name'); ?></h1>
                                <p><?php bloginfo('description'); ?></p>
                            </div>
                        </div>
                    </div>

                    <!-- Featured Section -->
                    <?php
                    $featured_query = mounjaro_magazine_get_featured_posts(3);
                    if ($featured_query->have_posts()) :
                        ?>
                        <section class="featured-section">
                            <h2 class="featured-title"><?php _e('Featured Articles', 'mounjaro-magazine'); ?></h2>
                            <div class="featured-grid">
                                <?php
                                while ($featured_query->have_posts()) :
                                    $featured_query->the_post();
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
                                            $categories = get_the_category();
                                            if (!empty($categories)) {
                                                ?>
                                                <div class="featured-card-category">
                                                    <?php echo esc_html($categories[0]->name); ?>
                                                </div>
                                                <?php
                                            }
                                            ?>
                                            <h3 class="featured-card-title">
                                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                            </h3>
                                            <div class="featured-card-excerpt">
                                                <?php the_excerpt(); ?>
                                            </div>
                                            <div class="featured-card-meta">
                                                <span class="post-date"><?php echo get_the_date(); ?></span>
                                                <span class="post-author"><?php the_author(); ?></span>
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
                    endif;
                }
                ?>

                <!-- Posts List -->
                <?php
                if (have_posts()) {
                    ?>
                    <section class="posts-section">
                        <?php
                        if (!is_front_page()) {
                            ?>
                            <h2 class="section-title">
                                <?php
                                if (is_category()) {
                                    single_cat_title();
                                } elseif (is_tag()) {
                                    single_tag_title();
                                } elseif (is_search()) {
                                    printf(
                                        /* translators: %s: search term */
                                        esc_html__('Search Results for: %s', 'mounjaro-magazine'),
                                        '<span>' . get_search_query() . '</span>'
                                    );
                                } else {
                                    _e('Latest Articles', 'mounjaro-magazine');
                                }
                                ?>
                            </h2>
                            <?php
                        }
                        ?>

                        <ul class="posts-list">
                            <?php
                            while (have_posts()) :
                                the_post();
                                ?>
                                <li class="post-item">
                                    <div class="post-item-header">
                                        <div class="post-item-content">
                                            <h3><?php the_title_attribute(); ?>
                                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                            </h3>
                                            <div class="post-item-excerpt">
                                                <?php the_excerpt(); ?>
                                            </div>
                                            <?php mounjaro_magazine_post_meta(); ?>
                                        </div>
                                        <?php
                                        if (has_post_thumbnail()) {
                                            ?>
                                            <div class="post-item-thumbnail">
                                                <a href="<?php the_permalink(); ?>">
                                                    <?php the_post_thumbnail('mounjaro-thumbnail'); ?>
                                                </a>
                                            </div>
                                            <?php
                                        }
                                        ?>
                                    </div>
                                </li>
                                <?php
                            endwhile;
                            ?>
                        </ul>
                    </section>

                    <?php
                    the_posts_pagination([
                        'prev_text' => __('← Previous', 'mounjaro-magazine'),
                        'next_text' => __('Next →', 'mounjaro-magazine'),
                    ]);
                } else {
                    ?>
                    <div class="no-posts">
                        <h2><?php _e('Nothing Found', 'mounjaro-magazine'); ?></h2>
                        <p><?php _e('No posts found. Try using the search.', 'mounjaro-magazine'); ?></p>
                    </div>
                    <?php
                }
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

                <!-- Archives Widget -->
                <div class="widget">
                    <h3 class="widget-title"><?php _e('Archives', 'mounjaro-magazine'); ?></h3>
                    <ul>
                        <?php wp_get_archives(['type' => 'monthly']); ?>
                    </ul>
                </div>

                <!-- Dynamic Sidebar -->
                <?php
                dynamic_sidebar('primary-sidebar');
                ?>
            </aside>
        </div>
    </div>

<?php
get_footer();
