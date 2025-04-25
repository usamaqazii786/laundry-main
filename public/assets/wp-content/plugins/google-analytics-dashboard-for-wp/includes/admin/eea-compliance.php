<?php
/**
 * Functionality of EEA Compliance feature.
 *
 * @package exactmetrics
 */

/**
 * This file will contain only one class.
 */
class ExactMetrics_EEA_Compliance {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'wp_ajax_exactmetrics_vue_check_eea_compliance', array(
			$this,
			'check_eea_compliance'
		) );

		add_action( 'wp_ajax_exactmetrics_vue_get_eea_compliance', array(
			$this,
			'get_eea_compliance'
		) );

		add_filter( 'site_status_tests', array( $this, 'add_site_health_tests' ), 10, 1 );
	}

	/**
	 * Ajax function of EEA checker.
	 */
	public function check_eea_compliance() {
		check_ajax_referer( 'mi-admin-nonce', 'nonce' );

		if ( ! current_user_can( 'exactmetrics_save_settings' ) ) {
			return;
		}

		// Send request to API.
		$response = $this->send_api_request();

		if ( is_wp_error( $response ) ) {
			wp_send_json( array(
				'success' => false,
				'error_message' => $response->get_error_message(),
			) );
		}

		wp_send_json( array(
			'success' => true,
			'data' => $this->process_compliant_info( $response ),
		) );
	}

	/**
	 * Send data to vue frontend.
	 */
	public function get_eea_compliance() {
		check_ajax_referer( 'mi-admin-nonce', 'nonce' );

		if ( ! current_user_can( 'exactmetrics_save_settings' ) ) {
			return;
		}

		$authed  = ExactMetrics()->auth->is_authed() || ExactMetrics()->auth->is_network_authed();

		if ( ! $authed ) {
			wp_send_json_error();
		}

		$data = $this->get_checker_data();

		wp_send_json( array(
			'success' => true,
			'data' => $this->process_compliant_info( $data ),
		) );
	}

	/**
	 * Check ad plugin installed and
	 */
	private function checkAdPlugin() {
		// If no addon is active.
		if ( ! class_exists( 'ExactMetrics_PPC_Tracking_Premium' ) && ! class_exists( 'ExactMetrics_Ads' ) ) {
			return false;
		}

		$conversion_id = exactmetrics_get_option( 'ads_google_conversion_id', '' );

		// AW-* data has been set.
		return ! empty( $conversion_id );
	}

	/**
	 * Check the user is compliant with GA T&C.
	 *
	 * @return bool
	 */
	private function find_compliant( $ga_checker ) {
		$enabled = false;

		// Go through checker criteria.
		foreach ( $ga_checker as $value ) {
			if ( $value ) {
				$enabled = true;
				break;
			}
		}

		// Consent is required.
		if ( $enabled ) {
			// Check for any cookie consent plugin active or not.
			return $this->is_cmp_plugin_active();
		}

		return true;
	}

	/**
	 * Check for any Consent management platforms (CMPs) plugins is active
	 *
	 * @return bool
	 */
	private function is_cmp_plugin_active() {
		// Complianz
		if ( defined( 'cmplz_plugin' ) || defined( 'cmplz_premium' ) ) {
			return true;
		}

		// CookieYes
		if ( defined( 'CLI_SETTINGS_FIELD' ) ) {
			return true;
		}

		// CookieBot
		if ( exactmetrics_is_cookiebot_active() ) {
			return true;
		}

		return false;
	}

	/**
	 * After getting data from API we need some more data from plugin.
	 */
	private function process_compliant_info( $data ) {
		// Format last_checked value.
		if ( 'Never' != $data['last_checked'] ) {
			$data['last_checked'] = wp_date( 'm-d-Y H:i', $data['last_checked'] );
		}

		// Check for ad addon.
		$data['ga_checker']['ad-addon'] = $this->checkAdPlugin();

		// Check user is compliant.
		$data['compliant'] = $this->find_compliant( $data['ga_checker'] );

		return $data;
	}

	/**
	 * Add site health tests for EEA Compliance
	 * If the authenticated website is found to be requiring EEA consent but does not have a cookie plugin installed.
	 */
	public function add_site_health_tests( $tests ) {
		$authed  = ExactMetrics()->auth->is_authed() || ExactMetrics()->auth->is_network_authed();

		if ( ! $authed ) {
			return $tests;
		}

		// Get data from options table.
		$data = $this->get_checker_data();

		// If data not available in cache get it from API.
		if ( 'Never' == $data['last_checked'] ) {
			$data = $this->send_api_request();

			if ( is_wp_error( $data ) ) {
				return $tests;
			}
		}

		$compliant_info = $this->process_compliant_info( $data );

		// User is not compliant, ask him to check.
		if ( isset( $compliant_info['compliant'] ) && ! $compliant_info['compliant'] ) {
			$tests['direct']['exactmetrics_eea_compliance_checker'] = array(
				'label' => __( 'ExactMetrics EEA Compliance Check', 'google-analytics-dashboard-for-wp' ),
				'test'  => array( $this, 'test_eea_compliance_checker' ),
			);
		}

		return $tests;
	}

	/**
	 * Callback for EEA Compliance Check site health test.
	 */
	public function test_eea_compliance_checker() {
		$link = admin_url('admin.php?page=exactmetrics_settings#/tools/eea-compliance');

		return array(
			'label'       => __( 'Check EEA Compliance with ExactMetrics', 'google-analytics-dashboard-for-wp' ),
			'status'      => 'recommended',
			'badge'       => array(
				'label' => __( 'ExactMetrics', 'google-analytics-dashboard-for-wp' ),
				'color' => 'blue',
			),
			'description' => __( 'New privacy regulations will soon require you to receive consent from website visitors located inside an EEA country in order to use Google Ads or interest, demographics or location data (Google Analytics Signals). Use the ExactMetrics compliance checker to see if your site requires consent.', 'google-analytics-dashboard-for-wp' ),
			'actions'     => sprintf(
				'<p><a href="%s" target="_blank" rel="noopener noreferrer">%s</a></p>',
				$link,
				__( 'Check Now', 'google-analytics-dashboard-for-wp' )
			),
			'test'        => 'exactmetrics_eea_compliance_checker',
		);
	}

	/**
	 * Get checker data
	 */
	private function get_checker_data() {
		$checker = get_option( 'exactmetrics_eea_compliance_checker', false );

		if ( $checker && isset( $checker['last_checked'] ) ) {
			$data = $checker;
		} else {
			// Default data.
			$data = array(
				'last_checked' => 'Never',
				'ga_checker' => array(),
			);
		}

		return $data;
	}

	/**
	 * Send checker api request.
	 *
	 * @return WP_Error|array
	 */
	private function send_api_request() {
		// Send request to API.
		$api = new ExactMetrics_API_Request( 'analytics/eea-compliance-checker/', [], 'GET' );
		$response = $api->request();

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		if ( isset( $response['data'] ) && ! empty( $response['data'] ) ) {
			$data = array( 'ga_checker' => $response['data'] );
			$data['last_checked'] = time();
			update_option( 'exactmetrics_eea_compliance_checker', $data );
		}

		return $data;
	}
}

new ExactMetrics_EEA_Compliance();
