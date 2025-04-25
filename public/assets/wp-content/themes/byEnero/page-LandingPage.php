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
                    <h3 class="subheader"><?php echo get_post_field('step_1_text'); ?></h3>
                    <div class="d-lg-block d-none">
                        <a href="https://play.google.com/store/apps/details?id=com.laundryportal.app" target="_blank"><img class="download-btn left" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/IconGoogleplay-min.png" alt="Download Play Store"></a>
                        <a href="https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1" target="_blank"><img class="download-btn right" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/appstore-badge-min.png" alt="Download App Store"></a>

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
                        <a href="https://play.google.com/store/apps/details?id=com.laundryportal.app" target="_blank"><img class="download-btn left" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/IconGoogleplay-min.png" alt="Download Play Store"></a>
                        <a href="https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1" target="_blank"><img class="download-btn  right" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/appstore-badge-min.png" alt="Download App Store"></a>

                    </div>
                </div>
            </div>
        </div> <!-- /.container -->
        <a href="#next" id="next"> How does it work? <br><i class="fas gradient_text fa-chevron-down"></i>
        </a>
    </div>
</div>
<!-- /Header section-->


<!-- Call to action section -->
<div id="cta">
    <div class="cta_bg"></div>

    <div class="cta overlay">
        <div class="container clr">
            <div class="row cta_row align-items-center justify-content-center">

                <div class="col-lg-7 cta_col_1 col-md-9 align-items-center pt-5 text-left">


                    <h2 class="feature_heading">
                        <div class="faded"> Unique </div> Laundry app
                    </h2>
                    <div class="feature_line"></div>
                    <div class="cta_text">
                        <?php
                        echo get_post_field('post_content', $id);
                        ?>
                    </div>

                    <table class="table-borderless table-sm cta_table">
                        <tr>
                            <td class="feature_icon"> <i class="fas fa-truck"></i></td>
                            <td> Free Pick up & Delivery Service </td>
                        </tr>

                        <tr>
                            <td class="feature_icon"><i class="far fa-calendar-alt"></i></td>
                            <td>
                                Flexible Time Scheduling </td>
                        </tr>



                        <tr>
                            <td class="feature_icon"><i class="fas fa-binoculars"></i></td>
                            <td>
                                Order Status Tracking </td>
                        </tr>

                        <tr>
                            <td class="feature_icon"><i class="fas fa-headset"></i></td>
                            <td>
                                Live Chat </td>
                        </tr>
                        <tr>
                            <td class="feature_icon"><i class="fas fa-tags"></i></td>
                            <td>
                                Discounts & Offers </td>
                        </tr>

                    </table>

                </div>
                <div class="col-lg-5 col-md-3 text-center">
                    <img class="cta-img d-md-inline d-none" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/home1.jpg" alt="Laundry Portal Application">
                </div>
            </div>
        </div> <!-- /.container -->
    </div>
</div><!-- /.CTA section -->


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
                            <a href="#" class="mobiledownload btn btn-primary zoom gradient right d-md-none ">Try it Today<br></a>

                            <div class="d-md-block d-none try_store">
                                <a href="https://play.google.com/store/apps/details?id=com.laundryportal.app" target="_blank"><img class="download-btn left" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/IconGoogleplay-min.png" alt="Download Play Store"></a>
                                <a href="https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1" target="_blank"><img class="download-btn right" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/appstore-badge-min.png" alt="Download App Store"></a>
                            </div>
                        </div>

                    </div>
                </div>
            </div> <!-- ./Try now slide -->

        </div>
    </div>
</section><!-- /.How does it work section -->

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

<!-- Pop up game -->
<div id="popup" class="row pop_up_bg fade-in hidden text-center justify-content-center align-items-center">
    <div class="col-md-6 col-10 pop_up_box gradient text-center rounded">

        <i id="close_popup" class="fas fa-times save_c"></i>
        <div class="cta_content_wrap">

            <div id="lets_not" class="cta_header hidden scratched">
                Come on now! Don't push your luck!
            </div>
            <div id="snooze" class="cta_header hidden scratched">Sorry, you snooze, you lose!</div>
            <div id="hide_cta">
                <div class="cta_header scratched pt-5">GET <span id="percent" class="counter"></span>% OFF</div>
                <div class="row cta_subheader justify-content-center">
                    <div class="col-auto nopadding text-right">with promo &nbsp;</div>
                    <div class="col-auto nopadding text-left" id="cta_code">
                        <div id="code_10"><?php echo get_post_field('10%_discount'); ?></div>
                        <div id="code_20" class="hidden"><?php echo get_post_field('20%_discount'); ?></div>
                        <div id="code_30" class="hidden"><?php echo get_post_field('30%_discount'); ?></div>
                    </div>
                </div>
                <div id="timer"><i class="far fa-clock"></i> Valid for <span id="time">30</span>s</div>
            </div>
            <div class="white_buttons">
                <div id="wantmore" class="wantmore btn black pointer mb-2 mr-md-0 mr-0 mr-sm-3">GET MORE</div>
                <a id="cta_odrer_now_btn" href="#" class="mobiledownload save_c btn zoom white d-md-none mb-2 ml-0 ml-sm-3">ORDER NOW</a>
            </div>
            <div class="d-md-block d-none pb-5">
                <a href="https://play.google.com/store/apps/details?id=com.laundryportal.app" target="_blank"><img class="download-btn left save_c" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/IconGoogleplay-min.png" alt="Download Play Store"></a>
                <a href="https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1" target="_blank"><img class="download-btn right save_c" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/appstore-badge-min.png" alt="Download App Store"></a>
            </div>

        </div>
    </div>
</div>

<?php get_footer(); ?>