<?php
/*
    Template Name: Partners
 */

get_header(); ?>

<div class="background_dark">
    <div class="container clr">
        <div class="my_space"></div>
        <h2 class="text-center">OUR Laundry partners</h2>
        <div class="gradient_line"></div>
        <h3 class="text-center">

            <?php
            echo get_post_field('post_content', $id);
            ?> </h3>

        <!-- Loop through Partners post -->
        <div class="row">
            <?php
            $partners =  new WP_Query($args = array(
                'post_type' => 'lp_partners'
            ));

            if ($partners->have_posts()) :

                while ($partners->have_posts()) :
                    $partners->the_post();

                    $img_id = get_post_field('logo');
                    $services = (get_post_field('services'));


            ?>
                    <div class="col-lg-6 col-12 p-5">
                        <div class="row">
                            <div class="d-inline">
                                <div class="partner_logo">
                                    <?php echo wp_get_attachment_image($img_id, 'medium'); ?>
                                </div>
                            </div>
                            <div class="col-8 justify-content-center align-self-center">
                                <span class="partner_heading gradient_text text-middle"><?php the_title(); ?></span>
                            </div>
                        </div>
                        <p class="pt-3 pb-4 text-justify">
                            <?php echo get_post_field('post_content'); ?>
                        </p>
                        <?php


                        $category = get_post_field('category');

                        ?>
                        <table class="partner_table table-borderless table-sm">
                            <tr>
                                <td class="partner_icon"> <?php get_icon($category) ?></td>
                                <td class="font-weight-bold"> <?php echo $category ?> </td>
                            </tr>
                            <tr>
                                <td> </td>
                            </tr>
                            <?php
                            for ($i = 0; $i < sizeof($services); $i++) {
                            ?>


                                <tr>
                                    <td class="partner_icon"><?php get_icon($services[$i]); ?></i></td>
                                    <td>
                                        <?php
                                        echo $services[$i];

                                        ?>
                                    </td>
                                </tr>

                            <?php
                            }
                            ?>
                        </table>
                    </div>
            <?php

                endwhile;
            else :
                echo "No content";
            endif;
            ?>
        </div>

    </div> <!-- /.container -->
</div> <!-- /.background_dark -->

<?php get_footer(); ?>