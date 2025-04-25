<?php

/**
 * The template for displaying the footer.
 *
 * @package OceanWP WordPress theme
 */ ?>

</main><!-- #main -->

<?php do_action('ocean_after_main'); ?>

<?php do_action('ocean_before_footer'); ?>

<?php
// Elementor `footer` location
if (!function_exists('elementor_theme_do_location') || !elementor_theme_do_location('footer')) { ?>

    <?php do_action('ocean_footer'); ?>

<?php } ?>

<?php do_action('ocean_after_footer'); ?>

</div><!-- #wrap -->

<?php do_action('ocean_after_wrap'); ?>

</div><!-- #outer-wrap -->

<?php do_action('ocean_after_outer_wrap'); ?>

<?php
// If is not sticky footer
if (!class_exists('Ocean_Sticky_Footer')) {
    get_template_part('partials/scroll-top');
} ?>

<?php
// Search overlay style
if ('overlay' == oceanwp_menu_search_style()) {
    get_template_part('partials/header/search-overlay');
} ?>

<?php
// If sidebar mobile menu style
if ('sidebar' == oceanwp_mobile_menu_style()) {

    // Mobile panel close button
    if (get_theme_mod('ocean_mobile_menu_close_btn', true)) {
        get_template_part('partials/mobile/mobile-sidr-close');
    } ?>

    <?php
    // Mobile Menu (if defined)
    get_template_part('partials/mobile/mobile-nav'); ?>

<?php
    // Mobile search form
    if (get_theme_mod('ocean_mobile_menu_search', true)) {
        get_template_part('partials/mobile/mobile-search');
    }
} ?>

<?php
// If full screen mobile menu style
if ('fullscreen' == oceanwp_mobile_menu_style()) {
    get_template_part('partials/mobile/mobile-fullscreen');
} ?>

<?php wp_footer(); ?>

<?php// mobile popup?>
<div class="mobile_popup">
    <div class="row align-items-center justify-content-left pt-3 pb-3">
        <div id="close_mob_popup" class="col-1 text-left ml-4">

            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1.35355" y1="0.646508" x2="11.3892" y2="10.6822" stroke="white" />
                <line x1="0.646447" y1="10.6821" x2="10.6821" y2="0.646422" stroke="white" />
            </svg>

        </div>
        <div class="col-5 pr-0">
            You’re one tap away!
        </div>
        <div class="col-3 text-right">
            <a href="#" class="mobiledownload">
                <div class="mobile_popup_btn mr-5">
                    <img class="mobile_popup_logo" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Laundry-portal-favicon-min.png" alt="Download">
                    Install
                </div>
            </a>
        </div>
    </div>
</div>



<!-- other JavaScript -->
<script src="<?php echo (get_stylesheet_directory_uri()) ?>/eneroscript_ft.js?ver=2.0"></script>

<!-- OWL slider JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Counter-Up/1.0.0/jquery.counterup.min.js"></script>

</body>

</html>