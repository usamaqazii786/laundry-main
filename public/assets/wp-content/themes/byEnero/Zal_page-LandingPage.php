<?php
/*
    Template Name: LandingPage
 */

get_header(); ?>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">
<!-- Header section-->
<div id="header">
    <div class="header_bg"></div>
    <div class="header overlay">
        <div class="container clr">
            <div class="row header_row align-items-center justify-content-center">
                <div class="col-lg-7 align-items-center text-center fade-in two">
                    <h1 class="main_header  gradient_text">LAUNDRY PORTAL</h1>
                    <div class="gradient_line"></div>
                    <h3 class="subheader">Connecting you with trusted laundry companies</h3>
                    <div class="d-lg-block d-none">
                        <a href="https://play.google.com/store/apps/details?id=com.laundryportal.app"><img class="download-btn left" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/IconGoogleplay-min.png" alt="Download Play Store"></a>
                        <a href="https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1"><img class="download-btn right" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/appstore-badge-min.png" alt="Download App Store"></a>

                        <h4 class="letus text-center">Manage your time, your way</h4>
                    </div>

                </div>
                <!-- /.col-md-4 -->
                <div class="col-lg-5 text-center fade-in three">

                    <div id="hero">
                        <div class="hero_bg paralaxBG"></div>
                        <img class="banner img-responsive bouncy" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Laundry-Portal-Paralax-min.png" alt="Laundry Portal Application">
                    </div>
                    <h4 class="letus text-center d-md-none">Manage your time, your way</h4>
                    <a href="#" class="mobiledownload btn btn-primary gradient zoom d-md-none">Order now</a>
                    <div class="d-lg-none d-md-block d-none">
                        <a href="https://play.google.com/store/apps/details?id=com.laundryportal.app"><img class="download-btn left" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/IconGoogleplay-min.png" alt="Download Play Store"></a>
                        <a href="https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1"><img class="download-btn  right" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/appstore-badge-min.png" alt="Download App Store"></a>

                        <h4 class="letus text-center">Manage your time, your way</h4>
                    </div>
                </div>
            </div>
        </div> <!-- /.container -->
        <a href="#next" id="next"> How does it work? <br><i class="fas gradient_text fa-chevron-down"></i>
        </a>
    </div>
</div>
<!-- /Header section-->

<!-- How does it work section-->
<section id="howdoesitwork" class="background_dark">
    <div class="howdoesitwork_container">
        <h2 class="text-center howdoesitwork">How does it work?</h2>
        <div class="gradient_line"></div>
        <!-- OWL Slider how does it work -->
        <div class="owl-one owl-carousel text-center">
            <div>
                <div class="col testimonial-box">
                    <div class="steps">Step 1</div>
                    <div class="card h_660">
                        <div id="refh" class="card-body">
                            <div class="toggle">
                                <h3 class="card-title how-title gradient_text">Choose Your Laundry</h3>
                                <p class="overlay-text hidden">
                                    <?php echo get_post_field('step_1_text'); ?>
                                </p>
                                <div class="find_out">Read More <i class="fa fa-chevron-right"></i></div>

                                <?php
                                $img_id = get_post_field('step_1_screenshot');
                                echo wp_get_attachment_image($img_id, 'full', false, ['alt' => 'Choose Your Laundry', "class" => "screenshot rounded mb-4 mb-lg-0"]);
                                ?>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="col testimonial-box">
                    <div class="steps">Step 2</div>
                    <div class="card h_660">
                        <div id="refh" class="card-body">
                            <div class="toggle">
                                <h3 class="card-title how-title gradient_text">Select Pick-up & Delivery Time</h3>
                                <p class="overlay-text hidden">
                                    <?php echo get_post_field('step_2_text'); ?>
                                </p>
                                <div class="find_out">Read More <i class="fa fa-chevron-right"></i></div>
                                <?php
                                $img_id = get_post_field('step_2_screenshot');
                                echo wp_get_attachment_image($img_id, 'full', false, ['alt' => 'Select Pick-up & Delivery Time', "class" => "screenshot rounded mb-4 mb-lg-0"]);
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="col testimonial-box">
                    <div class="steps">Step 3</div>
                    <div class="card h_660">
                        <div id="refh" class="card-body">
                            <div class="toggle">
                                <h3 class="card-title how-title gradient_text">Check Out</h3>
                                <p class="overlay-text hidden">
                                    <?php echo get_post_field('step_3_text'); ?>
                                </p>
                                <div class="find_out">Read More <i class="fa fa-chevron-right"></i></div>
                                <?php
                                $img_id = get_post_field('step_3_screenshot');
                                echo wp_get_attachment_image($img_id, 'full', false, ['alt' => 'Check Out', "class" => "screenshot rounded mb-4 mb-lg-0"]);
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <!-- Try now slide -->
                <div class="col testimonial-box">
                    <div class="steps">Step 4</div>
                    <div class="card h_660">
                        <div id="trynow" class="card-body">
                            <h3 class="card-title how-title gradient_text">Now You're Ready!</h3>
                            <img class="img-responsive walking" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Walking Final-min.png" alt="Set yourself free">
                            <div class="scratched gradient_text try_header">
                                30% OFF
                            </div>
                            <div class="try_subheader">
                                with promo <span class="try_code gradient_text"><?php echo get_post_field('30%_discount'); ?></span>
                            </div>
                        </div>
                        <div class="try_buttons">
                            <a href="#" class="mobiledownload btn btn-primary zoom gradient right d-md-none ">ORDER NOW<br></a>

                            <div class="d-md-block d-none try_store">
                                <a href="https://play.google.com/store/apps/details?id=com.laundryportal.app"><img class="download-btn left" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/IconGoogleplay-min.png" alt="Download Play Store"></a>
                                <a href="https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1"><img class="download-btn right" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/appstore-badge-min.png" alt="Download App Store"></a>
                            </div>
                        </div>

                    </div>
                </div>
            </div> <!-- ./Try now slide -->

        </div>
    </div>
</section><!-- /.How does it work section -->

<!-- Call to action section -->
<div id="cta">
    <div class="cta_bg"></div>

    <div class="cta overlay">
        <div class="container clr">
            <div class="row cta_row align-items-center justify-content-center">

                <div class="col-lg-7 cta_col_1 col-md-9 align-items-center text-center">
                    <div id="lets_not">
                        Let's not try our luck
                    </div>
                    <div class="cta_header scratched">GET <span id="percent" class="counter"></span>% OFF</div>
                    <div class="cta_subheader">with promo <span id="cta_code">WEB10</span></div>
                    <div id="timer" class="hidden"><i class="far fa-clock"></i> Valid for <span id="time"></span>s</div>
                    <div class="white_buttons">
                        <div id="wantmore" class="wantmore btn zoom black pointer mb-2 mr-md-0 mr-0 mr-sm-3">GET MORE</div>
                        <a href="#" class="mobiledownload btn zoom white d-md-none mb-2 ml-0 ml-sm-3">ORDER NOW</a>
                    </div>
                    <div class="d-md-block d-none">
                        <a href="https://play.google.com/store/apps/details?id=com.laundryportal.app"><img class="download-btn left" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/IconGoogleplay-min.png" alt="Download Play Store"></a>
                        <a href="https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1"><img class="download-btn right" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/appstore-badge-min.png" alt="Download App Store"></a>
                    </div>
                </div>
                <div class="col-lg-5 col-md-3 text-center">
                    <img class="cta-img d-md-block d-none" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/home1.jpg" alt="Laundry Portal Application">
                </div>
            </div>
        </div> <!-- /.container -->
    </div>
</div><!-- /.CTA section -->

<div class="background_dark">
    <div class="container clr">

        <!-- Pricing Section-->
        <div class="my_space"></div>
        <div class="prices">
            <!-- Pricing table section-->
            <h2 class="text-center">OUR PRICES</h2>
            <div class="gradient_line"></div>

            <?php include 'include/prices_table.php'; ?>
        </div>

        <!-- Testimonials Section-->
        <section id="testimonials">
            <h2 class="text-center howdoesitwork">customer feedback</h2>
            <div class="gradient_line"></div>

            <!-- OWL Slider testimonials -->
            <div class="owl-two owl-carousel text-center">
                <div>
                    <div class="col testimonial-box">
                        <div class="card h-100">
                            <div class="card-body">
                                <h3 class="card-title name">John Tattarakis</h3>
                                <i class="blue fa fa-quote-left"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-quote-right"></i>

                                <p class="card-text">Stylish and intuitive interface. Makes getting your laundry done an absolute breeze. The notifications are clever and catchy too. Great app!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="col testimonial-box">
                        <div class="card h-100">
                            <div class="card-body">
                                <h3 class="card-title name">Ali Whitey</h3>
                                <i class="blue fa fa-quote-left"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-quote-right"></i>

                                <p class="card-text">A well designed app! It shows you all the available laundry places around you, let’s you know all the prices for all the services with reviews to each place. Highly recommended!!.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="col testimonial-box">
                        <div class="card h-100">
                            <div class="card-body">
                                <h3 class="card-title name">Sherwin Basti</h3>
                                <i class="blue fa fa-quote-left"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-quote-right"></i>

                                <p class="card-text">Fantastic app to use. Makes the laundry process much more convenient.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="col testimonial-box">
                        <div class="card h-100">
                            <div class="card-body">
                                <h3 class="card-title name">Joanne B.</h3>
                                <i class="blue fa fa-quote-left"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-star"></i>
                                <i class="blue fa fa-quote-right"></i>

                                <p class="card-text">The best laundry service app i have come across. Simple, straighforward and has great offers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> <!-- /.testimonials section -->


        <!-- Contact Us section-->
        <div id="contactus">

            <h2 class="text-center">contact us</h2>
            <div class="gradient_line"></div>
            <div id="number" class="text-center"><i class="fas gradient_text fa-phone-alt pr-1"></i> +971 52 850 0040</div>
            <div id="mail" class="text-center"><i class="fas gradient_text fa-envelope pr-1"></i> <span id="mailaddress">customercare@thelaundryportal.com</span></div>
            <?php echo do_shortcode('[wpforms id="53"]'); ?>
        </div>
        <!--./Contact Us-->

    </div> <!-- /.container -->
</div> <!-- /.background_dark -->

<?php get_footer(); ?>