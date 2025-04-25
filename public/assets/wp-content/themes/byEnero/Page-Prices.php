<?php
/*
    Template Name: Prices
 */

get_header(); ?>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">

<div class="background_dark">
    <div class="container clr">
        <div class="my_space"></div>
        <div class="prices">
            <!-- Pricing table section-->


            <?php include 'include/prices_table.php'; ?>

        </div>

        <div class="my_space"></div>

    </div> <!-- /.container -->

</div> <!-- /.background_dark -->

<!-- Pop up download / get SMS -->
<div id="download_popup" class="row pop_up_bg hidden fade-in  text-center justify-content-center align-items-center">
    <i id="close_download_popup" class="fas fa-times save_c"></i>

    <div class="col-5 pop_up_box text-center">


        <div class="cta_content_wrap d-inline-block text-left">

            <h2>Join our Community</h2>
            <p>Let us SMS you a direct link to install our app as well as a <br> <span class="bold">30% offer code</span></p>
            <?php echo do_shortcode('[contact-form-7 id="347" title="SMS Sending"]'); ?>
            <p class="mb-1 pt-3 bold">Or view our app at</p>


            <div class="d-md-block d-none pb-5">
                <a href="https://play.google.com/store/apps/details?id=com.laundryportal.app" target="_blank"><img class="download-btn left save_c" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/IconGoogleplay-min.png" alt="Download Play Store"></a>
                <a href="https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1" target="_blank"><img class="download-btn right save_c" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/appstore-badge-min.png" alt="Download App Store"></a>
            </div>

        </div>
    </div>
    <div class="col-4 text-left ml-4">
        <img class=" img-responsive pop_up_img " src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Laundry-service-dual-view.png" alt="Laundry Portal Near you download">
    </div>
</div>

<?php get_footer(); ?>