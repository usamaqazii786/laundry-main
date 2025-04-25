<?php
/*
    Template Name: LandingPage2
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
                <img class="discount stamp open_download_popup zoom d-md-block d-none" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/stamp discount-min.png" alt="Discount on laundry WB30">

                    <h1 class="main_header gradient_text">LAUNDRY PORTAL</h1>
                    <div class="gradient_line"></div>


                    <!-- OWL Slider bellow header slider -->
                    <div class="owl-six owl-carousel text-center">
                        <div>
                            <h3 class="subheader"><?php echo get_post_field('underneath_laundry_portal'); ?></h3>
                        </div>
                        <div>
                            <h3 class="subheader"><?php echo get_post_field('underneath_laundry_portal_2'); ?></h3>

                        </div>
                        <div>
                            <h3 class="subheader"><?php echo get_post_field('underneath_laundry_portal_3'); ?></h3>
                        </div>

                        <!-- <h3 class="subheader"><?php // echo get_post_field('underneath_laundry_portal'); 
                                                    ?></h3> -->
                    </div>
                    <div class="d-lg-block d-none">
                        <img class="download-btn left  open_download_popup zoom" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/IconGoogleplay-min.png" alt="Download Play Store">
                        <img class="download-btn right open_download_popup zoom" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/appstore-badge-min.png" alt="Download App Store">

                    </div>
                    <a href="#" class="mobiledownload">
                        <img class="discount stamp d-md-none" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/stamp discount-min.png" alt="Discount on laundry WB30">
                    </a>
                </div>
                <!-- /.col-md-4 -->
                <div class="col-lg-5 text-center fade-in three">
                    <div id="hero">
                        <div class="hero_bg paralaxBG"></div>
                        <img class="banner img-responsive bouncy" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Laundry-Portal-Paralax-min.png" alt="Laundry Portal Application">
                    </div>
                    <h5 class="letus text-center d-md-none"><br></h5>
                    <a href="#" class="mobiledownload btn btn-primary gradient zoom d-md-none">Order now</a>

                    <div class="d-lg-none d-md-block d-none">
                        <img class="download-btn left open_download_popup zoom" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/IconGoogleplay-min.png" alt="Download Play Store">
                        

                    </div>
                </div>
            </div>
        </div> <!-- /.container -->
        <a href="#next" id="next"> How does it work? <br><i class="fas gradient_text fa-chevron-down"></i>
        </a>
    </div>
</div>
<!-- /Header section-->


<!-- How does it work & Video section-->
<section id="howdoesitwork" class="background_dark">

    <div class="container clr">

        <?php include 'include/prices.php'; ?>


        <section id="video" class="row pb-5">
            <div class="col-md-7">

                <div class="d-flex position-relative video_thumbnail_wrap">
                    <img class="video_thumbnail" height="auto" width="100%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Laundry-near-you-Video-thumbnail.jpg">
                    <img id="play" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/play.png" data-videourl=<?php echo ('"' . get_post_field('video-url') . '"'); ?>>
                </div>

            </div>
            <div class="col-md-5 pt-md-0 pt-4 dborder_container">
                <div class="dborder left bblue"><br><br></div>
                <h2 class="dborder_heading">Designed for You</h2>
                <div class=" text-justify dborder left full bblue stretch">
                    <?php echo get_post_field('video_description'); ?>
                </div>
            </div>
        </section>
    </div> <!-- /.container -->

    <div class="howdoesitwork_container">
        <div class="my_space"></div>
        <div class="row text-center">
            <h2 class="text-center howdoesitwork dborder_heading dborder bblue">How does it work?</h2>
        </div>
        <!-- OWL Slider how does it work -->

        <div class="owl-one owl-carousel text-center">

            <div data-hash="step1">
                <!--  <div data-hash="step1"> -->
                <div class="row hdw align-items-center">

                    <div class="col-md-6 text-md-left">
                        <div class="hdw_text_wrap fade-in three prvni">
                            <h3 class="card-title how-title pb-md-3">1. Choose Your Laundry</h3>
                            <div class="find_out one d-md-none">Read More <i class="fa fa-chevron-right"></i></div>
                            <p class="overlay-text one">
                                <?php echo get_post_field('step_1_text'); ?>
                            </p>
                        </div>

                    </div>
                    <div class="col-md-6 text-md-left">
                        <div class="hdw_phone">
                            <?php
                            $img_id = get_post_field('step_1_screenshot');
                            echo wp_get_attachment_image($img_id, 'full', false, ['alt' => 'Choose Your Laundry', "class" => "screenshot rounded mb-4 mb-lg-0"]);
                            ?>
                        </div>
                    </div>
                </div>
            </div>

            <div data-hash="step2">
                <div class="row hdw align-items-center">

                    <div class="col-md-6 text-md-left">
                        <div class="hdw_text_wrap">
                            <h3 class="card-title how-title pb-md-3">2. Choose Your Timings</h3>
                            <div class="find_out two d-md-none">Read More <i class="fa fa-chevron-right"></i></div>
                            <p class="overlay-text two">
                                <?php echo get_post_field('step_2_text'); ?>
                            </p>
                        </div>

                    </div>
                    <div class="col-md-6 text-md-left">
                        <div class="hdw_phone">
                            <?php
                            $img_id = get_post_field('step_2_screenshot');
                            echo wp_get_attachment_image($img_id, 'full', false, ['alt' => 'Select Pick-up & Delivery Time', "class" => "screenshot rounded mb-4 mb-lg-0"]);
                            ?>
                        </div>
                    </div>
                </div>
            </div>

            <div data-hash="step3">
                <div class="row hdw align-items-center">

                    <div class="col-md-6 text-md-left">
                        <div class="hdw_text_wrap">
                            <h3 class="card-title how-title pb-md-3">3. Place Your Order</h3>
                            <div class="find_out two d-md-none">Read More <i class="fa fa-chevron-right"></i></div>
                            <p class="overlay-text two">
                                <?php echo get_post_field('step_3_text'); ?>
                            </p>
                        </div>

                    </div>
                    <div class="col-md-6 text-md-left">
                        <div class="hdw_phone">
                            <?php
                            $img_id = get_post_field('step_3_screenshot');
                            echo wp_get_attachment_image($img_id, 'full', false, ['alt' => 'Check Out', "class" => "screenshot rounded mb-4 mb-lg-0"]);
                            ?>
                        </div>
                    </div>
                </div>
            </div>

            <div data-hash="step4">
                <!-- Try now slide -->
                <div class=" col testimonial-box">
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
                        <a href="#" class="mobiledownload btn btn-primary gradient zoom d-md-none">TRY IT TODAY</a>
                        <div class="btn open_download_popup gradient zoom  rounded d-md-inline-block d-none">TRY IT TODAY</div>
                        <!--
                        <a href="#" class="mobiledownload btn btn-primary zoom gradient right d-md-none ">Try it Today<br></a>

                        <div class="d-md-block d-none try_store">
                            <a href="https://play.google.com/store/apps/details?id=com.laundryportal.app" target="_blank"><img class="download-btn left" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/IconGoogleplay-min.png" alt="Download Play Store"></a>
                            <a href="https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1" target="_blank"><img class="download-btn right" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/appstore-badge-min.png" alt="Download App Store"></a>
                        </div>
-->
                    </div>

                </div>
            </div> <!-- ./Try now slide -->

        </div>

        <!--    Navigation for carousel HDW -->
        <div class="row hdw_navigation d-md-flex d-none">
            <div class="col-3">
                <a id="step1_id" class="step active" href="#step1">
                    Step 1
                </a>
            </div>
            <div class="col-3">
                <a id="step2_id" class="step" href="#step2">
                    Step 2
                </a>
            </div>
            <div class="col-3">
                <a id="step3_id" class="step" href="#step3">
                    Step 3
                </a>
            </div>
            <div class="col-3">
                <a id="step4_id" class="step" href="#step4">
                    Let’s go!
                </a>
            </div>

        </div>

        <div class="my_space"></div>
    </div>
</section><!-- /.How does it work section -->

<!-- Features section -->

<div id="cta">
    <div class="cta_bg"></div>

    <div class="cta overlay">
        <div class="container clr">
            <section id="features" class="text-center">
                <div id="features_ancor" class="ancor"></div>
                <h2 class="dborder darkblue">App features</h2>
                <div class="row align-items-center">
                    <div class="col-md-3 col-6 order-2 order-md-1 text-left">

                        <a id="fees-id" href="#fees">
                            <div class="row feature_wrap text-center justify-content-end align-items-center pt-3 pb-3 zoom active">
                                <div class="col-md-3 pl-0 pr-0 pr-md-2">
                                    <img class="feature_icon" height="50px" width="auto" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/icons/fees.svg">
                                </div>
                                <div class="col-md-8 pl-4 text-md-left">
                                    No service fees<br>&nbsp;
                                </div>
                            </div>
                        </a>

                        <a id="pay-id" href="#pay">
                            <div class="row feature_wrap text-center align-items-center pt-3 pb-3 zoom">
                                <div class="col-md-3 pl-0 pr-0 pr-md-2">
                                    <img class="feature_icon" height="50px" width="auto" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/icons/payment.svg"> </div>
                                <div class="col-md-8 pl-4 text-md-left"> Pay by Cash or Credit Card
                                </div>
                            </div>
                        </a>

                        <a id="flexible-id" href="#flexible">
                            <div class="row feature_wrap text-center align-items-center pt-3 pb-3 zoom">
                                <div class="col-md-3 pl-0 pr-0 pr-md-2">
                                    <img class="feature_icon" height="50px" width="auto" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/icons/flexible.svg"> </div>
                                <div class="col-md-8 pl-4 text-md-left">Flexible Time Booking
                                </div>
                            </div>
                        </a>

                        <a id="variety-id" href="#variety">
                            <div class="row feature_wrap text-center justify-content-end align-items-center pt-3 pb-3 zoom">
                                <div class="col-md-3 pl-0 pr-0 pr-md-2">
                                    <img class="feature_icon" height="50px" width="auto" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/icons/services.svg"> </div>
                                <div class="col-md-8 pl-4 text-md-left"> Wide Variety of Services
                                </div>
                            </div>
                        </a>

                    </div>

                    <div class="col-md-6 order-1 order-md-2 p-3 text-center pb-md-2 pb-5 ">
                        <div class="row justify-content-center align-items-end mobile_screens">
                            <div class="col-6 d-flex justify-content-center mobile_screen">
                                <div class="owl-five owl-carousel text-center">

                                    <div data-hash="fees"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Default%20Display%201.jpg"></div>
                                    <div data-hash="pay"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Pay%20by%20cash%20or%20card%201.jpg"></div>
                                    <div data-hash="flexible"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Flexible%20time%20Booking%201.jpg"></div>
                                    <div data-hash="variety"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Wide%20variety%20of%20services%201.jpg"></div>
                                    <div data-hash="pricing"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Transparent%20Pricing.%20No%20Mark%20Ups.%201.jpg"></div>
                                    <div data-hash="next_day"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Same%20or%20next%20day%20service%201.jpg"></div>
                                    <div data-hash="status"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Order%20Status%20Updtes%201.jpg"></div>
                                    <div data-hash="chat"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Live%20Chat%20Customer%20service%201.jpg"></div>

                                </div>

                                <div class="features_phone_bg left_bg">
                                    <img src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Laundry-Portal-Phone-bg-transparent.png" alt="phone bg">
                                </div>
                            </div>
                            <div class="col-6 d-flex justify-content-center mobile_screen smaller">

                                <div class="owl-four owl-carousel text-center">

                                    <div data-hash="fees"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Default%20Display%202.jpg"></div>
                                    <div data-hash="pay"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Pay%20by%20cash%20or%20card%202.jpg"></div>
                                    <div data-hash="flexible"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Flexible%20time%20booking%202.jpg"></div>
                                    <div data-hash="variety"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Wide%20variety%20of%20services%202.jpg"></div>
                                    <div data-hash="pricing"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Transparent%20Pricing.%20No%20Mark%20Ups.%202.jpg"></div>
                                    <div data-hash="next_day"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Same%20or%20next%20day%20service%202.jpg"></div>
                                    <div data-hash="status"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Order%20Status%20Updates%202.jpg"></div>
                                    <div data-hash="chat"><img class="features_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Features%20Screenshots/Live%20chat%20customer%20service%202.jpg"></div>
                                </div>
                                <div class="features_phone_bg right_bg">
                                    <img src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Laundry-Portal-Phone-bg-transparent.png" alt="phone bg">
                                </div>
                            </div>
                        </div>



                    </div>
                    <div class="col-md-3 col-6 order-3 order-md-3 text-right">

                        <a id="pricing-id" href="#pricing">
                            <div class="row feature_wrap text-center align-items-center pt-3 pb-3 zoom">

                                <div class="col-md-8 pl-1 order-2 order-md-1 text-md-right">
                                    Transparent Pricing. No Mark Ups
                                </div>
                                <div class="col-md-3 pr-0 order-1 order-md-2">
                                    <img class="feature_icon" height="50px" width="auto" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/icons/pricing.svg">
                                </div>
                            </div>
                        </a>

                        <a id="next_day-id" href="#next_day">
                            <div class="row feature_wrap justify-content-end text-center align-items-center pt-3 pb-3 zoom">

                                <div class="col-md-8 pl-1 order-2 order-md-1 text-md-right">
                                    Same or Next Day Service
                                </div>
                                <div class="col-md-3 pr-0 order-1 order-md-2  pl-0 pl-md-2">
                                    <img class="feature_icon" height="50px" width="auto" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/icons/same%20day.svg">
                                </div>
                            </div>
                        </a>

                        <a id="status-id" href="#status">
                            <div class="row feature_wrap justify-content-end text-center align-items-center pt-3 pb-3 zoom">

                                <div class="col-md-8 pl-1 order-2 order-md-1 text-md-right">
                                    Order Status Updates
                                </div>
                                <div class="col-md-3 pr-0 order-1 order-md-2  pl-0 pl-md-2">
                                    <img class="feature_icon" height="50px" width="auto" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/icons/tracking.svg">
                                </div>
                            </div>
                        </a>

                        <a id="chat-id" href="#chat">
                            <div class="row feature_wrap text-center align-items-center pt-3 pb-3 zoom">

                                <div class="col-md-8 pl-1 order-2 order-md-1 text-md-right">
                                    Live Chat Customer Service
                                </div>
                                <div class="col-md-3 pr-0 order-1 order-md-2  pl-0 pl-md-2">
                                    <img class="feature_icon" height="50px" width="auto" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/icons/Group%202.svg">
                                </div>
                            </div>
                        </a>


                    </div>
                </div>
            </section>
        </div> <!-- /.container -->
    </div>
</div><!-- /.Features section -->


<div class="background_dark">
    <div class="container clr">
        <!-- Pricing Section-->
        <section class="prices">
            <!-- Pricing table section-->
            <?php include 'include/services.php'; ?>
        </section>
    </div>
</div>


<div id="who_are_we">
    <div class="cta_bg"></div>

    <div class="cta overlay">
        <div class="container clr">


            <section id="who_are_we" class="text-center">
                <h2 class="dborder darkblue">Who are we?</h2>

                <div class="row text-left">

                    <div class="col-md-6 pr-md-4 mb-5 mt-5 dborder_container">
                        <div class="dborder left darkblue"><br></div>
                        <h2 class="dborder_heading">Our Vision</h2>
                        <div class="text-justify dborder left darkblue stretch">
                            To create a digital eco-system that seamlessly connects laundry service providers with customers, ultimately freeing up their time for matters best suited to their expertise and desires. </div>
                    </div>
                    <div class="col-md-6 mb-5 mb-md-5 mt-md-5 d-none d-md-block">
                        <img class="whoarewe_images" height="auto" width="100%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Laundry-portal-near-you-about.jpg">
                    </div>
                    <div class="col-md-6 pr-md-4 mb-md-5 mt-md-5">
                        <img class="whoarewe_images" height="auto" width="90%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Vision Pitch Deck.jpg">
                    </div>
                    <div class="col-md-6 mb-5 mt-5 dborder_container">
                        <div class="dborder left darkblue"><br></div>
                        <h2 class="dborder_heading">About Us</h2>
                        <div class="text-justify dborder left darkblue stretch">
                            We are a locally grown Dubai-based brand inspired by the constant digitization and convenience-craving culture that has cultivated over recent years. Connection Hub Portal is happy to have launched Laundry Portal, a new uniquely styled mobile-app that enables users to browse and schedule their laundry services from a wide selection of high-quality and trusted dry cleaning companies. We offer a simple and seamless user experience aimed at modernizing the existing approach, eliminating miscommunication and providing unquestionable customer satisfaction. </div>
                    </div>
                    <div class="col-md-6 order-2 order-md-1 pr-md-4 mb-5 mt-5 dborder_container">
                        <div class="dborder left darkblue"><br></div>
                        <h2 class="dborder_heading">Why choose us?</h2>
                        <div class="text-justify dborder left darkblue stretch">
                            We don’t just provide a simple mechanism for scheduling nearby laundry services, we overlay the entire experience with world class customer service. And by revitalizing an industry that traditionally suffers from wide-spread miscommunication and non-existent customer service, we afford you the freedoms to kick back and enjoy the stress-free nature of it all. </div>
                    </div>
                    <div class="col-md-6 order-1 order-md-2 mb-md-5 mt-md-5">
                        <img class="whoarewe_images" height="auto" width="100%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/Laundry-portal-near-you-why.jpg">
                    </div>


                </div>
            </section>


        </div>
    </div>
</div>



<div class="background_dark">
    <div class="container clr">
        <!-- Testimonials Section-->
        <section id="testimonials">
            <div class="row text-center pb-5 pt-5">
                <h2 class="text-center howdoesitwork dborder_heading dborder bblue">customer feedback</h2>
            </div>

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
        <section id="contactus">

            <div class="row text-center">
                <h2 class="text-center dborder bblue">contact us</h2>
            </div>
            <div id="number" class="text-center"><i class="fas gradient_text fa-phone-alt pr-1"></i> +971 52 850 0040</div>
            <div id="mail" class="text-center"><i class="fas gradient_text fa-envelope pr-1"></i> <span id="mailaddress">customercare@thelaundryportal.com</span></div>
            <?php echo do_shortcode('[wpforms id="53"]'); ?>
        </section>
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
                <img class="download-btn left save_c open_download_popup zoom" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/IconGoogleplay-min.png" alt="Download Play Store">
                <img class="download-btn right save_c open_download_popup zoom" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/appstore-badge-min.png" alt="Download App Store">
            </div>

        </div>
    </div>
</div>

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