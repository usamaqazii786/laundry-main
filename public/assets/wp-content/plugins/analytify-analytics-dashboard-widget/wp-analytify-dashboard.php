<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/*
 * Plugin Name: Analytify Dashboard Widget
 * Plugin URI: https://analytify.io/add-ons/google-analytics-dashboard-widget-wordpress/
 * Description: This Analytify's free addon adds the Google Analytics widget at WordPress dashboard.
 * Version: 5.5.1
 * License: GPLv3 or later
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 * Author: Analytify
 * Author URI: https://analytify.io/details
 * Text Domain: analytify-analytics-dashboard-widget
 * Domain Path: /languages
 * Requires Plugins: wp-analytify
 */

define( 'ANALYTIFY_DASHBOARD_VERSION', '5.5.1' );
define( 'ANALYTIFY_DASHBOARD_ROOT_PATH', dirname( __FILE__ ) );
define( 'ANALYTIFY_WIDGET_PATH', plugin_dir_url( __FILE__ ) );

// Helper static methods.
require_once ANALYTIFY_DASHBOARD_ROOT_PATH . '/classes/analytify-widget-helper.php';

/**
 * Init plugin.
 *
 * @since 1.0.0
 */
function wp_install_analytify_dashboard() {

	add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'wp_analytify_dashboard_plugin_action_links', 10 );
	add_action( 'admin_enqueue_scripts', 'pa_dashboard_layout_script' );

	if ( ! file_exists( WP_PLUGIN_DIR . '/wp-analytify/analytify-general.php' ) ) {
		add_action( 'admin_notices', 'pa_install_free_dashboard' );
		add_action( 'wp_dashboard_setup', 'add_analytify_widget' );
		return;
	}

	if ( ! in_array( 'wp-analytify/wp-analytify.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ), true ) ) {
		add_action( 'admin_notices', 'pa_activate_free_dashboard' );
		add_action( 'wp_dashboard_setup', 'add_analytify_widget' );
		return;
	}

	require_once ANALYTIFY_DASHBOARD_ROOT_PATH . '/classes/analytify-widget-addon.php';
	require_once ANALYTIFY_DASHBOARD_ROOT_PATH . '/classes/analytify-widget-rest-api.php';

}
add_action( 'plugins_loaded', 'wp_install_analytify_dashboard', 20 );

/**
 * Add plugin action links to Analytify Dashboard Widget.
 *
 * @param array $links Action Links.
 * @return array
 */
function wp_analytify_dashboard_plugin_action_links( $links ) {

	$settings_link = '';

	if ( ! class_exists( 'WP_Analytify_Pro' ) ) {
		$settings_link .= sprintf( esc_html__( '%1$s Get Analytify Pro %2$s', 'wp-analytify' ),  '<a  href="https://analytify.io/pricing/?utm_source=analytify-widget-lite&utm_medium=plugin-action-link&utm_campaign=pro-upgrade&utm_content=Get+Analytify+Pro" target="_blank" style="color:#3db634;">', '</a>' );
		array_unshift( $links, $settings_link );
	}

	return $links;
}

/**
 * Check if Analytify free is installed.
 *
 * @since 1.0.0
 */
function pa_install_free_dashboard() {

	$action = 'install-plugin';
	$slug = 'wp-analytify';
	$link = wp_nonce_url( add_query_arg( array( 'action' => $action, 'plugin' => $slug ), admin_url( 'update.php' ) ), $action . '_' . $slug );

	$message = sprintf('%1$s <br /><a href="%2$s">%3$s</a>' , esc_html__( 'Analytify Core is required to run Analytify dashboard widget.', 'analytify-analytics-dashboard-widget' ), $link, esc_html__( 'Click here to Install Analytify(Core)', 'analytify-analytics-dashboard-widget' ) );

	analytify_widget_notice( $message, 'wp-analytify-danger' );
}

/**
 * Enqueue scripts and styles.
 *
 * @return void
 */
function pa_dashboard_layout_script() {

	$current_screen = get_current_screen();

	if ( 'dashboard' !== $current_screen->id ) { // Run only on main dashboard page.
		return;
	}

	wp_enqueue_script( 'analytify-dashboard-layout', plugins_url( '/assets/js/wp-analytify-dashboard-layout.js', __FILE__ ), false, ANALYTIFY_DASHBOARD_VERSION );
	// Get the path of the wp-analytify plugin directory
		$analytify_plugin_url = plugin_dir_url( 'wp-analytify/wp-analytify.php' );

		// Enqueue the ECharts scripts from wp-analytify
		wp_enqueue_script( 'echarts-js', $analytify_plugin_url . 'assets/js/echarts.min.js',false, ANALYTIFY_VERSION, true );
}
/**
 * Active Analytify Free.
 *
 * @since 1.0.0
 */
function pa_activate_free_dashboard() {

	$action = 'activate';
	$slug = 'wp-analytify/wp-analytify.php';
	$link = wp_nonce_url( add_query_arg( array( 'action' => $action, 'plugin' => $slug ), admin_url( 'plugins.php' ) ), $action . '-plugin_' . $slug );

	$message = sprintf( '%1$s <br /><a href="%2$s">%3$s</a>' , esc_html__( 'Analytify Core is required to run Analytify dashboard widget.', 'analytify-analytics-dashboard-widget' ), $link, esc_html__( 'Click here to activate Analytify Core plugin.', 'analytify-analytics-dashboard-widget' ) );

	analytify_widget_notice( $message, 'wp-analytify-danger' );
}


/**
 * Add dashboard widget with warning message.
 * This is shown when the plugin is not installed or inactive.
 *
 * @since 1.0.3
 */
function add_analytify_widget() {

	global $wp_meta_boxes;

	wp_add_dashboard_widget(
		'analytify-dashboard-addon-warning',
		__( 'Google Analytics Dashboard By Analytify', 'analytify-analytics-dashboard-widget' ),
		'wpa_general_dashboard_area',
		null,
		null
	);

	// Place the widget at the top.
	$normal_dashboard = $wp_meta_boxes['dashboard']['normal']['core'];
	$widget_instance = array( 'analytify-dashboard-addon-warning' => $normal_dashboard['analytify-dashboard-addon-warning'] );
	unset( $normal_dashboard['analytify-dashboard-addon-warning'] );
	$sorted_dashboard = array_merge( $widget_instance, $normal_dashboard );
	$wp_meta_boxes['dashboard']['normal']['core'] = $sorted_dashboard;
}

/**
 * Dashboard Widget.
 *
 * @since 1.0.3
 */
function wpa_general_dashboard_area() {

	if ( ! file_exists( WP_PLUGIN_DIR . '/wp-analytify/analytify-general.php' ) ) {

		// If the core plugin is not installed.

		$action = 'install-plugin';
		$slug   = 'wp-analytify';

		$link = wp_nonce_url(
			add_query_arg(
				array(
					'action' => $action,
					'plugin' => $slug,
				),
				admin_url( 'update.php' )
			),
			$action . '_' . $slug
		);

		$message  = '<p>' . __( 'Analytify core is required to use this Analytics widget.', 'analytify-analytics-dashboard-widget' ) . '</p>';
		$message .= '<a href="' . $link . '" class="analytify-active-card-button">' . __( 'Install Analytify Core', 'analytify-analytics-dashboard-widget' ) . '</a>';

		AnalytifyWidgetHelper::notice( $message );
		return;

	} elseif ( ! in_array( 'wp-analytify/wp-analytify.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ), true ) ) {

		// If the core plugin is installed but not active.

		$action = 'activate';
		$slug   = 'wp-analytify/wp-analytify.php';

		$link = wp_nonce_url(
			add_query_arg(
				array(
					'action' => $action,
					'plugin' => $slug,
				),
				admin_url( 'plugins.php' )
			),
			$action . '-plugin_' . $slug
		);

		$message  = '<p>' . __( 'Analytify core is required to use this Analytics widget.', 'analytify-analytics-dashboard-widget' ) . '</p>';
		$message .= '<a href="' . $link . '" class="analytify-active-card-button">' . __( 'Activate Analytify Core', 'analytify-analytics-dashboard-widget' ) . '</a>';

		AnalytifyWidgetHelper::notice( $message );
		return;
	}
}

/**
 * Add custom admin notice.
 *
 * @param string $message Custom Message.
 * @param string $class   Class can be: 'wp-analytify-success', 'wp-analytify-danger'.
 *
 * @since 1.0.3
 */
function analytify_widget_notice( $message, $class ) {

	echo '<div class="wp-analytify-notification ' . $class . '">
		<a class="" href="#" aria-label="Dismiss the welcome panel"></a>
		<div class="wp-analytify-notice-logo">
			<img src="' . plugins_url( 'assets/images/logo.svg', __FILE__ ) . '" alt="analytify">
		</div>
		<div class="wp-analytify-notice-discription">
			<p>' . $message . '</p>
		</div>
	</div>';
}

/**
 * Add css for admin notice.
 *
 * @param string $page WP Page type.
 *
 * @since 1.0.3
 *
 * @return void
 */
function analytify_widget_scripts( $page ) {

	if ( 'index.php' === $page ) {
		wp_enqueue_style( 'analytify-widget-admin', plugins_url( 'assets/css/admin.css', __FILE__ ), array(), ANALYTIFY_DASHBOARD_VERSION );
	}
}
add_action( 'admin_enqueue_scripts', 'analytify_widget_scripts' ); 

/**
 * Load text domain.
 *
 * @since 1.0.2
 */
function wp_analytify_dashboard_widget_load_text_domain() {

	$plugin_dir = basename( dirname( __FILE__ ) );
	load_plugin_textdomain( 'analytify-analytics-dashboard-widget', false, $plugin_dir . '/languages/' );
}
add_action( 'init', 'wp_analytify_dashboard_widget_load_text_domain' );

/**
 * Add inline css script added by user in settings.
 *
 * @return void
 */
function wp_analytify_dashboard_widget_inline_styles() {

	if ( ! function_exists( 'get_current_screen' ) ) {
		return;
	}

	$current_screen = get_current_screen();

	if ( isset( $current_screen->base ) && 'dashboard' === $current_screen->base ) {
		$custom_css = isset( $GLOBALS['WP_ANALYTIFY'] ) ? $GLOBALS['WP_ANALYTIFY']->settings->get_option( 'custom_css_code', 'wp-analytify-advanced' ) : null;

		if ( ! empty( $custom_css ) ) {
			echo '<style type="text/css">' . $custom_css . '</style>';
		}
	}
}
add_action( 'admin_head', 'wp_analytify_dashboard_widget_inline_styles' );
