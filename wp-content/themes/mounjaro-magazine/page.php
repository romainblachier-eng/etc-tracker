<?php
/**
 * Page template
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
                        <div class="post-header">
                            <h1 class="post-title"><?php the_title(); ?></h1>
                        </div>

                        <?php
                        if (has_post_thumbnail()) {
                            ?>
                            <div class="post-thumbnail">
                                <?php the_post_thumbnail('mounjaro-featured-large'); ?>
                            </div>
                            <?php
                        }
                        ?>

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
                    </article>

                    <?php
                    if (comments_open() || get_comments_number()) {
                        comments_template();
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
