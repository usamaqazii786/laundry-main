<?php
/*
    Template Name: About
 */

get_header(); ?>

<div class="background_dark">
    <div class="container clr">
        <div class="my_space"></div>
        <h2 class="text-center">why are we here?</h2>
        <div class="gradient_line"></div>

        <div class="row">
            <!-- -->
            <div class="col-lg-6 col-12 p-5  justify-content-center align-self-center text-center">
                <img class="about_img" src=" <?php echo (get_the_post_thumbnail_url(get_the_ID(), 'full')) ?>" alt="">
            </div>
            <div class="col-lg-6 col-12 p-5">
                <div class="about_text text-justify">
                    <?php
                    echo get_post_field('post_content', $id);

                    ?>

                </div>
            </div>
        </div>
    </div> <!-- /.container -->

    <div id="download" class="about overlay">
        <div class="container clr">

            <div class="row align-items-center justify-content-center">
                <div class="col text-center">
                    <img class=" about_banner" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/PortfolioPreview-min.png" alt="Laundry Portal Application">
                    <div>
                        <a href="https://play.google.com/store/apps/details?id=com.laundryportal.app"><img class="download-btn left" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/IconGoogleplay-min.png" alt="Download Play Store"></a>
                        <a href="https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1"><img class="download-btn right" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/appstore-badge-min.png" alt="Download App Store"></a>
                    </div>
                </div>
            </div>

        </div> <!-- /.container -->
    </div>

    <div class="container clr">

        <!-- Contact Us section-->
        <section id="contactus">

            <h2 class="text-center">contact us</h2>
            <div class="gradient_line"></div>
            <div id="number" class="text-center"><i class="fas gradient_text fa-phone-alt pr-1"></i> +971 52 850 0040</div>
            <div id="mail" class="text-center pointer"><i class="fas gradient_text fa-envelope pr-1"></i> <span id="mailaddress"> customercare@thelaundryportal.com</span></div>
            <?php echo do_shortcode('[wpforms id="53"]'); ?>
        </section>
        <!--./Contact Us-->
    </div> <!-- /.container -->
</div> <!-- /.background_dark -->

<?php get_footer(); ?>