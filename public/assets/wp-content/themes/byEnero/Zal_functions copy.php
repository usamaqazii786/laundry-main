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
	wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css', array('oceanwp-style'), $version);
}
add_action('wp_enqueue_scripts', 'oceanwp_child_enqueue_parent_style');

// Remove TablePress plugin CSS in favor of using LESS from Twitter Bootstrap,

add_filter('tablepress_use_default_css', '__return_false');
