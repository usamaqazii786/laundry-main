<?php

/**
 * Child theme functions
 *
 * When using a child theme (see http://codex.wordpress.org/Theme_Development
 * and http://codex.wordpress.org/Child_Themes), you can override certain
 * functions (those wrapped in a function_exists() call) by defining them first
 * in your child theme's functions.php file. The child theme's functions.php
 * file is included before the parent theme's file, so the child theme
 * functions would be used.
 *
 * Text Domain: oceanwp
 * @link http://codex.wordpress.org/Plugin_API
 *
 */

/**
 * Load the parent style.css file
 *
 * @link http://codex.wordpress.org/Child_Themes
 */
function bootstrap_resources()
{
	wp_enqueue_style('bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
}
add_action('wp_enqueue_scripts', 'bootstrap_resources');

function oceanwp_child_enqueue_parent_style()
{
	// Dynamically get version number of the parent stylesheet (lets browsers re-cache your stylesheet when you update your theme)
	$theme   = wp_get_theme('OceanWP');
	$version = $theme->get('Version');
	// Load the stylesheet
	wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css?ver=2.2.3', array('oceanwp-style'), $version);
}
add_action('wp_enqueue_scripts', 'oceanwp_child_enqueue_parent_style');

// Remove TablePress plugin CSS in favor of using LESS from Twitter Bootstrap,

add_filter('tablepress_use_default_css', '__return_false');


function create_posttype()
{
	register_post_type(
		'lp_partners',
		array(
			'labels' => array(
				'name' => __('Partners'),
				'singular_name' => __('Partner')
			),
			'public' => true,
			'has_archive' => true,
			'rewrite' => array('slug' => 'partner'),
		)
	);
}
add_action('init', 'create_posttype');


function get_icon($service)
{
	switch ($service) {
		case "Premium":
			echo '<i class="fas gradient_text fa-award"></i>';
			break;
		case "Premium Budget":
			echo '<i class="fas gradient_text fa-shield-alt"></i>';
			break;
		case "Budget":
			echo '<i class="fas gradient_text fa-percent"></i>';
			break;
		case "Carpet Cleaning":
			echo '<i class="fas gradient_text fa-scroll"></i>';
			break;
		case "Shoe Cleaning":
			echo '<i class="fas gradient_text fa-shoe-prints"></i>';
			break;
		case "Curtain Cleaning":
			echo '<i class="fas gradient_text fa-person-booth"></i>';
			break;
		case "Alteration Services":
			echo '<i class="fas gradient_text fa-cut"></i>';
			break;
		default:
			echo '<i class="gradient_text">•</i>';
	}
}


add_action('wpcf7_before_send_mail', 'process_contact_form_data');
function process_contact_form_data($contact_data)
{
	//$number = $WPCF7_ContactForm->posted_data['intl_tel-812'];
	$submission = WPCF7_Submission::get_instance();

	if ($submission) {
		$posted_data = $submission->get_posted_data();
	}
	$number = $posted_data['intl_tel-812'];
	$sms_text = get_field('sms_text', 38);

	$args = array(
		'number_to' => $number, //'+420724368843',
		'message' => $sms_text, //'Hello Programmer!',
	);
	twl_send_sms($args);
}
