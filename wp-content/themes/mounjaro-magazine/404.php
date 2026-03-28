<?php
/**
 * 404 error template
 *
 * @package Mounjaro_Magazine
 */

get_header();
?>

    <div class="container">
        <div class="content-area">
            <main id="main" class="primary">
                <div class="post-content not-found">
                    <h1 class="post-title"><?php _e('Nothing Found', 'mounjaro-magazine'); ?></h1>

                    <div class="post-body">
                        <p><?php _e('This page could not be found.', 'mounjaro-magazine'); ?></p>

                        <p><?php _e('It looks like nothing was found at this location. You can either try searching for what you are looking for using the form below, or return to the home page.', 'mounjaro-magazine'); ?></p>

                        <h2><?php _e('Try searching:', 'mounjaro-magazine'); ?></h2>
                        <?php get_search_form(); ?>

                        <h3><?php _e('Recent Posts', 'mounjaro-magazine'); ?></h3>
                        <ul>
                            <?php
                            $recent_posts = get_posts(['numberposts' => 5]);
                            foreach ($recent_posts as $post) {
                                ?>
                                <li>
                                    <a href="<?php echo esc_url(get_permalink($post->ID)); ?>">
                                        <?php echo esc_html($post->post_title); ?>
                                    </a>
                                </li>
                                <?php
                            }
                            ?>
                        </ul>

                        <p>
                            <a href="<?php echo esc_url(home_url('/')); ?>" class="btn">
                                <?php _e('← Back to Home', 'mounjaro-magazine'); ?>
                            </a>
                        </p>
                    </div>
                </div>
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
            </aside>
        </div>
    </div>

<?php
get_footer();
