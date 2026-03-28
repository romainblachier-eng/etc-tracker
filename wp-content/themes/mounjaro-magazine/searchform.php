<?php
/**
 * Search form template
 *
 * @package Mounjaro_Magazine
 */

?>
<form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>">
    <label for="s">
        <span class="screen-reader-text"><?php _e('Search for:', 'mounjaro-magazine'); ?></span>
    </label>
    <input
        type="search"
        id="s"
        class="search-field"
        placeholder="<?php esc_attr_e('Search...', 'mounjaro-magazine'); ?>"
        value="<?php echo get_search_query(); ?>"
        name="s"
    />
    <button type="submit" class="search-submit">
        <span class="screen-reader-text"><?php _e('Search', 'mounjaro-magazine'); ?></span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
        </svg>
    </button>
</form>
