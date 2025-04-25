<section id="prices" class="text-center">
    <h2 class="dborder bblue">Our Pricing</h2>
    <h3 class="text-center">
        Get <span class="bold gradient_text">30% </span>off your first order with promo code
        <span class="bold gradient_text">
            <?php echo get_post_field('30%_discount'); ?>
        </span>
    </h3>
    <div class="row">

        <div class="col-sm-6 col-lg-4 p-5">
            <div class="price_tab">
                <div>
                    <img class="price_images" height="auto" width="100%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/30820.jpg">

                </div>
                <div class="price_tab_content">
                    <div class="h2_prices">Clean & Press</div>
                    <p class="font-italic">Prices starting from</p>
                    <div class="">
                        <?php

                        $table = get_field('clean_&_press_prices_table');

                        if (!empty($table)) {

                            echo '<table border="0">';

                            if (!empty($table['caption'])) {

                                echo '<caption>' . $table['caption'] . '</caption>';
                            }

                            if (!empty($table['header'])) {

                                echo '<thead>';

                                echo '<tr>';

                                foreach ($table['header'] as $th) {

                                    echo '<th>';
                                    echo $th['c'];
                                    echo '</th>';
                                }

                                echo '</tr>';

                                echo '</thead>';
                            }

                            echo '<tbody>';

                            foreach ($table['body'] as $tr) {

                                echo '<tr>';

                                foreach ($tr as $td) {

                                    echo '<td>';
                                    echo $td['c'];
                                    echo '</td>';
                                }

                                echo '</tr>';
                            }

                            echo '</tbody>';

                            echo '</table>';
                        }

                        ?>
                    </div>
                    <div class="price_button_wrap">
                        <div class="pb-3">View full price list in our app</div>

                        <a href="#" class="mobiledownload btn btn-primary black_btn zoom d-md-none">INSTALL NOW</a>
                        <div class="btn open_download_popup  zoom  rounded black_btn d-md-inline-block d-none">INSTALL NOW</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-4 p-5">
            <div class="price_tab">
                <div>
                    <img class="price_images" height="auto" width="100%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/17141.jpg">

                </div>
                <div class="price_tab_content">
                    <div class="h2_prices">Pressing Only </div>
                    <p class="font-italic">Prices starting from</p>
                    <div class="">

                        <?php

                        $table = get_field('pressing_only_prices_table');

                        if (!empty($table)) {

                            echo '<table border="0">';

                            if (!empty($table['caption'])) {

                                echo '<caption>' . $table['caption'] . '</caption>';
                            }

                            if (!empty($table['header'])) {

                                echo '<thead>';

                                echo '<tr>';

                                foreach ($table['header'] as $th) {

                                    echo '<th>';
                                    echo $th['c'];
                                    echo '</th>';
                                }

                                echo '</tr>';

                                echo '</thead>';
                            }

                            echo '<tbody>';

                            foreach ($table['body'] as $tr) {

                                echo '<tr>';

                                foreach ($tr as $td) {

                                    echo '<td>';
                                    echo $td['c'];
                                    echo '</td>';
                                }

                                echo '</tr>';
                            }

                            echo '</tbody>';

                            echo '</table>';
                        }

                        ?>
                    </div>
                    <div class="price_button_wrap">
                        <div class="pb-3">View full price list in our app</div>

                        <a href="#" class="mobiledownload btn btn-primary black_btn zoom d-md-none">INSTALL NOW</a>
                        <div class="btn open_download_popup  zoom  rounded black_btn d-md-inline-block d-none">INSTALL NOW</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-4 p-5">
            <div class="price_tab">
                <div>
                    <img class="price_images" height="auto" width="100%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/2714884.jpg">

                </div>
                <div class="price_tab_content">
                    <div class="h2_prices">Wash & Fold</div>
                    <p class="mt20">
                        <?php echo get_post_field('wash_&_fold_detail'); ?> </p>
                    <div class="font-weight-bold"><?php echo get_post_field('wash_&_fold_price'); ?></div>

                    <div class="price_button_wrap">
                        <div id="toggle_wash_fold_detail" class="btn   zoom  rounded black_btn ">LEARN MORE</div>
                    </div>
                </div>
                <div id="wash_fold_detail" class="hidden">
                    <?php echo get_post_field('wash_&_fold_more'); ?>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-4 p-5">
            <div class="price_tab">
                <div>
                    <img class="price_images" height="auto" width="100%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/2194.jpg">

                </div>
                <div class="price_tab_content">
                    <div class="h2_prices">Carpet Cleaning</div>
                    <p class="pt-3 mt20 font-italic">
                        Starting from
                    </p>
                    <h3 class="m-0 font-weight-bold blk">
                        <?php echo get_post_field('carpet_cleaning_detail'); ?>
                    </h3>
                    <p class="">
                        per m&#178;
                    </p>
                    <div class="price_button_wrap">
                        <div class="pb-3">View full price list in our app</div>

                        <a href="#" class="mobiledownload btn btn-primary black_btn zoom d-md-none">INSTALL NOW</a>
                        <div class="btn open_download_popup  zoom  rounded black_btn d-md-inline-block d-none">INSTALL NOW</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-4 p-5">
            <div class="price_tab">
                <div>
                    <img class="price_images" height="auto" width="100%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/17.jpg">

                </div>
                <div class="price_tab_content">
                    <div class="h2_prices">Curtain Cleaning</div>
                    <p class="pt-3 mt20 font-italic">
                        Starting from</p>
                    <h3 class="m-0 font-weight-bold blk">
                        <?php echo get_post_field('curtain_cleaning_detail'); ?>
                    </h3>
                    <p class="">
                        per m&#178;
                    </p>
                    <div class="price_button_wrap">
                        <div class="pb-3">View full price list in our app</div>

                        <a href="#" class="mobiledownload btn btn-primary black_btn zoom d-md-none">INSTALL NOW</a>
                        <div class="btn open_download_popup  zoom  rounded black_btn d-md-inline-block d-none">INSTALL NOW</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-4 p-5">
            <div class="price_tab">
                <div>
                    <img class="price_images" height="auto" width="100%" src="<?php echo (get_stylesheet_directory_uri()) ?>/img/113.jpg">

                </div>
                <div class="price_tab_content">
                    <div class="h2_prices">Other Services </div>
                    <div class="row justify-content-center">
                        <div class="mt-3 col-auto">
                            <?php echo get_post_field('other_services_detail'); ?>
                        </div>
                    </div>
                    <div class="price_button_wrap">
                        <div class="pb-3">View full price list in our app</div>

                        <a href="#" class="mobiledownload btn btn-primary black_btn zoom d-md-none">INSTALL NOW</a>
                        <div class="btn open_download_popup  zoom  rounded black_btn d-md-inline-block d-none">INSTALL NOW</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>


<div class="row text-center justify-content-center">
    <div class="col-12">
        <h4> See Full Price List </h4>
    </div>
    <div class="col-12">
        <a href="#" class="mobiledownload btn btn-primary gradient zoom d-md-none">DOWNLOAD NOW</a>
        <div class="btn open_download_popup gradient zoom  rounded d-md-inline-block d-none">DOWNLOAD NOW</div>
    </div>
    <div class="my_space"></div>

</div>