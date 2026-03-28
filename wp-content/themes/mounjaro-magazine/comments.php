<?php
/**
 * Comments template
 *
 * @package Mounjaro_Magazine
 */

if (post_password_required()) {
    return;
}
?>

<div id="comments" class="comments-area">
    <?php
    if (have_comments()) :
        ?>
        <h2 class="comments-title">
            <?php
            $comments_number = get_comments_number();
            if ('1' === $comments_number) {
                _e('One comment', 'mounjaro-magazine');
            } else {
                printf(
                    /* translators: %s: comment count */
                    _n('%s comment', '%s comments', $comments_number, 'mounjaro-magazine'),
                    number_format_i18n($comments_number)
                );
            }
            ?>
        </h2>

        <ol class="comment-list">
            <?php
            wp_list_comments([
                'style'      => 'ol',
                'callback'   => 'mounjaro_magazine_comment',
                'end-callback' => 'mounjaro_magazine_comment_end',
            ]);
            ?>
        </ol>

        <?php
        the_comments_pagination();
    endif;

    if (comments_open()) :
        comment_form();
    elseif (is_single() || is_page()) :
        ?>
        <p class="no-comments"><?php _e('Comments are closed.', 'mounjaro-magazine'); ?></p>
        <?php
    endif;
    ?>
</div>
