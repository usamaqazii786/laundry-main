<?php

if ( ! defined( 'ABSPATH' ) ) {
	// Exit if accessed directly.
	exit;
}

/**
 * Handling all the AJAX calls in WP Analytify
 *
 * @since 1.2.4
 * @class WPANALYTIFY_AJAX
 */
add_action( 'wp_ajax_analytify_opt_out_option',  'analytify_opt_out_option' );
// This Method is used as ajax call action to update partial opt-out options.
function analytify_opt_out_option() {
	if( ! current_user_can( 'manage_options' ) || ! check_ajax_referer( 'analytify_optout_page_nonce', 'optout_nonce' ) ){
		wp_die( '<p>' . __( 'Sorry, you are not allowed to edit this item.' ) . '</p>', 403 );
	}
	// Get the current option and decode it as an associative array
	$sdk_data = json_decode(get_option('wpb_sdk_wp-analytify'), true);
	// If there is no current option, initialize an empty array
	if (!$sdk_data) {
		$sdk_data = array();
	}
	$setting_name = $_POST['setting_name'];  // e.g., communication, diagnostic_info, extensions
	$setting_value = $_POST['setting_value'];  // The new value to be updated
	// Update the specific setting in the array
	$sdk_data[$setting_name] = $setting_value;
	// Encode the array back into a JSON string and update the option
	update_option('wpb_sdk_wp-analytify', json_encode($sdk_data));
	die( 'analytify_opt_out_option' );
}

class WPANALYTIFY_AJAX {

	protected static $show_settings = array();

	public static function init() {	
		$_analytify_dashboard = get_option( 'wp-analytify-dashboard' );
		if ( $_analytify_dashboard && array_key_exists( 'show_analytics_panels_dashboard', $_analytify_dashboard ) ) {
			self::$show_settings = $_analytify_dashboard['show_analytics_panels_dashboard'];
		}

		$ajax_calls = array(
			'rated'	=> false,
			'load_general_stats' => false,
			// 'load_default_general_stats' => false,
			'load_top_pages' => false,
			'load_default_top_pages' => false,
			'load_country_stats' => false,
			'load_city_stats' => false,
			'load_keyword_stats' => false,
			'load_social_stats' => false,
			'load_page_exit_stats' => false,
			'fetch_log' => false,
			'load_default_geographic' => false,
			'load_default_system' => false,
			'load_default_keyword' => false,
			'load_default_social_media' => false,
			'dismiss_pointer'	=> true,
			'remove_comparison_gif' => false,
//			'deactivate' => false,
			'optin_yes' => false,
			'optout_yes' => false,
			'optin_skip' => false,
			'export_settings' => false,
			'import_settings' => false,
			);

			foreach ( $ajax_calls as $ajax_call => $no_priv ) {
				// code...
				add_action( 'wp_ajax_analytify_' . $ajax_call, array( __CLASS__, $ajax_call ) );

				if ( $no_priv ) {
					add_action( 'wp_ajax_nopriv_analytify_' . $ajax_call, array( __CLASS__, $ajax_call ) );
				}
			}

		}



	/**
	 * Triggered when clicking the rating footer.
	 *
	 * @since 1.2.4
	 */
	public static function rated() {
		if ( ! current_user_can( 'manage_options' ) || ! check_ajax_referer( 'analytify-rated', 'nonce' )  ) {
		    wp_send_json_error( __( 'You do not have permission to perform this action.', 'wp-analytify' ), 403 );
		}
		update_option( 'analytify_admin_footer_text_rated', 1 );
		die( 'rated' );
	}


	public static function load_general_stats() {

		$wp_analytify         = $GLOBALS['WP_ANALYTIFY'];
		$dashboard_profile_ID = $_GET['dashboard_profile_ID'];
		$start_date           = $_GET['start_date'];
		$end_date             = $_GET['end_date'];

		$compare_start_date = $_GET['compare_start_date'];
		$compare_end_date   = $_GET['compare_end_date'];
		$date_different =  $_GET['date_different'];




		if ( is_array( self::$show_settings ) and in_array( 'show-overall-dashboard', self::$show_settings ) ) {

			$stats = get_transient( md5( 'show-overall-dashboard' . $dashboard_profile_ID . $start_date . $end_date ) );


			// get prev stats
			$compare_stats =  get_transient( md5( 'show-overall-dashboard-compare' . $dashboard_profile_ID . $compare_start_date . $compare_end_date ) );


			if ( isset( $stats->totalsForAllResults ) ) {
				include ANALYTIFY_ROOT_PATH . '/views/old/admin/general-stats.php';
				pa_include_general( $wp_analytify , $stats , $compare_stats , $date_different );
			}
		}

		die();
	}

	/**
	 * Fetch general stats for the dashboard.
	 *
	 * @return void
	 */
	public static function load_default_general_stats() {

		check_ajax_referer( 'analytify-get-dashboard-stats', 'nonce' );

		$wp_analytify         = $GLOBALS['WP_ANALYTIFY'];
		$dashboard_profile_ID = $_GET['dashboard_profile_ID'];
		$start_date           = $_GET['start_date'];
		$end_date             = $_GET['end_date'];

		$compare_start_date = $_GET['compare_start_date'];
		$compare_end_date   = $_GET['compare_end_date'];
		$date_different     = $_GET['date_different'];


			// Main general stats.
			$stats = $wp_analytify->get_reports(
				'show-default-overall-dashboard',
				array(
					'sessions',
					'totalUsers',
					'screenPageViews',
					'averageSessionDuration',
					'bounceRate',
					'screenPageViewsPerSession',
					'newUsers',
				),
				array(
					'start' => $start_date,
					'end'   => $end_date,
				)
			);

			// New users.
			$new_users_stats = $wp_analytify->get_reports(
				'show-default-new-returning-dashboard',
				array(
					'newUsers',
				),
				array(
					'start' => $start_date,
					'end'   => $end_date,
				)
			);

			// Returning users.
			$returning_users_stats = $wp_analytify->get_reports(
				'show-default-new-returning-dashboard',
				array(
					'activeUsers',
				),
				array(
					'start' => $start_date,
					'end'   => $end_date,
				)
			);

			$new_returning_stats = array(
				'new_users' => $new_users_stats,
				'returning_users' => $returning_users_stats,
			);

			// Device category.
			$device_category_stats = $wp_analytify->get_reports(
				'show-default-overall-device-dashboard',
				array(
					'sessions'
				),
				array(
					'start' => $start_date,
					'end'   => $end_date,
				),
				array(
					'deviceCategory'
				),
				array(
					'type'  => 'dimension',
					'name'  => 'deviceCategory',
					'order' => 'desc',
				)
			);

			// Get prev stats.
			$compare_stats = $wp_analytify->get_reports(
				'show-default-overall-dashboard-compare',
				array(
					'sessions',
					'totalUsers',
					'screenPageViews',
					'averageSessionDuration',
					'bounceRate',
					'screenPageViewsPerSession',
					'newUsers'
				),
				array(
					'start' => $compare_start_date,
					'end'   => $compare_end_date,
				)
			);

			// Create view for general stats.
			include ANALYTIFY_ROOT_PATH . '/views/default/admin/general-stats.php';
			fetch_ga_general_stats( $wp_analytify, $stats, $device_category_stats, $compare_stats, $date_different, $new_returning_stats );


		wp_die();
	}

	public static function load_top_pages() {

		$wp_analytify         = $GLOBALS['WP_ANALYTIFY'];
		$dashboard_profile_ID = $_GET['dashboard_profile_ID'];
		$start_date           = $_GET['start_date'];
		$end_date             = $_GET['end_date'];

		if ( is_array( self::$show_settings ) and in_array( 'show-top-pages-dashboard', self::$show_settings ) ) {
			$top_page_stats = get_transient( md5( 'show-top-pages-dashboard' . $dashboard_profile_ID . $start_date . $end_date ) );


			if ( isset( $top_page_stats->totalsForAllResults ) ) {
				include ANALYTIFY_ROOT_PATH . '/views/old/admin/top-pages-stats.php';
				pa_include_top_pages_stats( $wp_analytify, $top_page_stats );
			}
		}

		die();
	}

	public static function load_default_top_pages() {

		check_ajax_referer( 'analytify-get-dashboard-stats', 'nonce' );

		$wp_analytify         = $GLOBALS['WP_ANALYTIFY'];
		$dashboard_profile_ID = $_GET['dashboard_profile_ID'];
		$start_date           = $_GET['start_date'];
		$end_date             = $_GET['end_date'];


			$stats = $wp_analytify->get_reports(
				'show-default-top-pages-dashboard',
				array(
					'screenPageViews',
					'userEngagementDuration',
					'bounceRate',
				),
				array(
					'start' => $start_date,
					'end'   => $end_date,
				),
				array(
					'pageTitle',
					'pagePath'
				),
				array(
					'type'  => 'metric',
					'name'  => 'screenPageViews',
					'order' => 'desc',
				),
				array(),
				40
			);

			include ANALYTIFY_ROOT_PATH . '/views/default/admin/top-pages-stats.php';
			fetch_ga_top_pages_stats( $wp_analytify, $stats );

		wp_die( );
	}



	public static function load_country_stats() {

		$wp_analytify         = $GLOBALS['WP_ANALYTIFY'];
		$dashboard_profile_ID = $_GET['dashboard_profile_ID'];
		$start_date           = $_GET['start_date'];
		$end_date             = $_GET['end_date'];

		if ( is_array( self::$show_settings ) and in_array( 'show-country-dashboard', self::$show_settings ) ) {

			$country_stats = get_transient( md5( 'show-country-dashboard' . $dashboard_profile_ID . $start_date . $end_date ) );

			if ( isset( $country_stats->totalsForAllResults ) ) {
				include ANALYTIFY_ROOT_PATH . '/views/old/admin/country-stats.php';
				pa_include_country( $wp_analytify,$country_stats );
			}
		}

		die();
	}


	public static function load_city_stats() {

		$wp_analytify         = $GLOBALS['WP_ANALYTIFY'];
		$dashboard_profile_ID = $_GET['dashboard_profile_ID'];
		$start_date           = $_GET['start_date'];
		$end_date             = $_GET['end_date'];

		if ( is_array( self::$show_settings ) and in_array( 'show-city-dashboard', self::$show_settings ) ) {

			$city_stats = get_transient( md5( 'show-city-dashboard' . $dashboard_profile_ID . $start_date . $end_date ) );


			if ( isset( $city_stats->totalsForAllResults ) ) {
				include ANALYTIFY_ROOT_PATH . '/views/old/admin/city-stats.php';
				pa_include_city( $wp_analytify,$city_stats );
			}
		}

		die();
	}

	public static function load_keyword_stats() {

		$wp_analytify         = $GLOBALS['WP_ANALYTIFY'];
		$dashboard_profile_ID = $_GET['dashboard_profile_ID'];
		$start_date           = $_GET['start_date'];
		$end_date             = $_GET['end_date'];

		if ( is_array( self::$show_settings ) and in_array( 'show-keywords-dashboard', self::$show_settings ) ) {

			$keyword_stats = get_transient( md5( 'show-keywords-dashboard' . $dashboard_profile_ID . $start_date . $end_date ) );

			if ( isset( $keyword_stats->totalsForAllResults ) ) {
				include ANALYTIFY_ROOT_PATH . '/views/old/admin/keywords-stats.php';
				pa_include_keywords( $wp_analytify,$keyword_stats );
			}
		}

		die();
	}


	public static function load_social_stats() {

		$wp_analytify         = $GLOBALS['WP_ANALYTIFY'];
		$dashboard_profile_ID = $_GET['dashboard_profile_ID'];
		$start_date           = $_GET['start_date'];
		$end_date             = $_GET['end_date'];

		if ( is_array( self::$show_settings ) and in_array( 'show-social-dashboard', self::$show_settings ) ) {

			$social_stats = get_transient( md5( 'show-social-dashboard' . $dashboard_profile_ID . $start_date . $end_date ) );

			if ( isset( $social_stats->totalsForAllResults ) ) {
				include ANALYTIFY_ROOT_PATH . '/views/old/admin/social-stats.php';
				pa_include_social( $wp_analytify, $social_stats );
			}
		}

		die();
	}

	public static function load_page_exit_stats() {

		$wp_analytify         = $GLOBALS['WP_ANALYTIFY'];
		$dashboard_profile_ID = $_GET['dashboard_profile_ID'];
		$start_date           = $_GET['start_date'];
		$end_date             = $_GET['end_date'];

		if ( is_array( self::$show_settings ) and in_array( 'show-page-stats-dashboard', self::$show_settings ) ) {

			$page_stats = get_transient( md5( 'show-page-stats-dashboard' . $dashboard_profile_ID . $start_date . $end_date ) );

			if ( isset( $page_stats->totalsForAllResults ) ) {
				include ANALYTIFY_ROOT_PATH . '/views/old/admin/pages-stats.php';
				pa_include_pages_stats( $wp_analytify, $page_stats );
			}
		}

		die();
	}

	public static function load_default_geographic() {

		check_ajax_referer( 'analytify-get-dashboard-stats', 'nonce' );

		$wp_analytify         = $GLOBALS['WP_ANALYTIFY'];
		$dashboard_profile_ID = $_GET['dashboard_profile_ID'];
		$start_date           = $_GET['start_date'];
		$end_date             = $_GET['end_date'];
		$report_url           = $_GET['report_url'];
		$report_date_range    = $_GET['report_date_range'];


			$countries_stats = $wp_analytify->get_reports(
				'show-geographic-countries-dashboard',
				array(
					'sessions',
				),
				array(
					'start' => $start_date,
					'end'   => $end_date,
				),
				array(
					'country'
				),
				array(
					'type'  => 'dimension',
					'name'  => 'country',
					'order' => 'desc',
				),
				array(
					'logic' => 'AND',
					array(
						'type'           => 'dimension',
						'name'           => 'country',
						'match_type'     => 4,
						'value'          => '(not set)',
						'not_expression' => true,
					),
				)
			);

			$cities_stats = $wp_analytify->get_reports(
				'show-geographic-countries-dashboard',
				array(
					'sessions',
				),
				array(
					'start' => $start_date,
					'end'   => $end_date,
				),
				array(
					'city',
					'country'
				),
				array(
					'type'  => 'metric',
					'name'  => 'sessions',
					'order' => 'desc',
				),
				array(
					// array(
					// 	'type'           => 'dimension',
					// 	'name'           => 'city',
					// 	'match_type'     => 4,
					// 	'value'          => '(not set)',
					// 	'not_expression' => true,
					// ),
					// array(
					// 	'type'           => 'dimension',
					// 	'name'           => 'country',
					// 	'match_type'     => 4,
					// 	'value'          => '(not set)',
					// 	'not_expression' => true,
					// ),
				)
			);

			include ANALYTIFY_ROOT_PATH . '/views/default/admin/geographic-stats.php';
			fetch_ga_geographic_stats( $wp_analytify, $countries_stats, $cities_stats, true, $report_url, $report_date_range );


		wp_die( );
	}

	public static function load_default_system() {

		check_ajax_referer( 'analytify-get-dashboard-stats', 'nonce' );

		$wp_analytify         = $GLOBALS['WP_ANALYTIFY'];
		$dashboard_profile_ID = $_GET['dashboard_profile_ID'];
		$start_date           = $_GET['start_date'];
		$end_date             = $_GET['end_date'];


			$browser_stats = $wp_analytify->get_reports(
				'show-default-browser-dashboard',
				array(
					'sessions',
				),
				array(
					'start' => $start_date,
					'end'   => $end_date,
				),
				array(
					'browser',
					'operatingSystem'
				),
				array(
					'type'  => 'metric',
					'name'  => 'sessions',
					'order' => 'desc',
				),
				array(
					'logic' => 'AND',
					array(
						'type'           => 'dimension',
						'name'           => 'operatingSystem',
						'match_type'     => 4,
						'value'          => '(not set)',
						'not_expression' => true,
					),
				),
				5
			);

			$os_stats = $wp_analytify->get_reports(
				'show-default-os-dashboard',
				array(
					'sessions',
				),
				array(
					'start' => $start_date,
					'end'   => $end_date,
				),
				array(
					'browser',
					'operatingSystemVersion'
				),
				array(
					'type'  => 'metric',
					'name'  => 'sessions',
					'order' => 'desc',
				),
				array(
					'logic' => 'AND',
					array(
						'type'           => 'dimension',
						'name'           => 'operatingSystemVersion',
						'match_type'     => 4,
						'value'          => '(not set)',
						'not_expression' => true,
					),
				),
				5
			);

			$mobile_stats = $wp_analytify->get_reports(
				'show-default-mobile-dashboard',
				array(
					'sessions',
				),
				array(
					'start' => $start_date,
					'end'   => $end_date,
				),
				array(
					'mobileDeviceBranding',
					'mobileDeviceModel'
				),
				array(
					'type'  => 'metric',
					'name'  => 'sessions',
					'order' => 'desc',
				),
				array(
					'logic' => 'AND',
					array(
						'type'           => 'dimension',
						'name'           => 'mobileDeviceModel',
						'match_type'     => 4,
						'value'          => '(not set)',
						'not_expression' => true,
					),
				),
				5
			);

			include ANALYTIFY_ROOT_PATH . '/views/default/admin/system-stats.php';
			fetch_ga_system_stats( $wp_analytify, $browser_stats, $os_stats, $mobile_stats );


		wp_die();
	}

	public static function load_default_keyword() {

		check_ajax_referer( 'analytify-get-dashboard-stats', 'nonce' );

		$wp_analytify         = $GLOBALS['WP_ANALYTIFY'];
		$dashboard_profile_ID = $_GET['dashboard_profile_ID'];
		$start_date           = $_GET['start_date'];
		$end_date             = $_GET['end_date'];


			$keyword_stats = $wp_analytify->get_search_console_stats('show-default-keyword-dashboard', array(
					'start' => $start_date,
					'end'   => $end_date,
				));

			include ANALYTIFY_ROOT_PATH . '/views/default/admin/keywords-stats.php';
			fetch_ga_keywords_stats( $wp_analytify, $keyword_stats );


		wp_die();
	}

	public static function load_default_social_media() {

		check_ajax_referer( 'analytify-get-dashboard-stats', 'nonce' );

		$wp_analytify         = $GLOBALS['WP_ANALYTIFY'];
		$dashboard_profile_ID = $_GET['dashboard_profile_ID'];
		$start_date           = $_GET['start_date'];
		$end_date             = $_GET['end_date'];

		if ( 'ga4' === WPANALYTIFY_Utils::get_ga_mode() ) {

			// ga_missing

			// $social_stats = $wp_analytify->get_reports(
			// 	'show-top-pages-dashboard',
			// 	array(
			// 		'sessions'
			// 	),
			// 	array(
			// 		'start' => $start_date,
			// 		'end'   => $end_date,
			// 	),
			// 	array(
			// 		'sourcePlatform'
			// 	),
			// 	array(
			// 		'type' => 'metric',
			// 		'name' => 'sessions',
			// 	),
			// 	array(
			// 	// 	array(
			// 	// 		'type' => 'dimension',
			// 	// 		'name' => 'sourcePlatform',
			// 	// 		'match_type' => '5',
			// 	// 		'value' => '^((?!(not set)).)*$',
			// 	// 	)
			// 	),
			// 	7
			// );

			// include ANALYTIFY_ROOT_PATH . '/views/default/admin/socialmedia-stats.php';
			// fetch_ga_socialmedia_stats( $wp_analytify, $social_stats );
		}

		wp_die( );
	}

	/**
	 * Fetches and outputs diagnostic log information via an AJAX request.
	 * 
	 * This function checks for a valid nonce and user permissions before 
	 * generating and returning the diagnostic log data. Only users with 
	 * the `manage_options` capability can access this functionality.
	 * 
	 * @return void
	 */

	static function fetch_log() {
		
		// Verify nonce for security
		check_ajax_referer('fetch-log', 'nonce');
		
		// Check if the current user has sufficient permissions
		if (!current_user_can('manage_options')) {
			wp_send_json_error('Unauthorized access', 403);
			wp_die();
		}else{
			ob_start();

			self::output_diagnostic_info();
	
			echo ob_get_clean();

			wp_die();
		}
	}
	


	/**
	 * Outputs diagnostic info for debugging.
	 *
	 * Outputs useful diagnostic info text at the Diagnostic Info & Error Log
	 * section under the Help tab so the information can be viewed or
	 * downloaded and shared for debugging.
	 *
	 * If you would like to add additional diagnostic information use the
	 * `wpanalytify_diagnostic_info` action hook (see {@link https://developer.wordpress.org/reference/functions/add_action/}).
	 *
	 * <code>
	 * add_action( 'wpanalytify_diagnostic_info', 'my_diagnostic_info' ) {
	 *     echo "Additional Diagnostic Info: \r\n";
	 *     echo "...\r\n";
	 * }
	 * </code>
	 *
	 * @return void
	 */
	static function output_diagnostic_info() {
		global $wpdb;
		$table_prefix = $wpdb->base_prefix;
		$authentication_date = get_option( 'analytify_authentication_date' );

		echo "-- System Information --\r\n \r\n";

		echo 'site_url(): ';
		echo esc_html( site_url() );
		echo "\r\n";

		echo 'home_url(): ';
		echo esc_html( home_url() );
		echo "\r\n";

		echo 'WordPress: ';
		echo bloginfo( 'version' );
		if ( is_multisite() ) {
			echo ' Multisite';
		}
		echo "\r\n";

		echo 'Web Server: ';
		echo esc_html( ! empty( $_SERVER['SERVER_SOFTWARE'] ) ? $_SERVER['SERVER_SOFTWARE'] : '' );
		echo "\r\n";

		echo 'PHP: ';
		if ( function_exists( 'phpversion' ) ) {
			echo esc_html( phpversion() );
		}
		echo "\r\n";

		echo 'MySQL: ';
		echo esc_html( empty( $wpdb->use_mysqli ) ? mysql_get_server_info() : mysqli_get_server_info( $wpdb->dbh ) );
		echo "\r\n";

		echo 'ext/mysqli: ';
		echo empty( $wpdb->use_mysqli ) ? 'no' : 'yes';
		echo "\r\n";

		echo 'WP Memory Limit: ';
		echo esc_html( WP_MEMORY_LIMIT );
		echo "\r\n";

		echo 'Blocked External HTTP Requests: ';
		if ( ! defined( 'WP_HTTP_BLOCK_EXTERNAL' ) || ! WP_HTTP_BLOCK_EXTERNAL ) {
			echo 'None';
		} else {
			$accessible_hosts = ( defined( 'WP_ACCESSIBLE_HOSTS' ) ) ? WP_ACCESSIBLE_HOSTS : '';

			if ( empty( $accessible_hosts ) ) {
				echo 'ALL';
			} else {
				echo 'Partially (Accessible Hosts: ' . esc_html( $accessible_hosts ) . ')';
			}
		}
		echo "\r\n";

		echo 'WP Locale: ';
		echo esc_html( get_locale() );
		echo "\r\n";

		echo 'DB Charset: ';
		echo esc_html( DB_CHARSET );
		echo "\r\n";

		if ( function_exists( 'ini_get' ) && $suhosin_limit = ini_get( 'suhosin.post.max_value_length' ) ) {
			echo 'Suhosin Post Max Value Length: ';
			echo esc_html( is_numeric( $suhosin_limit ) ? size_format( $suhosin_limit ) : $suhosin_limit );
			echo "\r\n";
		}

		if ( function_exists( 'ini_get' ) && $suhosin_limit = ini_get( 'suhosin.request.max_value_length' ) ) {
			echo 'Suhosin Request Max Value Length: ';
			echo esc_html( is_numeric( $suhosin_limit ) ? size_format( $suhosin_limit ) : $suhosin_limit );
			echo "\r\n";
		}

		echo 'Debug Mode: ';
		echo esc_html( ( defined( 'WP_DEBUG' ) && WP_DEBUG ) ? 'Yes' : 'No' );
		echo "\r\n";

		echo 'WP Max Upload Size: ';
		echo esc_html( size_format( wp_max_upload_size() ) );
		echo "\r\n";

		echo 'PHP Time Limit: ';
		if ( function_exists( 'ini_get' ) ) {
			echo esc_html( ini_get( 'max_execution_time' ) );
		}
		echo "\r\n";

		echo 'PHP Error Log: ';
		if ( function_exists( 'ini_get' ) ) {
			echo esc_html( ini_get( 'error_log' ) );
		}
		echo "\r\n";

		echo 'fsockopen: ';
		if ( function_exists( 'fsockopen' ) ) {
			echo 'Enabled';
		} else {
			echo 'Disabled';
		}
		echo "\r\n";

		echo 'OpenSSL: ';
		if ( defined( 'OPENSSL_VERSION_TEXT' ) ) {
			echo esc_html( OPENSSL_VERSION_TEXT );
		} else {
			echo 'Disabled';
		}
		echo "\r\n";

		echo 'cURL: ';
		if ( function_exists( 'curl_init' ) ) {
			echo 'Enabled';
		} else {
			echo 'Disabled';
		}
		if ( function_exists( 'curl_version' ) ) {
			$_curl = curl_version();
			echo ' (' . $_curl['version'] . ' ' . $_curl['ssl_version'] . ')';
		}
		echo "\r\n";

		$theme_info = wp_get_theme();
		echo 'Active Theme Name: ' . esc_html( $theme_info->Name ) . "\r\n";
		echo 'Active Theme Folder: ' . esc_html( basename( $theme_info->get_stylesheet_directory() ) ) . "\r\n";
		if ( $theme_info->get( 'Template' ) ) {
			echo 'Parent Theme Folder: ' . esc_html( $theme_info->get( 'Template' ) ) . "\r\n";
		}
		if ( ! file_exists( $theme_info->get_stylesheet_directory() ) ) {
			echo "WARNING: Active Theme Folder Not Found\r\n";
		}

		echo "\r\n";

		echo "-- Active Plugins --\r\n \r\n";

		$active_plugins = (array) get_option( 'active_plugins', array() );

		if ( is_multisite() ) {
			$network_active_plugins = wp_get_active_network_plugins();
			$active_plugins         = array_map( array( 'WPANALYTIFY_Utils', 'remove_wp_plugin_dir' ), $network_active_plugins );
		}

		foreach ( $active_plugins as $plugin ) {
			$suffix = '';
			self::print_plugin_details( WP_PLUGIN_DIR . '/' . $plugin, $suffix );
		}

		$mu_plugins = wp_get_mu_plugins();
		if ( $mu_plugins ) {
			echo "\r\n";

			echo "-- Must-use Plugins --\r\n \r\n";

			foreach ( $mu_plugins as $mu_plugin ) {
				self::print_plugin_details( $mu_plugin );
			}
		}

		echo "\r\n";

		if ( class_exists( 'WP_Analytify_Pro_Base' ) ) {

			$analytify_active_modules = [];

			$analytify_modules = get_option( 'wp_analytify_modules' );

			foreach ( $analytify_modules as $module ) {
				if ( 'active' === $module['status'] ) {
					$analytify_active_modules[] = $module['title'];
				}
			}

			echo "-- Active Modules --\r\n \r\n";

			if ( $analytify_active_modules ) {
				foreach ( $analytify_active_modules as $analytify_module ) {
					printf( "%s \r\n", $analytify_module );
				}
			} else {
				echo "- None - \r\n";
			}

			echo "\r\n";

		}

		if ( ! empty( $authentication_date ) ) {
			echo "-- Last Authenticated --\r\n \r\n";
			echo "$authentication_date \r\n";
			echo "\r\n";
		}

		echo "-- Analytify Profile Setting --\r\n \r\n";

		$analytify_profile = get_option( 'wp-analytify-profile' );

		WPANALYTIFY_Utils::print_settings_array( $analytify_profile );

		// print_r( $analytify_profile );

		echo "\r\n";


		echo "-- Analytify Front Setting --\r\n \r\n";

		echo "\r\n";

		echo "-- Analytify Admin Setting --\r\n \r\n";

		$analytify_admin = get_option( 'wp-analytify-admin' );

		WPANALYTIFY_Utils::print_settings_array( $analytify_admin );

		echo "\r\n";

		echo "-- Analytify Dashboard Setting --\r\n \r\n";

		$analytify_dashboard = get_option( 'wp-analytify-dashboard' );

		WPANALYTIFY_Utils::print_settings_array( $analytify_dashboard );

		echo "\r\n";

		do_action( 'analytify_settings_logs' );

		echo "\r\n";

		echo "-- Analytify Advance Setting --\r\n \r\n";

		$analytify_advance = get_option( 'wp-analytify-advanced' );
		// if keys not set, show default.
		if ( ! isset( $analytify_advance['user_advanced_keys'] ) || $analytify_advance['user_advanced_keys'] == 'off' ) {

			// set as array if its string.
			if ( ! is_array( $analytify_advance ) ) { $analytify_advance = array(); }

			$analytify_advance['client_id'] = ANALYTIFY_CLIENTID;
			$analytify_advance['client_secret'] = 'Hidden';
		}

		WPANALYTIFY_Utils::print_settings_array( $analytify_advance );
	}

	function output_log_file() {
			$this->load_error_log();
		if ( isset( $this->error_log ) ) {
			echo $this->error_log;
		}
	}

	static function print_plugin_details( $plugin_path, $suffix = '' ) {
		$plugin_data = get_plugin_data( $plugin_path );
		if ( empty( $plugin_data['Name'] ) ) {
			return;
		}

		printf( "%s%s (v%s) by %s\r\n", $plugin_data['Name'], $suffix, $plugin_data['Version'], $plugin_data['AuthorName'] );
	}

	/**
	 * Triggered when clicking the dismiss button.
	 * @since 1.0.8
	 */
	public static function dismiss_pointer() {

		$wpa_allow  = isset($_POST['wpa_allow']) ? $_POST['wpa_allow']: 0;

		if( $wpa_allow == 1 ) {

			update_option('wpa_allow_tracking', 1);
			send_status_analytify( get_option( 'admin_email' ), 'active');
		}

		update_option('show_tracking_pointer_1', 1);
		die();
	}

	/**
	 * Remove Gif Add
	 *
	 * @since 2.0.11
	 */
	public static function remove_comparison_gif() {
		update_option( 'analytify_remove_comparison_gif', 'yes' );
		wp_die();
	}

	public static function  deactivate() {

		$email         = get_option( 'admin_email' );
		$_reason       = sanitize_text_field( wp_unslash( $_POST['reason'] ) );
		$reason_detail = sanitize_text_field( wp_unslash( $_POST['reason_detail'] ) );
		$reason        = '';

		if ( $_reason == '1' ) {
			$reason = 'I only needed the plugin for a short period';
		} elseif ( $_reason == '2' ) {
			$reason = 'I found a better plugin';
		} elseif ( $_reason == '3' ) {
			$reason = 'The plugin broke my site';
		} elseif ( $_reason == '4' ) {
			$reason = 'The plugin suddenly stopped working';
		} elseif ( $_reason == '5' ) {
			$reason = 'I no longer need the plugin';
		} elseif ( $_reason == '6' ) {
			$reason = 'It\'s a temporary deactivation. I\'m just debugging an issue.';
		} elseif ( $_reason == '7' ) {
			$reason = 'Other';
		}

		$fields = array(
			'action'            => 'Deactivate',
			'reason'            => $reason,
			'reason_detail'     => $reason_detail,
		);

		wp_die();
	}


	// Add opt-in beacon
	public static function optin_yes() {


		if( ! current_user_can( 'manage_options' ) || ! check_ajax_referer( 'analytify_optin_page_nonce', 'optin_yes_nonce' ) ){
			wp_die( '<p>' . __( 'Sorry, you are not allowed to edit this item.' ) . '</p>', 403 );
		};

		//Update SDK Options also
        $sdk_data = array(
            'communication'   => '1',
            'diagnostic_info' => '1',
            'extensions'      => '1',
            'user_skip'      => '0',
        );
        $sdk_data_json = json_encode($sdk_data);
        update_option('wpb_sdk_wp-analytify', $sdk_data_json);


        // Track in user database
		update_site_option( '_analytify_optin', 'yes' );
		wp_die();
	}

	// delete opt-in beacon
	public static function optout_yes() {
		if( ! current_user_can( 'manage_options' ) || ! check_ajax_referer( 'analytify_optout_page_nonce', 'optout_yes_nonce' ) ){
			wp_die( '<p>' . __( 'Sorry, you are not allowed to edit this item.' ) . '</p>', 403 );
		}
		update_site_option('_analytify_optin','no');
		wp_die();
	}

	// opt-in skip.
	public static function optin_skip() {

		if( ! current_user_can( 'manage_options' ) || ! check_ajax_referer( 'analytify_optin_page_nonce', 'optin_skip_nonce' ) ){
			wp_die( '<p>' . __( 'Sorry, you are not allowed to edit this item.' ) . '</p>', 403 );
		};

        // Retrieve the existing option and decode it into an array
        $sdk_data = json_decode(get_option('wpb_sdk_wp-analytify'), true);
        $sdk_data['user_skip'] = '1';
        $sdk_data_json = json_encode($sdk_data);
        update_option('wpb_sdk_wp-analytify', $sdk_data_json);

		update_site_option( '_analytify_optin', 'no' );

		wp_die();
	}

	/**
	 * Create json file for export settings.
	 *
	 * @return string
	 */
	public static function export_settings() {

		// Check if the user has the required capability.
		if ( ! current_user_can( 'manage_options' ) ) {
		    wp_send_json_error( __( 'You do not have permission to perform this action.', 'wp-analytify' ), 403 );
		}

		check_ajax_referer( 'import-export', 'nonce' );

		$profile_settings = get_option( 'wp-analytify-profile' );
		// Remove authentication values.
		unset($profile_settings['profile_for_posts']);
		unset($profile_settings['profile_for_dashboard']);
		unset($profile_settings['hide_profiles_list']);

		$settings = array(
			'wp-analytify-profile' => $profile_settings,
			'wp-analytify-admin' => get_option( 'wp-analytify-admin' ),
			'wp-analytify-advanced' => get_option( 'wp-analytify-advanced' ),
			'wp-analytify-email' => get_option( 'wp-analytify-email' ),
		);

		if ( class_exists( 'WP_Analytify_Pro_Base' ) ) {
			$settings['wp-analytify-dashboard'] = get_option( 'wp-analytify-dashboard' );
			$settings['wp-analytify-events-tracking'] = get_option( 'wp-analytify-events-tracking' );
			$settings['wp-analytify-custom-dimensions'] = get_option( 'wp-analytify-custom-dimensions' );
		}

		if ( class_exists( 'Analytify_Forms' ) ) {
			$settings['wp-analytify-forms'] = get_option( 'wp-analytify-forms' );
		}
		// JSON encode the sanitized settings.
		$settings = json_encode( $settings );

		echo $settings;
	}


	/**
	 * Transfer json file data to settings.
	 *
	 * @return string
	 */
    public static function import_settings() {

		check_ajax_referer( 'import-export', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
		  wp_die( 'No cheating, huh!' );
		}

		$imp_tmp_name =  $_FILES['file']['tmp_name'];

		$file_content = file_get_contents( $imp_tmp_name );
		$settings_json = json_decode( $file_content, true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			echo 'failed';
		}

		foreach ( $settings_json as $setting => $value_array ) {
			$old_value_array = get_option( $setting );

			if ( ! empty( $value_array ) ) {
				if ( 'wp-analytify-profile' === $setting && ! empty( $old_value_array ) ) { // For profile tab settings update except authentication values.
					$old_value_array['install_ga_code'] = $value_array['install_ga_code'];
					$old_value_array['exclude_users_tracking'] = $value_array['exclude_users_tracking'];
					update_option( $setting, $old_value_array );
				} else { // Update whole settings tab array.
					update_option( $setting, $value_array );
				}
			}
		}

		echo 'success';
		wp_die();
	}

} // End of WPANALYTIFY_AJAX .

function wp_analytify_ajax_load() {

	return WPANALYTIFY_AJAX::init();
}

$GLOBALS['WPANALYTIFY_AJAX'] = wp_analytify_ajax_load();
