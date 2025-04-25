<?php
/**
 * Plugin Name: Analytify Dashboard
 * Plugin URI: https://analytify.io/?ref=27&utm_source=wp-org&utm_medium=plugin-header&utm_campaign=pro-upgrade&utm_content=plugin-uri
 * Description: Analytify brings a brand new and modern feeling of Google Analytics superbly integrated within the WordPress.
 * Version: 6.0.0
 * Author: Analytify
 * Author URI: https://analytify.io/?ref=27&utm_source=wp-org&utm_medium=plugin-header&utm_campaign=pro-upgrade&utm_content=author-uri
 * License: GPLv3
 * Text Domain: wp-analytify
 * Tested up to: 6.7
 * Domain Path: /languages
 *
 * @package WP_ANALYTIFY
 */


if ( ! function_exists( 'wa_wpb78834179' ) ) {
    // Create a helper function for easy SDK access.
    function wa_wpb78834179() {
        global $wa_wpb78834179;

        if ( ! isset( $wa_wpb78834179 ) ) {
            // Include Telemetry SDK.
            require_once dirname(__FILE__) . '/lib/wpb-sdk/start.php';

            $wa_wpb78834179 = wpb_dynamic_init([
                'id'                  => '7',
                'slug'                => 'wp-analytify',
                'type'                => 'plugin',
                'public_key'          => '1|4aOA8EuyIN4pi2miMvC23LLpnHbBZFNki9R9pVmwd673d3c8',
                'secret_key'          => 'sk_b36c525848fee035',
                'is_premium'          => false,
                'has_addons'          => false,
                'has_paid_plans'      => false,
                'menu'                => [
                    'slug'           => 'wp-analytify',
                    'account'        => false,
                    'support'        => false,
                ],
                'settings'           => [ 'wp_analytify_modules' => '' , 'wp-analytify-tracking' => '' , 'wp-analytify-email' => '' , 'wp-analytify-events-tracking' => '' , 'wp-analytify-front' => '', 'wp-analytify-custom-dimensions' => '' , 'wp-analytify-forms' => '' , 'analytify_widget_date_differ' => '' , 'wp-analytify-profile' => '' , 'wp-analytify-admin' => '' , 'wp-analytify-dashboard' => '' , 'wp-analytify-advanced' => '' , 'analytify_ua_code' => '' , 'analytify_date_differ' => '' , 'wp_analytify_review_dismiss_4_1_8' => '' , 'wpanalytify_settings' => '' , 'analytify_license_key' => '' , 'analytify_license_status' => '' , 'analytify_campaigns_license_status' => '' , 'analytify_campaigns_license_key' => '' , 'analytify_goals_license_status' => '' , 'analytify_goals_license_key' => '' , 'analytify_forms_license_status' => '' , 'analytify_forms_license_key' => '' , 'analytify_authors_license_status' => '' , 'analytify_authors_license_key' => '' , 'analytify_woo_license_status' => '' , 'analytify_woo_license_key' => '' , 'analytify_email_license_status' => '' , 'analytify_email_license_key' => '' , 'analytify-google-ads-tracking' => '' , '_analytify_optin' => '' , 'analytify_cache_timeout' => '' , 'analytify_csv_data' => '' , 'analytify_active_date' => '' , 'analytify_edd_license_status' => '' , 'analytify_edd_license_key' => '' , '_transient_timeout_analytify_api_addons' => '' , '_transient_analytify_api_addons' => '' , 'analytify_ga4_exceptions' => '' , 'analytify-ga-properties-summery' => '' , 'analytify-ga4-streams' => '' , 'analytify_tracking_property_info' => '' , 'analytify_reporting_property_info' => '' , 'analytify_gtag_move_to_notice' => '' , 'analytify_current_version' => '' , 'analytify_logs_setup' => '' , 'analytify_pro_default_settings' => '' , 'analytify_pro_active_date' => '' , 'analytify_pro_upgrade_routine' => '' , 'analytify_pro_current_version' => '' , 'WP_ANALYTIFY_PRO_PLUGIN_VERSION' => '' , 'wp-analytify-license' => '' , 'analytify_authentication_date' => '' , 'WP_ANALYTIFY_PLUGIN_VERSION_OLD' => '' , 'WP_ANALYTIFY_PRO_PLUGIN_VERSION_OLD' => '' , 'analytify_default_settings' => '' , 'analytify_free_upgrade_routine' => '' , 'WP_ANALYTIFY_PLUGIN_VERSION' => '' , 'wp_analytify_active_time' => '' , 'wp-analytify-authentication' => '' , 'wp-analytify-help' => '' , 'WP_ANALYTIFY_NEW_LOGIN' => '' , 'profiles_list_summary' => '' , 'pa_google_token' => '' , 'post_analytics_token' => '' ],
            ]);
        }

        return $wa_wpb78834179;
    }

    // Init Telemetry.
    wa_wpb78834179();
    // Signal that SDK was initiated.
    do_action( 'wa_wpb78834179_loaded' );
}


// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Analytify_General' ) ) {
	require_once 'analytify-general.php';
}

if ( ! class_exists( 'WP_Analytify' ) ) {
	/**
	 * Main WP_Analytify class
	 *
	 * @since       1.0.0
	 */
	class WP_Analytify extends Analytify_General {

		/**
		 * @var         WP_Analytify $instance The one true WP_Analytify
		 * @since       1.2.2
		 */
		private static $instance = null;

		public $token  = false;
		public $client = null;

		protected $disable_post_stats;

		/**
		 * Constructor.
		 */
		public function __construct() {
			parent::__construct();
			$this->setup_constants();
			$this->includes();
			$this->disable_post_stats = $this->settings->get_option( 'enable_back_end', 'wp-analytify-admin' );
			$this->hooks();
		}

		/**
		 * Get active instance.
		 *
		 * @access      public
		 * @since       1.2.2
		 * @return      object self::$instance The one true WP_Analytify
		 */
		public static function get_instance() {
			if ( ! self::$instance ) {
				self::$instance = new WP_Analytify();
			}

			return self::$instance;
		}

		/**
		 * Setup plugin constants
		 *
		 * @access      private
		 * @since       1.2.2
		 * @return      void
		 */
		private function setup_constants() {
			// Setting Global Values.
			$upload_dir = wp_upload_dir( null, false );
			$this->define( 'ANALYTIFY_LOG_DIR', $upload_dir['basedir'] . '/analytify-logs/' );
		}

		/**
		 * Define constant if not already set
		 *
		 * @since 1.2.4
		 * @param  string      $name  contanst name.
		 * @param  string|bool $value constant value.
		 */
		private function define( $name, $value ) {
			if ( ! defined( $name ) ) {
				define( $name, $value );
			}
		}

		/**
		 * What type of request is this?
		 *
		 * @since 1.2.4
		 * @param string $type ajax, frontend or admin.
		 * @return bool
		 */
		private function is_request( $type ) {
			switch ( $type ) {
				case 'admin':
					return is_admin();
				case 'ajax':
					return defined( 'DOING_AJAX' );
				case 'cron':
					return defined( 'DOING_CRON' );
				case 'frontend':
					return ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' );
			}
		}

		/**
		 * Include necessary files
		 *
		 * @access      private
		 * @since       1.2.2
		 * @return      void
		 */
		private function includes()
        {
            $files = [
                ANALYTIFY_LIB_PATH . 'logs/class-analytify-log-handler-interface.php',
                ANALYTIFY_LIB_PATH . 'logs/class-analytify-logger-interface.php',
                ANALYTIFY_LIB_PATH . 'logs/class-analytify-log-levels.php',
                ANALYTIFY_LIB_PATH . 'logs/class-analytify-logger.php',
                ANALYTIFY_LIB_PATH . 'logs/abstract-analytify-log-handler.php',
                ANALYTIFY_LIB_PATH . 'logs/class-analytify-log-handler-file.php',
                ANALYTIFY_PLUGIN_DIR . '/classes/analytify-logs.php',
                ANALYTIFY_PLUGIN_DIR . '/inc/wpa-core-functions.php',
                ANALYTIFY_PLUGIN_DIR . '/inc/class-wpa-adminbar.php',
                ANALYTIFY_PLUGIN_DIR . '/classes/abstracts/analytify-report-abstract.php',
                ANALYTIFY_PLUGIN_DIR . '/classes/abstracts/analytify-host-analytics-abstract.php',
                ANALYTIFY_PLUGIN_DIR . '/classes/analytify-host-analytics.php',
                ANALYTIFY_PLUGIN_DIR . '/classes/analytify-report-core.php',
                ANALYTIFY_PLUGIN_DIR . '/classes/analytify-rest-api.php',
                ANALYTIFY_PLUGIN_DIR . '/inc/class-wpa-ajax.php',
                ANALYTIFY_PLUGIN_DIR . '/classes/class.upgrade.php',
                ANALYTIFY_PLUGIN_DIR . '/classes/analytify-dashboard-widget.php',
                ANALYTIFY_PLUGIN_DIR . '/classes/analytify-gdpr-compliance.php',
                ANALYTIFY_PLUGIN_DIR . '/classes/user_optout.php',
                ANALYTIFY_PLUGIN_DIR . '/classes/analytify-email.php',
            ];

            foreach ($files as $file) {
                if (file_exists($file)) {
                    include_once $file;
                } else {
                    error_log("File missing: $file");
                    echo '<div class="notice notice-error"><p>A critical file is missing: ' . esc_html($file) . '. The Analytify plugin needs to be deactivated and re-installed.</p></div>';
                    return;
                }
            }

            if ($this->is_request('ajax')) {
                $this->ajax_includes();
            }
        }

		/**
		 * Run action and filter hooks
		 *
		 * @access      private
		 * @since       1.2.2
		 * @return      void
		 */
		private function hooks() {
			add_action( 'init', array( $this, 'load_textdomain' ) ); // Hook load_textdomain
			add_action( 'admin_init', array( $this, '_save_core_version' ) );
			add_action( 'admin_init', array( $this, 'wpa_check_authentication' ) );
			add_action( 'admin_init', array( $this, 'analytify_review_notice' ) );
			add_action( 'admin_init', array( $this, 'analytify_nag_ignore' ) );
			add_action( 'admin_init', array( $this, 'logout' ), 1 );
			add_filter( 'removable_query_args', array( $this, 'Analytify_remove_query' ) );
			add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );

			add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), array( $this, 'plugin_action_links' ), 999999 );

			add_action( 'plugin_row_meta', array( $this, 'plugin_row_meta' ), 10, 4 );

			add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'admin_styles' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'front_styles' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'front_scripts' ) );

			//Dismiss rank math notice 
			add_action('wp_ajax_analytify_dismiss_rank_math_notice', array($this, 'analytify_dismiss_rank_math_notice'));
			add_action( 'admin_notices', array( $this, 'pro_update_notice' ) );
			add_action( 'admin_notices', array( $this, 'analytify_admin_notice' ) );
			add_action( 'admin_notices', array( $this, 'addons_ga4_update_notice' ) ); // Ask users to update plugins to work with version 5.0.0!
			add_action( 'admin_notices', array( $this, 'analytify_cache_clear_notice' ) );

			add_action( 'wp_head', array( $this, 'analytify_add_analytics_code' ) );
			add_action( 'wp_head', array( $this, 'analytify_add_manual_analytics_code' ) );

			add_action( 'wp_ajax_get_ajax_single_admin_analytics', array( $this, 'get_ajax_single_admin_analytics' ) );

			add_action( 'wp_ajax_set_module_state', array( $this, 'set_module_state' ) );

			// Show analytics sections under the posts/pages in the metabox.
			add_action( 'add_meta_boxes', array( $this, 'show_admin_single_analytics_add_metabox' ) );

			add_action( 'admin_head', array( $this, 'add_dashboard_inline_styles' ) );
			add_action( 'admin_head', array( $this, 'add_dashboard_inline_scripts' ) );

			add_filter( 'admin_footer_text', 'wpa_admin_rate_footer_text', 1 );
			add_action( 'admin_footer', 'wpa_print_js', 25 );

			// Remove submenu pages.
			add_filter( 'submenu_file', array( $this, 'remove_submenu_pages' ) );

			// Show links at post rows.
			add_filter( 'post_row_actions', array( $this, 'post_rows_stats' ), 10, 2 );
			add_filter( 'page_row_actions', array( $this, 'post_rows_stats' ), 10, 2 );
			add_action( 'post_submitbox_minor_actions', array( $this, 'post_submitbox_stats_action' ), 10, 1 );
			add_action( 'admin_footer', array( $this, 'add_deactive_modal' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'analytify_track_miscellaneous' ) );
			add_action( 'admin_init', array( $this, 'redirect_optin' ) );

			add_action( 'admin_init', array( $this, 'dismiss_notices' ) );

			add_action( 'analytify_cleanup_logs', array( $this, 'analytify_cleanup_logs' ) );
			// Update profile summary option for Newly installed users.
			add_action( 'update_option_wp-analytify-profile', array( $this, 'update_profiles_list_summary' ), 10, 2 );
			// Update profile summary option for Newly installed users.
			add_action( 'update_option_wp-analytify-advanced', array( $this, 'update_selected_profiles' ), 10, 2 );

			// Update profile summary option for already installed version.
			add_action( 'admin_init', array( $this, 'update_profile_list_summary_on_update' ), 1 );
			add_filter( 'plugin_row_meta', array( $this, 'add_rating_icon' ), 50, 2 );

			add_action( 'init', array( $this, 'init_gdpr_compliance' ), 1 );

			add_action( 'init', function () {
				if ( WPANALYTIFY_Utils::get_option( 'locally_host_analytics', 'wp-analytify-advanced', false ) && ! wp_next_scheduled( 'analytify_analytics_lib_cron' ) ) {
					wp_schedule_event( time(), 'daily', 'analytify_analytics_lib_cron' );
				}
			});

			add_action( 'analytify_analytics_lib_cron', function(){
				new Analytify_Host_Analytics( 'gtag', true );
			});

			add_action( 'add_meta_boxes', array( $this, 'add_exclusion_meta_box' ) );

		}

		public function pro_update_notice() {
			if( defined( 'ANALYTIFY_PRO_VERSION' ) && version_compare( ANALYTIFY_PRO_VERSION, '6.0.0', '<' )){
			?>
			<div class="notice notice-error is-dismissible">
				<p>
					<strong><?php echo esc_html__('Note:', 'wp-analytify'); ?></strong>
					<?php echo esc_html__('Please update to the latest Analytify Pro version 6.0.0 to manage these modules (WooCommerce, EDD, Campaigns, and Authors) from', 'wp-analytify'); ?> <a href="<?php echo esc_url(admin_url('admin.php?page=analytify-addons')); ?>" aria-label="addons page"><?php echo esc_html__('here', 'wp-analytify'); ?></a>.
				</p>
			</div>
			<?php
			}
		}
		
		/**
		 * Redirect to Welcome page.
		 *
		 * @since 2.0.14
		 */
		public function redirect_optin() {
			if (isset( $_GET['page'] ) && ( $_GET['page'] === 'analytify-settings' || $_GET['page'] === 'analytify-dashboard' || $_GET['page'] === 'analytify-woocommerce' || $_GET['page'] === 'analytify-addons' ) ) {
				if(! get_site_option( '_analytify_optin' )){
					wp_redirect( admin_url( 'admin.php?page=analytify-optin' ) );
					exit;
				}
			}
		}

		/**
		 * Create plugin deactivation modal.
		 *
		 * @return void
		 */
		public function add_deactive_modal() {
			global $pagenow;
			if ( 'plugins.php' !== $pagenow ) {
				return;
			}
			include ANALYTIFY_PLUGIN_DIR . 'inc/analytify-optout-form.php';
		}

		/**
		 * Internationalization.
		 *
		 * @access      public
		 * @since       1.2.2
		 * @return      void
		 */
		public function load_textdomain() {
			$plugin_dir = basename( dirname( __FILE__ ) );
			load_plugin_textdomain( 'wp-analytify', false, $plugin_dir . '/languages/' );
		}

		/**
		 * Add inline css script added by user in settings.
		 *
		 * @return void
		 */
		public function add_dashboard_inline_styles() {
			if ( ! function_exists( 'get_current_screen' ) ) {
				return;
			}

			$current_screen  = get_current_screen();
			$allowed_screens = array(
				'toplevel_page_analytify-dashboard',
				'analytify_page_analytify-woocommerce',
				'analytify_page_analytify-campaigns',
				'analytify_page_analytify-goals',
				'analytify_page_analytify-authors',
				'analytify_page_analytify-forms',
				'analytify_page_analytify-events',
				'analytify_page_analytify-dimensions',
			);

			if ( isset( $current_screen->base ) && in_array( $current_screen->base, $allowed_screens ) ) {
				$custom_css = $this->settings->get_option( 'custom_css_code', 'wp-analytify-advanced' );

				if ( ! empty( $custom_css ) ) {
					echo '<style type="text/css">' . $custom_css . '</style>';
				}
			}
		}

		/**
		 * Add inline js script added by user in settings.
		 *
		 * @return void
		 */
		public function add_dashboard_inline_scripts() {
			if ( ! function_exists( 'get_current_screen' ) ) {
				return;
			}

			$current_screen  = get_current_screen();
			$allowed_screens = array( 
				'toplevel_page_analytify-dashboard',
				'analytify_page_analytify-woocommerce',
				'analytify_page_analytify-campaigns',
				'analytify_page_analytify-goals',
				'analytify_page_analytify-authors',
				'analytify_page_analytify-forms',
				'analytify_page_analytify-events',
				'analytify_page_analytify-dimensions',
			);

			if ( isset( $current_screen->base ) && in_array( $current_screen->base, $allowed_screens ) ) {
				$custom_js = $this->settings->get_option( 'custom_js_code', 'wp-analytify-advanced' );

				if ( ! empty( $custom_js ) ) {
					echo '<script type="text/javascript">' . $custom_js . '</script>';
				}
			}
		}
		/**
		 * Show metabox under each Post type to display Analytics of single post/page in wp-admin.
		 */
		public function show_admin_single_analytics_add_metabox() {

			//return if disable post stats is on
			if( 'on' !== $this->disable_post_stats ) {
				return;
			}

			global $post;

			if ( ! isset( $post ) ) {
				return false;
			}
			$display_draft_posts = apply_filters('analytify_filter_to_display_draft_posts', false);

			// Don't show statistics on posts which are not published.
			if ( 'publish'!== $post->post_status &&!$display_draft_posts) {
				return false;
			}

			$post_types = $this->settings->get_option( 'show_analytics_post_types_back_end', 'wp-analytify-admin' );

			// Don't load boxes/sections if no any post type is selected.
			if ( ! empty( $post_types ) ) {
				foreach ( $post_types as $post_type ) {
					add_meta_box(
						'pa-single-admin-analytics', // $id
						__( 'Analytify - Stats of this Post/Page', 'wp-analytify' ), // $title.
						array(
							$this,
							'show_admin_single_analytics',
						), // $callback
						$post_type, // $posts
						'normal',   // $context
						'high'      // $priority
					);
				}
			}
		}

		/**
		 * 
		 * Save Authentication code on return
		 * and nonce verification
		 * 
		 */

   		public function wpa_check_authentication() {

			$state = isset($_GET['state']) ? json_decode(urldecode($_GET['state']), true) : null;
		
			if (isset($_GET['code']) && 'analytify-settings' === $_GET['page']) {
				$get_nonce = isset($_GET['nonce']) ? $_GET['nonce'] : null;
				$nonce = isset($state['nonce']) ? $state['nonce'] : $get_nonce;
				
				//nonce verification after authentication from Google Analytics.
				if ( wp_verify_nonce( $nonce, 'analytify_analytics_login' ) ) {

     				$key_google_token = sanitize_text_field( wp_unslash( $_GET['code'] ) );
     				update_option( 'WP_ANALYTIFY_NEW_LOGIN', 'yes' );
     				self::pt_save_data( $key_google_token );
     				wp_redirect( admin_url( 'admin.php?page=analytify-settings' ) . '#wp-analytify-profile' );
     				exit;

    			} else {
					$plugin_page_url = admin_url( 'plugins.php' );
					wp_die(
						sprintf( 
							esc_html__( 'Sorry, you are not allowed as nonce verification failed. %1$sClick here to return to the Dashboard%2$s.', 'wp-analytify' ),
							'<a href="' . esc_url($plugin_page_url) . '">',
							'</a>'
						)
					);					
				}
			}
		}

		/**
		 * Save version number of the plugin and show a custom message for users
		 *
		 * @since 1.3
		 */

		public function _save_core_version() {
			if ( ANALYTIFY_VERSION != get_option( 'WP_ANALYTIFY_PLUGIN_VERSION' ) ) {
				update_option( 'WP_ANALYTIFY_PLUGIN_VERSION_OLD', get_option( 'WP_ANALYTIFY_PLUGIN_VERSION' ), '2.0.7' );  // saving old plugin version
				update_option( 'WP_ANALYTIFY_PLUGIN_VERSION', ANALYTIFY_VERSION );
			}
		}

		/**
		 * Show Analytics of single post/page in wp-admin under EDIT screen.
		 */
		public function show_admin_single_analytics() {
			global $post;

			$back_exclude_posts = false;
			$_exclude_profile   = get_option( 'wp-analytify-admin' );

			if ( isset( $_exclude_profile['exclude_pages_back_end'] ) ) {
				$back_exclude_posts = explode( ',', $_exclude_profile['exclude_pages_back_end'] );
			}

			if ( is_array( $back_exclude_posts ) ) {
				if ( in_array( $post->ID, $back_exclude_posts ) ) {
					esc_html_e( 'This post is excluded and will NOT show Analytics.', 'wp-analytify' );

					return;
				}
			}

			$url_post = '';
			$url_post = parse_url( get_permalink( $post->ID ) );

			if ( get_the_time( 'Y', $post->ID ) < 2005 ) {
				$start_date = '2005-01-01';
			} else {
				$start_date = get_the_time( 'Y-m-d', $post->ID );
			}

			$end_date        = date( 'Y-m-d' );
			$is_access_level = $this->settings->get_option( 'show_analytics_roles_back_end', 'wp-analytify-admin' );

			if ( $this->pa_check_roles( $is_access_level ) ) {  ?>

				<div class="analytify_setting analytify_wraper">
					<div class="analytify_select_date analytify_select_date_single_page">
						
						<?php WPANALYTIFY_Utils::date_form( $start_date, $end_date, array( 'input_submit_id' => 'view_analytics' ) ); ?>
						<?php do_action( 'after_single_view_stats_buttons' ); ?>
					</div>
				</div>

				<div class="show-hide">
					<?php $this->get_single_admin_analytics( $start_date, $end_date, $post->ID, 0 ); ?>
				</div>

				<?php
			} else {
				esc_html_e( 'You are not allowed to see stats', 'wp-analytify' );
			}
		}

		/**
		 * Add Google Analytics JS code
		 */
		public function analytify_add_analytics_code() {
			// Check if tracking disallowed on this post.
			if ( WPANALYTIFY_Utils::skip_page_tracking() ) {
				return;
			}

			// Check for GDPR compliance.
			if ( Analytify_GDPR_Compliance::is_gdpr_compliance_blocking() ) {
				return;
			}

			if ( 'on' === $this->settings->get_option( 'install_ga_code', 'wp-analytify-profile', 'off' ) ) {
				global $current_user;

				$roles = $current_user->roles;

				if ( isset( $roles[0] ) and in_array( $roles[0], $this->settings->get_option( 'exclude_users_tracking', 'wp-analytify-profile', array() ) ) ) {
					echo '<!-- This user is disabled from tracking by Analytify !-->';
				} else {
					if ( ! $this->settings->get_option( 'profile_for_posts', 'wp-analytify-profile' ) ) {
						return;
					}

					// Fetch Universel Analytics UA code for selected website.
					$UA_CODE = WP_ANALYTIFY_FUNCTIONS::get_UA_code();

					// Check the tracking method.
					if ( 'gtag' === ANALYTIFY_TRACKING_MODE ) {
						$ga_code = $this->output_gtag_code( $UA_CODE );
					} else {
						$ga_code = $this->output_ga_code( $UA_CODE );
					}

					echo apply_filters( 'analytify_ga_script', $ga_code );
				}
			}
		}

		/**
		 * Add Google Manual Analytics JS code
		 */
		public function analytify_add_manual_analytics_code() {
			// Return if already authenticated.
			// Should use tracking code from profiles option instead.
			if ( get_option( 'pa_google_token' ) ) {
				return;
			}

			$manual_ua_code = $this->settings->get_option( 'manual_ua_code', 'wp-analytify-authentication', false );

			if ( ! $manual_ua_code ) {
				return;
			}

			global $current_user;
			$roles = $current_user->roles;

			if ( in_array( 'administrator', $roles ) ) {
				echo '<!-- This user is disabled from tracking by Analytify !-->';
			} else {
				// Always use gtag mode for manual code unless filterd explicitly.
				if ( apply_filters( 'analytify_manaul_ga_script', false ) ) {
					echo apply_filters( 'analytify_ga_script', $this->output_ga_code( $manual_ua_code ) );
				} else {
					echo apply_filters( 'analytify_gtag_script', $this->output_gtag_code( $manual_ua_code ) );
				}
			}
		}

		/**
		 * Generate gtag code.
		 *
		 * @param  [string] $UA_CODE Google Analytics UA code.
		 * @since 3.0
		 * @return $gtag_code
		 */
		private function output_gtag_code( $UA_CODE ) {
			ob_start();

	        $local_analytics_file = ( new Analytify_Host_Analytics( 'gtag', false ) )->local_analytics_file_url();

			if ( false !== apply_filters( 'analytify_tracking_code_comments', true ) ) {
				echo sprintf( esc_html__( '%2$s This code is added by Analytify (%1$s) %4$s %3$s', 'wp-analytify' ), ANALYTIFY_VERSION, '<!--', '!-->', 'https://analytify.io/' );
			}

			$anonymize_ip           = ( 'on' === $this->settings->get_option( 'anonymize_ip', 'wp-analytify-advanced' ) ) ? 'true' : 'false';
			$force_ssl              = ( 'on' === $this->settings->get_option( 'force_ssl', 'wp-analytify-advanced' ) ) ? 'true' : 'false';
			$allow_display_features = ( 'on' === $this->settings->get_option( 'demographic_interest_tracking', 'wp-analytify-advanced' ) ) ? 'true' : 'false';

			// check if 'linker_cross_domain_tracking' is enabled
			$linker_cross_domain_tracking = ( 'on' === $this->settings->get_option( 'linker_cross_domain_tracking', 'wp-analytify-advanced' ) ) ? true : false;

			if ( $linker_cross_domain_tracking ) {
				// get 'linked_domain' field
				$all_linked_domains = $this->settings->get_option( 'linked_domain', 'wp-analytify-advanced' );
				$all_linked_domains = trim( $all_linked_domains );

				if ( ! empty( $all_linked_domains ) ) { // if the field is not empty
					// removing single and double quotes
					$all_linked_domains = str_replace( "'", '', $all_linked_domains );
					$all_linked_domains = str_replace( '"', '', $all_linked_domains );

					// remove all the spaces
					$all_linked_domains = preg_replace( '/\s+/', '', $all_linked_domains );

					$list_linked_domains      = explode( ',', $all_linked_domains );
					$number_of_linked_domains = count( $list_linked_domains );

					if ( $number_of_linked_domains > 0 ) {
						// there are multiple domains
						$linked_domains = array_filter( (array) $list_linked_domains, 'strlen' );
					} else {
						// if there is only only domain
						$linked_domains = (array) $all_linked_domains;
					}
				} else { // if the field is empty
					$linker_cross_domain_tracking = false;
				}
			}

			$configuration = array(
				'anonymize_ip'           => $anonymize_ip,
				'forceSSL'               => $force_ssl,
				'allow_display_features' => $allow_display_features,
			);

			if ( $linker_cross_domain_tracking ) {
				$configuration['linker'] = array(
					'domains' => $linked_domains,
				);
			}

			$debug_mode = apply_filters( 'analytify_debug_mode', true );

			if ( $debug_mode ) {
				$configuration['debug_mode'] = true;
			}

			if ( 'on' === $this->settings->get_option( 'track_user_id', 'wp-analytify-advanced' ) && is_user_logged_in() ) {
				$configuration['user_id'] = esc_html( get_current_user_id() );
			}

			$configuration = apply_filters( 'analytify_gtag_configuration', $configuration );
			$configuration = json_encode( $configuration );

			?>

			<script async src="<?php echo ( $local_analytics_file ?? 'https://www.googletagmanager.com/gtag/js?id=' ) . '?' . esc_html( $UA_CODE ); ?>"></script>
			<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());

			const configuration = JSON.parse( '<?php echo $configuration; ?>' );
			const gaID = '<?php echo esc_html( $UA_CODE ); ?>';

			<?php do_action( 'analytify_tracking_code_before_pageview' ); ?>

			gtag('config', gaID, configuration);

			<?php
			if ( $this->settings->get_option( 'custom_js_code', 'wp-analytify-advanced' ) ) {
				$custom_js = $this->settings->get_option( 'custom_js_code', 'wp-analytify-advanced' );
				var_dump($custom_js);
				if ( ! empty( $custom_js ) ) {
					echo '<script type="text/javascript">' . $custom_js . '</script>';
				}
			}

			do_action( 'ga_ecommerce_js' );
			do_action( 'analytify_tracking_code_after_pageview' );
			?>

			</script>

			<?php
			if ( false !== apply_filters( 'analytify_tracking_code_comments', true ) ) {
				echo sprintf( esc_html__( '%2$s This code is added by Analytify (%1$s) %3$s', 'wp-analytify' ), ANALYTIFY_VERSION, '<!--', '!-->' );
			}

			$gtag_code = ob_get_contents();
			ob_end_clean();
			return $gtag_code;
		}

		/**
		 * Generate gtag code.
		 *
		 * @param  [string] $UA_CODE Google Analytics UA code.
		 * @since 3.0
		 * @return $ga_code
		 */
		public function output_ga_code( $UA_CODE ) {
			ob_start();

			$src = apply_filters( 'analytify_output_ga_js_src', '//www.google-analytics.com/analytics.js' );

			if ( false !== apply_filters( 'analytify_tracking_code_comments', true ) ) {
				echo sprintf( esc_html__( '%2$s This code is added by Analytify (%1$s) %4$s %3$s', 'wp-analytify' ), ANALYTIFY_VERSION, '<!--', '!-->', 'https://analytify.io/' );
			}
			?>

			<script>
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
					(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
					m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})

				(window,document,'script','<?php echo $src; ?>','ga');
				
				<?php
				if ( 'on' === $this->settings->get_option( 'linker_cross_domain_tracking', 'wp-analytify-advanced' ) ) {
					echo "	ga('create', '{$UA_CODE}', 'auto', {'allowLinker': true});";
					echo "ga('require', 'linker');";
				} else {
					echo "	ga('create', '{$UA_CODE}', 'auto');";
				}

				if ( 'on' === $this->settings->get_option( 'anonymize_ip', 'wp-analytify-advanced' ) ) {
					echo "ga('set', 'anonymizeIp', true);";
				}

				if ( 'on' === $this->settings->get_option( 'force_ssl', 'wp-analytify-advanced' ) ) {
					echo "ga('set', 'forceSSL', true);";
				}

				if ( 'on' === $this->settings->get_option( 'track_user_id', 'wp-analytify-advanced' ) && is_user_logged_in() ) {
					echo "ga('set', 'userId', " . esc_html( get_current_user_id() ) . ');';
				}

				if ( 'on' === $this->settings->get_option( 'demographic_interest_tracking', 'wp-analytify-advanced' ) ) {
					echo "ga('require', 'displayfeatures');";
				}

				if ( $this->settings->get_option( 'custom_js_code', 'wp-analytify-advanced' ) ) {
					
					$custom_js = $this->settings->get_option( 'custom_js_code', 'wp-analytify-advanced' );

					if ( ! empty( $custom_js ) ) {
						echo '<script type="text/javascript">' . $custom_js . '</script>';
					}
				}

				// Add enhanced eccomerce extension
				do_action( 'ga_ecommerce_js' );
				do_action( 'analytify_tracking_code_before_pageview' );
				echo "ga('send', 'pageview');";
				?>

			</script>

			<?php
			if ( false !== apply_filters( 'analytify_tracking_code_comments', true ) ) {
				echo sprintf( esc_html__( '%2$s This code is added by Analytify (%1$s) %3$s', 'wp-analytify' ), ANALYTIFY_VERSION, '<!--', '!-->' );
			}

			$ga_code = ob_get_contents();
			ob_end_clean();
			return $ga_code;
		}

		/**
		 * Adds action link to the plugin on the plugin page.
		 *
		 * @param array $links Default links.
		 *
		 * @return array
		 */
        public function plugin_action_links($links)
        {

            $settings_link = '';


			 // Retrieve and decode the JSON option
			 $sdk_data = json_decode(get_option('wpb_sdk_wp-analytify'), true);
			 // Set default values for options
			 $communication = isset($sdk_data['communication']) ? $sdk_data['communication'] : false;
			 $diagnostic_info = isset($sdk_data['diagnostic_info']) ? $sdk_data['diagnostic_info'] : false;
			 $extensions = isset($sdk_data['extensions']) ? $sdk_data['extensions'] : false;
			 // Determine the opt-in state and whether all options are false
			 $is_optin = 'yes' == get_option('_analytify_optin');
			 $all_options_false = $communication === false && $diagnostic_info === false && $extensions === false;
			 // Build the settings link based on the option states
			 if ($communication || $diagnostic_info || $extensions) {
				 $settings_link .= sprintf(esc_html__('%1$s Opt Out %2$s | ', 'wp-analytify'), '<a class="opt-out" href="' . admin_url('admin.php?page=analytify-settings') . '">', '</a>');
			 } else {
				 if ($is_optin) {
					 if ($all_options_false) {
						 // If opted in but all options are false, update the SDK data
						 $sdk_data = json_encode([
							 'communication' => '1',
							 'diagnostic_info' => '1',
							 'extensions' => '1',
							 'user_skip' => '0',
						 ]);
						 update_option('wpb_sdk_wp-analytify', $sdk_data);
						 $settings_link .= sprintf(esc_html__('%1$s Opt Out %2$s | ', 'wp-analytify'), '<a class="opt-out" href="' . admin_url('admin.php?page=analytify-settings') . '">', '</a>');
					 } else {
						 // If opted in and not all options are false, update the opt-in state
						 update_option('_analytify_optin', 'no');
						 $settings_link .= sprintf(esc_html__('%1$s Opt In %2$s | ', 'wp-analytify'), '<a href="' . admin_url('admin.php?page=analytify-optin') . '">', '</a>');
					 }
				 } else {
					 // Display opt-in link
					 $settings_link .= sprintf(esc_html__('%1$s Opt In %2$s | ', 'wp-analytify'), '<a href="' . admin_url('admin.php?page=analytify-optin') . '">', '</a>');
				 }
			 } 

			if (!class_exists('WP_Analytify_Pro')) {
                $settings_link .= sprintf(esc_html__('%1$s Get Analytify Pro %2$s |', 'wp-analytify'), '<a  href="https://analytify.io/pricing/?utm_source=analytify-lite&utm_medium=plugin-action-link&utm_campaign=pro-upgrade&utm_content=Get+Analytify+Pro" target="_blank" style="color:#3db634;">', '</a>');
            }
			
            // Build the initial settings and customize links
            $settings_link .= sprintf(esc_html__('%1$s Settings %2$s ', 'wp-analytify'), '<a href="' . admin_url('admin.php?page=analytify-settings') . '">', '</a>');
            //$settings_link .= sprintf(esc_html__('%1$s Support %2$s | ', 'wp-analytify'), '<a target="blank" href="https://wordpress.org/support/plugin/wp-analytify">', '</a>');

           // $settings_link .= sprintf(esc_html__('%1$s Dashboard %2$s ', 'wp-analytify'), '<a href="' . admin_url('admin.php?page=analytify-dashboard') . '">', '</a>');

            // $settings_link .= sprintf( esc_html__( '%1$s Help %2$s  ', 'wp-analytify'), '<a href="' . admin_url( 'index.php?page=wp-analytify-getting-started' ) . '">', '</a>'  );
            array_unshift($links, $settings_link);

            return $links;
        }

		/**
		 * Plugin row meta links
		 *
		 * @since 1.1
		 * @version 5.0.5
		 * @param array  $input already defined meta links.
		 * @param string $file plugin file path and name being processed.
		 * @param array $plugin_data relevent data about the currect plugin.
		 * @param string $status weather plugin is active or disabled.
		 * @return array $input
		 */
		public function plugin_row_meta( $input, $file, $plugin_data, $status ) {

			// Array of all the analytify plugins.
			$analytify_plugins = array(
				'wp-analytify/wp-analytify.php',
				'analytify-analytics-dashboard-widget/wp-analytify-dashboard.php',
				'wp-analytify-pro/wp-analytify-pro.php',
				'wp-analytify-woocommerce/wp-analytify-woocommerce.php',
				'wp-analytify-goals/wp-analytify-goals.php',
				'wp-analytify-forms/wp-analytify-forms.php',
				'wp-analytify-email/wp-analytify-email.php',
				'wp-analytify-edd/wp-analytify-edd.php',
				'wp-analytify-authors/wp-analytify-authors.php',
			);

			// Return if it's not our plugin.
			if ( ! in_array( $file, $analytify_plugins ) ) {
				return $input;
			}

			// Modify the url of Author.
			if ( isset( $plugin_data['Author'] ) ) {

				$input[1] = sprintf(
					'By <a href="%s" target="_blank" rel="noopener noreferrer">%s</a>',
					esc_url( $plugin_data['AuthorURI'] ),
					esc_html( $plugin_data['Author'] )
				);

			}

			// Add plugin link for addons.
			if ( $file !== 'wp-analytify/wp-analytify.php' && $file !== 'analytify-analytics-dashboard-widget/wp-analytify-dashboard.php' && in_array( $file, $analytify_plugins) ) {

				$input[2] = sprintf(
					'<a href="%s" target="_blank" rel="noopener noreferrer">Visit Plugin Site</a>',
					esc_url( $plugin_data['PluginURI'] )
				);
				return $input;
				
			}

			$links = array(
				//sprintf( esc_html__( '%1$s Get FREE Help %2$s', 'wp-analytify' ), '<a target="_blank" href="https://wordpress.org/support/plugin/wp-analytify">', '</a>' ),
				sprintf( esc_html__( '%1$s Explore Premium Features %2$s', 'wp-analytify' ), '<a target="_blank" href="https://analytify.io/add-ons/?ref=27&utm_source=analytify-pro&utm_medium=plugin-action-link&utm_campaign=pro-upgrade&utm_content=Explore+Premium+Features">', '</a>' ),
				//'<a href="https://wordpress.org/support/view/plugin-reviews/wp-analytify/" target="_blank"><span class="dashicons dashicons-thumbs-up"></span> ' . __( 'Vote!', 'wp-analytify' ) . '</a>',
			);

			$input = array_merge( $input, $links );

			return $input;
		}


		/**
		 * Display warning if profiles are not selected.
		 */
		public function pa_check_warnings() {
			add_action( 'admin_footer', array( &$this, 'profile_warning' ) );
		}


		/**
		 * Get current screen details
		 */
		public function pa_page_file_path() {
			$screen = get_current_screen();

			if ( strpos( $screen->base, 'analytify-settings' ) !== false ) {
				$version = defined( 'ANALYTIFY_PRO_VERSION' ) ? ANALYTIFY_PRO_VERSION : ANALYTIFY_VERSION;

				echo '<div class="wrap"><h2 style="display: none;"></h2></div>

				<div class="wpanalytify"><div class="wpb_plugin_wraper">

				<div class="wpb_plugin_header_wraper">
				<div class="graph"></div>

				<div class="wpb_plugin_header">

				<div class="wpb_plugin_header_title"></div>

				<div class="wpb_plugin_header_info">
					<a href="https://analytify.io/changelog/" target="_blank" class="btn">View Changelog</a>
				</div>
				<div class="wpb_plugin_header_logo">
					<img src="' . plugins_url( 'assets/img/logo.svg', __FILE__ ) . '" alt="Analytify">
				</div>
				</div></div><div class="analytify-settings-body-container"><div class="wpb_plugin_body_wraper"><div class="wpb_plugin_body">';
				$this->settings->rendered_settings();
				$this->settings->show_tabs();
				echo '<div class="wpb_plugin_tabs_content">';
				$this->settings->show_forms();
				echo '</div>';

				echo '</div></div></div></div>';

				// include_once( ANALYTIFY_ROOT_PATH . '/inc/options-settings.php' );
			} elseif ( strpos( $screen->base, 'analytify-logs' ) !== false ) {
				include_once ANALYTIFY_ROOT_PATH . '/inc/page-logs.php';
			} elseif ( strpos( $screen->base, 'analytify-addons' ) !== false ) {
				include_once ANALYTIFY_ROOT_PATH . '/inc/page-addons.php';
			} elseif ( strpos( $screen->base, 'analytify-go-pro' ) !== false ) {
				include_once ANALYTIFY_ROOT_PATH . '/inc/analytify-go-pro.php';
			} else {
				if ( isset( $_GET['show'] ) ) {
					do_action( 'show_detail_dashboard_content' );
				} else {
					// Dequeue event calendar js.
					wp_dequeue_script( 'tribe-common' );
					wp_dequeue_script( 'mcw-crypto-common' );
					include_once ANALYTIFY_ROOT_PATH . '/inc/analytics-dashboard.php';
				}
			}
		}


		/**
		 * Styling: loading admin stylesheets for the plugin.
		 *
		 * @param  $page loaded page name.
		 */
		public function admin_styles( $page ) {
			wp_enqueue_style( 'dashicons' );
			wp_enqueue_style( 'admin-bar-style', plugins_url( 'assets/css/admin_bar_styles.css', __FILE__ ), false, ANALYTIFY_VERSION );

			// for Settings only
			if ( $page == 'analytify_page_analytify-settings' || $page == 'analytify_page_analytify-campaigns' ) {
				wp_enqueue_style( 'jquery_tooltip', '//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css', false, ANALYTIFY_VERSION );
			}

			// for Single Page/Post Stats.
			if ( $page == 'analytify_page_analytify-settings' || $page == 'post.php' || $page == 'post-new.php' ) {
				wp_enqueue_style( 'chosen', plugins_url( 'assets/css/chosen.min.css', __FILE__ ) );
			}

			if ( strpos( $page, 'analytify' ) !== false || $page == 'post.php' || $page == 'post-new.php' || $page == 'index.php' ) {
				wp_enqueue_style( 'wp-analytify-style', plugins_url( 'assets/css/wp-analytify-style.css', __FILE__ ), false, ANALYTIFY_VERSION );
				wp_enqueue_style( 'wp-analytify-default-style', plugins_url( 'assets/css/styles.css', __FILE__ ), false, ANALYTIFY_VERSION );

				$conditional_style = '';

				// Filter dashboard header animation.
				if ( apply_filters( 'analytify_dashboard_head_animate', true ) ) {
					$conditional_style .= '
					.wpanalytify .graph {
						-webkit-animation: graph_animation 130s linear infinite;
						-moz-animation: graph_animation 130s linear infinite;
						-o-animation: graph_animation 130s linear infinite;
						animation: graph_animation 130s linear infinite;
					}
					.wpanalytify .graph:after {
						-webkit-animation: graph_animation 250s linear infinite;
						-moz-animation: graph_animation 250s linear infinite;
						-o-animation: graph_animation 250s linear infinite;
						animation: graph_animation 250s linear infinite;
					}';
				}

				// Add conditional style.
				wp_add_inline_style( 'wp-analytify-default-style', $conditional_style );
			}

			wp_enqueue_style( 'wp-analytify-utils-style', plugins_url( 'assets/css/utils.css', __FILE__ ), false, ANALYTIFY_VERSION );
			// For WP Pointer
			if ( get_option( 'show_tracking_pointer_1' ) != 1 ) {
				wp_enqueue_style( 'wp-pointer' );
			}
		}


		/**
		 * Loading admin scripts JS for the plugin.
		 */
		public function admin_scripts( $page ) {
		
			wp_enqueue_script( 'wp-analytify-script-js', plugins_url( 'assets/js/wp-analytify.js', __FILE__ ), array( 'jquery' ), ANALYTIFY_VERSION );

			wp_localize_script('wp-analytify-script-js', 'wp_analytify_script', array(
					'url'              => esc_url_raw( rest_url( 'wp-analytify/v1/get_report/' ) ),
					'nonce'            => wp_create_nonce( 'wp_rest' ),
					'delimiter'        => WPANALYTIFY_Utils::get_delimiter(),
					'no_stats_message' => __( 'No activity during this period.', 'wp-analytify' ),
					'error_message'    => __( 'Something went wrong. Please try again later single.', 'wp-analytify' ),
				));

			global $post_type;

			// for main page
			if ( $page == 'index.php' || $page == 'toplevel_page_analytify-dashboard' || $page == 'analytify_page_analytify-woocommerce' || $page == 'analytify_page_edd-dashboard' || $page == 'analytify_page_analytify-campaigns' || $page == 'analytify_page_analytify-goals' || $page == 'analytify_page_analytify-forms' || $page == 'analytify_page_analytify-dimensions' || $page == 'analytify_page_analytify-authors' || $page == 'analytify_page_analytify-events' || $page == 'analytify_page_analytify-forms' || $page == 'analytify_page_analytify-promo' || in_array( $post_type, $this->settings->get_option( 'show_analytics_post_types_back_end', 'wp-analytify-admin', array() ) ) ) {
				// using WP's internal moment-js, after 4.2.1
				// wp_enqueue_script( 'moment', plugins_url( 'assets/js/moment.min.js', __FILE__ ), array( 'jquery' ), '2.29.3' );

				/**
				 * Filter to force moment js to use the same timezone as the one set within WordPress.
				 * Default is false.
				 *
				 * Filter was remove after 4.2.1
				 *
				 * Example use: add_filter( 'analytify_set_moment_timezone_to_match_wp', '__return_true' );
				 */
				/*
				$apply_timezone_match = apply_filters( 'analytify_set_moment_timezone_to_match_wp', false );
				$timezone = $apply_timezone_match ? WPANALYTIFY_Utils::timezone() : false;

				if ( $timezone ) {
					wp_enqueue_script( 'moment-timezone-with-data', plugins_url( 'assets/js/moment-timezone-with-data.min.js', __FILE__ ), array( 'jquery', 'moment' ), '0.5.34' );
				}

				wp_localize_script( 'moment', 'moment_analytify', array( 'timezone' => $timezone ) );
				*/

				wp_enqueue_script( 'pikaday-js', plugins_url( 'assets/js/pikaday.js', __FILE__ ), array( 'moment' ), ANALYTIFY_VERSION );

				wp_enqueue_script( 'analytify-dashboard-js', plugins_url( 'assets/js/wp-analytify-dashboard.js', __FILE__ ), array( 'pikaday-js' ), ANALYTIFY_VERSION );

				wp_localize_script(
					'analytify-dashboard-js',
					'analytify_dashboard',
					array(
						'i18n' => array(
							'previousMonth' => __( 'Previous Month', 'wp-analytify' ),
							'nextMonth'     => __( 'Next Month', 'wp-analytify' ),
							'months'        => array(
								__( 'January', 'wp-analytify' ),
								__( 'February', 'wp-analytify' ),
								__( 'March', 'wp-analytify' ),
								__( 'April', 'wp-analytify' ),
								__( 'May', 'wp-analytify' ),
								__( 'June', 'wp-analytify' ),
								__( 'July', 'wp-analytify' ),
								__( 'August', 'wp-analytify' ),
								__( 'September', 'wp-analytify' ),
								__( 'October', 'wp-analytify' ),
								__( 'November', 'wp-analytify' ),
								__( 'December', 'wp-analytify' ),
							),
							'weekdays'      => array(
								__( 'Sunday', 'wp-analytify' ),
								__( 'Monday', 'wp-analytify' ),
								__( 'Tuesday', 'wp-analytify' ),
								__( 'Wednesday', 'wp-analytify' ),
								__( 'Thursday', 'wp-analytify' ),
								__( 'Friday', 'wp-analytify' ),
								__( 'Saturday', 'wp-analytify' ),
							),
							'weekdaysShort' => array(
								__( 'Sun', 'wp-analytify' ),
								__( 'Mon', 'wp-analytify' ),
								__( 'Tue', 'wp-analytify' ),
								__( 'Wed', 'wp-analytify' ),
								__( 'Thu', 'wp-analytify' ),
								__( 'Fri', 'wp-analytify' ),
								__( 'Sat', 'wp-analytify' ),
							),
						),
					)
				);
			}

			// for dashboard only
			$analytify_chart_pages = array( 'toplevel_page_analytify-dashboard', 'analytify_page_analytify-woocommerce', 'analytify_page_edd-dashboard', 'analytify_page_analytify-campaigns' );
			if ( in_array( $page, $analytify_chart_pages, true ) ) {
				 // Enqueue the main JavaScript file
				wp_enqueue_script( 'echarts-js', plugins_url( 'assets/js/echarts.min.js', __FILE__ ), false, ANALYTIFY_VERSION, true );
				wp_enqueue_script( 'echarts-world-js', 'https://cdn.jsdelivr.net/npm/echarts-maps@1.1.0/world.min.js', false, ANALYTIFY_VERSION, true );
			}

			// Main dashboard file that handles AJAX calls for core, also generates the template.
			if ( 'toplevel_page_analytify-dashboard' === $page ) {
				/**
				 * Tells the script to load the data via an ajax request on date change.
				 * Only load data via ajax if the Pro version is 5.0.0 or higher.
				 */
				$load_via_ajax = true;
				if ( defined( 'ANALYTIFY_PRO_VERSION' ) && 0 > version_compare( ANALYTIFY_PRO_VERSION, '5.0.0' ) ) {
					$load_via_ajax = false;
				}

				wp_enqueue_style( 'analytify-dashboard-core', plugins_url( 'assets/css/common-dashboard.css', __FILE__ ), array(), ANALYTIFY_VERSION );
				// code added by jawad for fixing.
				$rest_url  = esc_url_raw( get_rest_url() );
				$api_url   = $rest_url . 'wp-analytify/v1/get_report/';

				if ( class_exists( 'WP_Analytify_Pro_Base' ) && version_compare( ANALYTIFY_PRO_VERSION, '5.0.0' ) >= 0 && isset( $_GET['page'] ) && ! isset( $_GET['show'] ) && 'analytify-dashboard' == $_GET['page'] ) {
					wp_enqueue_script( 'analytify-stats-core', plugins_url( 'assets/js/stats-core.js', __FILE__ ), array( 'jquery', 'echarts-js', 'analytify-comp-chart' ), ANALYTIFY_VERSION, true );				
				} else {
					wp_enqueue_script( 'analytify-stats-core', plugins_url( 'assets/js/stats-core.js', __FILE__ ), array( 'jquery', 'echarts-js' ), ANALYTIFY_VERSION, true );
				}
                // Localize the GeoJSON file URL to use in JavaScript
                wp_localize_script('analytify-stats-core', 'geoJsonData', array(
	                'geoJsonUrl' => plugins_url( 'assets/js/geo.json', __FILE__ )
                ));
				wp_enqueue_script( 'analytify-stats-core', plugins_url( 'assets/js/stats-core.js', __FILE__ ), array( 'jquery', 'echarts-js' ), ANALYTIFY_VERSION, true );

				wp_localize_script('analytify-stats-core', 'analytify_stats_core', array(
						'url'              => $api_url,
						'delimiter'        => WPANALYTIFY_Utils::get_delimiter(),
						'ga_mode'          => WPANALYTIFY_Utils::get_ga_mode(),
						'ga4_report_url'   => WP_ANALYTIFY_FUNCTIONS::get_ga_report_url( WPANALYTIFY_Utils::get_reporting_property() ),
						'nonce'            => wp_create_nonce( 'wp_rest' ),
						'load_via_ajax'    => $load_via_ajax,
						'dist_js_url'      => plugins_url( 'assets/js/', __FILE__ ),
						'no_stats_message' => __( 'No activity during this period.', 'wp-analytify' ),
						'error_message'    => __( 'Something went wrong. Please try again.', 'wp-analytify' ),
				));
			}

			// for Settings only
			if ( 'analytify_page_analytify-settings' === $page ) { 
				wp_enqueue_script( 'analytify-settings-js', plugins_url( 'assets/js/wp-analytify-settings.js', __FILE__ ), array( 'jquery-ui-tooltip', 'jquery' ), ANALYTIFY_VERSION );
				wp_localize_script(
					'analytify-settings-js',
					'analytify_settings',
					array(
						'is_hide_profile' => $this->settings->get_option( 'hide_profiles_list', 'wp-analytify-profile', 'off' ),
						'is_authenticate' => (bool) get_option( 'pa_google_token' ),
						'ga_mode'         => $this->is_reporting_in_ga4,
					)
				);
			}

			// Addons page script.
			if ( 'analytify_page_analytify-addons' === $page ) {
				wp_enqueue_script( 'analytify-addons-js', plugins_url( 'assets/js/wp-analytify-addons.js', __FILE__ ), array( 'jquery' ), ANALYTIFY_VERSION );
				wp_localize_script(
					'analytify-addons-js',
					'analytify_addons',
					array(
						'ajaxurl' => admin_url( 'admin-ajax.php' ),
						'nonce'   => wp_create_nonce( 'addons' ),
					)
				);
			}

			// for Single Page/Post Stats.
			if ( $page == 'analytify_page_analytify-settings' || $page == 'post.php' || $page == 'post-new.php' ) {
				wp_enqueue_script( 'chosen-js', plugins_url( 'assets/js/chosen.jquery.min.js', __FILE__ ), false, ANALYTIFY_VERSION );
			}

			if ( get_option( 'show_tracking_pointer_1' ) != 1 ) {
				wp_enqueue_script( 'wp-pointer' );
			}

			wp_localize_script(
				'wp-analytify-script-js',
				'wpanalytify_strings',
				array(
					'enter_license_key'        => __( 'Please enter your license key.', 'wp-analytify' ),
					'register_license_problem' => __( 'A problem occurred when trying to register the license, please try again.', 'wp-analytify' ),
					'license_check_problem'    => __( 'A problem occurred when trying to check the license, please try again.', 'wp-analytify' ),
					'license_registered'       => __( 'Your license has been activated. You will now receive automatic updates and access to email support.', 'wp-analytify' ),
				)
			);

			$nonces = apply_filters(
				'wpanalytify_nonces',
				array(
					'check_license'      	 => wp_create_nonce( 'check-license' ),
					'activate_license'   	 => wp_create_nonce( 'activate-license' ),
					'clear_log'          	 => wp_create_nonce( 'clear-log' ),
					'fetch_log'          	 => wp_create_nonce( 'fetch-log' ),
					'import_export'      	 => wp_create_nonce( 'import-export' ),
					'analytify_rated'      	 => wp_create_nonce( 'analytify-rated' ),
					'reactivate_license' 	 => wp_create_nonce( 'reactivate-license' ),
					'single_post_stats'      => wp_create_nonce( 'analytify-get-single-stats' ),
					'send_single_post_email' => wp_create_nonce( 'analytify-single-post-email' )
				)
			);

			$data = apply_filters(
				'wpanalytify_data',
				array(
					'this_url'     => esc_html( addslashes( home_url() ) ),
					'is_multisite' => esc_html( is_multisite() ? 'true' : 'false' ),
					'nonces'       => $nonces,
				)
			);

			wp_localize_script( 'wp-analytify-script-js', 'wpanalytify_data', $data );
			// print JS at footer
			// wpa_print_js();
		}

		/**
		 * Remove submenu pages.
		 */
		public function remove_submenu_pages( $submenu ) {
			// Remove promo submenu page
			remove_submenu_page( 'analytify-dashboard', 'analytify-promo' );

			return $submenu;
		}

		/**
		 * Add scripts for front end.
		 */
		public function front_scripts() {
			global $post;
			if ( ! is_object( $post ) ) {
				return;
			}
			$enabled_post_types = $GLOBALS['WP_ANALYTIFY']->settings->get_option( 'show_analytics_post_types_front_end', 'wp-analytify-front', array() );
			// Check tracking allowed for current post type.
			if ( ! empty( $enabled_post_types ) && ! in_array( $post->post_type, $enabled_post_types ) ) {
				return;
			}
			// Check of all requirements are filled for tracking.
			$is_tracking_available = WPANALYTIFY_Utils::is_tracking_available();
			// Scroll depth tracking script.
			if ( $is_tracking_available && 'on' == $this->settings->get_option( 'depth_percentage', 'wp-analytify-advanced' ) ) {
				// Remove protocol form permalink.
				$permalink     = get_the_permalink( $post->ID );
				$permalink     = str_replace( array( 'http://', 'https://' ), '', $permalink );
				$localize_data = array(
					'permalink'     => $permalink,
					'tracking_mode' => ANALYTIFY_TRACKING_MODE,
					'ga4_tracking'  => (bool) method_exists( 'WPANALYTIFY_Utils', 'get_ga_mode' ) && 'ga4' === WPANALYTIFY_Utils::get_ga_mode(),
				);
				wp_enqueue_script( 'scrolldepth-js', plugins_url( 'assets/js/scrolldepth.js', __FILE__ ), array( 'jquery' ), ANALYTIFY_VERSION, true );
				wp_localize_script( 'scrolldepth-js', 'analytifyScroll', $localize_data );
			}

			if ( $is_tracking_available && 'on' == $this->settings->get_option( 'video_tracking', 'wp-analytify-advanced' ) ) {
				
				$permalink     = get_the_permalink( $post->ID );
				$permalink     = str_replace( array( 'http://', 'https://' ), '', $permalink );
				$localize_data = array(
					'permalink'     => $permalink,
					'tracking_mode' => defined('ANALYTIFY_TRACKING_MODE') ? ANALYTIFY_TRACKING_MODE : '',
					'ga4_tracking'  => (bool) method_exists( 'WPANALYTIFY_Utils', 'get_ga_mode' ) && 'ga4' === WPANALYTIFY_Utils::get_ga_mode(),
				);
				// Enqueue video tracking script
				wp_enqueue_script( 'video-tracking-js', plugins_url( 'assets/js/video_tracking.js', __FILE__ ), array( 'jquery' ), ANALYTIFY_VERSION, true );
				wp_localize_script( 'video-tracking-js', 'analytifyVideo', $localize_data );
			}
		}

		/**
		 * Add style for front admin bar
		 *
		 * @since 2.0.4.
		 */
		public function front_styles() {
			if ( is_admin_bar_showing() ) {
				wp_enqueue_style( 'admin-bar-style', plugins_url( 'assets/css/admin_bar_styles.css', __FILE__ ), false, ANALYTIFY_VERSION );
			}
		}

		/**
		 * Create Analytics menu at the left side of dashboard
		 */
		public function add_admin_menu() {
			$allowed_roles   = $this->settings->get_option( 'show_analytics_roles_dashboard', 'wp-analytify-dashboard', array() );
			$allowed_roles[] = 'administrator';

			// if dont have Analytify Dashboard access, Return.
			if ( ! $this->pa_check_roles( $allowed_roles ) ) {
				return;
			}

			add_submenu_page( 'admin.php', __( 'Activate', 'wp-analytify' ), __( 'Activate', 'wp-analytify' ), 'manage_options', 'analytify-optin', array( $this, 'render_optin' ) );

			add_menu_page(
				ANALYTIFY_NICK,
				'Analytify',
				'read',
				'analytify-dashboard',
				array(
					$this,
					'pa_page_file_path',
				),
				'data:image/svg+xml;base64,' . base64_encode(
					'<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			width="18px" height="18px" viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" xml:space="preserve">
			<style type="text/css">
				.st0{fill-rule:evenodd;clip-rule:evenodd;fill:#23282D;}
				.st1{fill-rule:evenodd;clip-rule:evenodd;fill:#9EA3A8;}
			</style>
			<g>
				<path class="st0" d="M17.2,16c-0.4,0-0.8-0.3-0.8-0.8v-0.8V14c-1.6,2.4-4.3,4-7.5,4c-5,0-9-4-9-9s4-9,9-9c3.1,0,5.8,1.6,7.5,4V3.8
					v0l0,0c0-0.4,0.4-0.7,0.8-0.7S18,3.4,18,3.8l0,0v0V5v9.5v0.8C18,15.6,17.7,16,17.2,16z M9,1.5C4.9,1.5,1.5,4.9,1.5,9
					s3.4,7.5,7.5,7.5s7.5-3.4,7.5-7.5S13.1,1.5,9,1.5z"/>
				<g>
					<g>
						<path class="st1" d="M5.9,8.4c-0.5,0-0.9,0.4-0.9,0.9v2.9c0,0.5,0.4,0.9,0.9,0.9s0.9-0.4,0.9-0.9V9.3C6.7,8.8,6.3,8.4,5.9,8.4z
								M9,7C8.5,7,8.1,7.4,8.1,7.9v4.3C8.1,12.7,8.5,13,9,13s0.9-0.4,0.9-0.9V7.9C9.9,7.4,9.5,7,9,7z M12.1,4.9c-0.5,0-0.9,0.4-0.9,0.9
							v6.4c0,0.5,0.4,0.9,0.9,0.9s0.9-0.4,0.9-0.9V5.8C12.9,5.3,12.6,4.9,12.1,4.9z"/>
					</g>
				</g>
			</g>
			</svg>'
				),
				2
			);

			add_submenu_page(
				'analytify-dashboard',
				ANALYTIFY_NICK . esc_html__( ' Dashboards', 'wp-analytify' ),
				esc_html__( 'Dashboards', 'wp-analytify' ),
				'read',
				'analytify-dashboard',
				array(
					$this,
					'pa_page_file_path',
				),
				10
			);

			// // Fallback menus for addons.
			// $wp_analytify_modules = get_option( 'wp_analytify_modules' );

			// if ( $wp_analytify_modules ) {
			// foreach ( $wp_analytify_modules as $module ) {
			// if ( 'active' !== $module['status'] ) {
			// add_submenu_page( 'analytify-dashboard', ANALYTIFY_NICK . esc_html__( 'Settings', 'wp-analytify' ), esc_html__( 'Settings', 'wp-analytify' ), 'manage_options', 'analytify-settings', array(
			// $this,
			// 'pa_page_file_path',
			// ));
			// }
			// }
			// }

			do_action( 'analytify_add_submenu' );
			// do_action( 'analyitfy_email_setting_submenu' );

			add_submenu_page(
				'analytify-dashboard',
				ANALYTIFY_NICK . esc_html__( ' Settings', 'wp-analytify' ),
				esc_html__( 'Settings', 'wp-analytify' ),
				'manage_options',
				'analytify-settings',
				array(
					$this,
					'pa_page_file_path',
				),
				50
			);

			add_submenu_page(
				'analytify-dashboard',
				ANALYTIFY_NICK . esc_html__( ' Help', 'wp-analytify' ),
				esc_html__( 'Help', 'wp-analytify' ),
				'read',
				'analytify-settings#wp-analytify-help',
				array(
					$this,
					'pa_page_file_path',
				),
				55
			);

			// Add license submenu
			if ( class_exists( 'WP_Analytify_Pro_Base' ) ) {
				add_submenu_page(
					'analytify-dashboard',
					ANALYTIFY_NICK . esc_html__( ' License', 'wp-analytify' ),
					esc_html__( 'License', 'wp-analytify' ),
					'read',
					'analytify-settings#wp-analytify-license',
					array(
						$this,
						'pa_page_file_path',
					),
					60
				);
			}

			add_submenu_page(
				'analytify-dashboard',
				ANALYTIFY_NICK . esc_html__( ' list of all Add-ons', 'wp-analytify' ),
				esc_html__( 'Add-ons', 'wp-analytify' ),
				'manage_options',
				'analytify-addons',
				array(
					$this,
					'pa_page_file_path',
				),
				65
			);

			add_submenu_page(
				'analytify-dashboard',
				ANALYTIFY_NICK . esc_html__( ' PRO vs FREE', 'wp-analytify' ),
				esc_html__( 'PRO vs FREE', 'wp-analytify' ),
				'manage_options',
				'analytify-go-pro',
				array(
					$this,
					'pa_page_file_path',
				),
				70
			);

			// Promo page (will not appear in side menu).
			add_submenu_page( 'analytify-dashboard', esc_html__( 'Analytify Promo', 'wp-analytify' ), esc_html__( 'Analytify Promo', 'wp-analytify' ), 'manage_options', 'analytify-promo', array( $this, 'addons_promo_screen' ) );
		}

		/**
		 * Fallback addons page if plugin is deactive.
		 */
		public function modules_fallback_page() {
			$wp_analytify_modules = get_option( 'wp_analytify_modules' );

			if ( $wp_analytify_modules && $_SERVER ) {
				foreach ( $wp_analytify_modules as $module ) {
					if ( isset( $_SERVER['QUERY_STRING'] ) && $_SERVER['QUERY_STRING'] === 'page=' . $module['page_slug'] && 'active' !== $module['status'] ) {
						wp_redirect( admin_url( '/admin.php?page=analytify-promo&addon=' . $module['slug'] ) );
						exit;
					}
				}
			}
		}

		/**
		 * Show promo screen for addons.
		 */
		public function addons_promo_screen() {
			include ANALYTIFY_ROOT_PATH . '/views/default/admin/addons-promo.php';
		}

		public function render_optin() {
			include ANALYTIFY_PLUGIN_DIR . 'inc/analytify-optin-form.php';
		}

		/**
		 * Creating tabs for settings
		 *
		 * @since 1.0
		 * @param string $current current tab in the settings page.
		 */

		public function pa_settings_tabs( $current = 'authentication' ) {
			$tabs = array(
				'authentication' => 'Authentication',
				'profile'        => 'Profile',
				'admin'          => 'Admin',
				'dashboard'      => 'Dashboard',
				'advanced'       => 'Advanced',
			);

			if ( has_filter( 'wp_analytify_tabs' ) ) {
				$tabs = apply_filters( 'wp_analytify_tabs', $tabs );
			}

			echo '<div class="left-area">';
			echo '<div id="icon-themes" class="icon32"><br></div>';
			echo '<h2 class="nav-tab-wrapper">';

			foreach ( $tabs as $tab => $name ) {
				$class = ( $tab == $current ) ? ' nav-tab-active' : '';
				echo "<a class='nav-tab$class' href='?page=analytify-settings&tab=$tab'>$name</a>";
			}

			echo '</h2>';
		}

		/**
		 * Get profiles from user Google Analytics account profiles.
		 */

		public function pt_get_analytics_accounts() {
			try {
				if ( get_option( 'pa_google_token' ) != '' ) {
					$profiles = $this->service->management_profiles->listManagementProfiles( '~all', '~all' );

					return $profiles;
				} else {
					echo '<br /><p class="description">' . esc_html__( 'You must authenticate to access your web profiles.', 'wp-analytify' ) . '</p>';
				}
			} catch ( Exception $e ) {
				echo sprintf( esc_html__( '%1$s %2$s Oops, Something went wrong!%3$s %4$s Try to %5$s Reset %6$s Authentication.', 'wp-analytify' ), '<br />', '<strong>', '</strong>', '<br /><br />', '<a href=\'?page=analytify-settings&tab=authentication\' title="Reset">', '</a>' );
			}
		}

		/**
		 * Get the profiles details summary.
		 *
		 * @since 2.0.3
		 */
		public function pt_get_analytics_accounts_summary() {
			try {
				if ( $GLOBALS['WP_ANALYTIFY']->get_exception() ) {
					WPANALYTIFY_Utils::handle_exceptions( $GLOBALS['WP_ANALYTIFY']->get_exception() );
				} elseif ( get_option( 'pa_google_token' ) != '' ) {
					$profiles = $this->service->management_accountSummaries->listManagementAccountSummaries();

					return $profiles;
				} else {
					echo '<br /><div class="notice notice-warning"><p>' . esc_html__( 'Notice: You must authenticate to access your web profiles.', 'wp-analytify' ) . '</p></div>';
				}
			} catch ( Exception $e ) {
				$logger = analytify_get_logger();
				$logger->warning( $e->getMessage(), array( 'source' => 'analytify_profile_summary' ) );

				if ( is_callable( array( $e, 'getErrors' ) ) ) {
					$error = $e->getErrors();
				} else {
					$error = array(
						array(
							'reason' => 'unexpected_profile_error',
						),
					);
				}

				WPANALYTIFY_Utils::handle_exceptions( $error );

				$GLOBALS['WP_ANALYTIFY']->set_exception( $error );

				update_option( 'analytify_profile_exception', $error );
			}
		}

		public function pa_setting_url() {
			return admin_url( 'admin.php?page=analytify-settings' );
		}

		public function pt_save_data( $key_google_token ) {
			try {
				update_option( 'post_analytics_token', $key_google_token );

				if ( $this->pa_connect() ) {
					return true;
				}
			} catch ( Exception $e ) {
				echo $e->getMessage();
			}
		}

		/**
		 * Warning messages.
		 */
		public function profile_warning() {
			$profile_id  = get_option( 'pt_webprofile' );
			$acces_token = get_option( 'post_analytics_token' );

			if ( ! isset( $acces_token ) || empty( $acces_token ) ) {
				echo "<div id='message' class='error'><p><strong>" . sprintf( esc_html__( 'Analytify is not active. Please %1$sAuthenticate%2$s in order to get started using this plugin.', 'wp-analytify' ), '<a href="' . esc_url( menu_page_url( 'analytify-settings', false ) ) . '">', '</a>' ) . '</p></div>';
			} else {
				if ( ! isset( $profile_id ) || empty( $profile_id ) ) {
					echo sprintf( esc_html__( '%1$s Google Analytics Profile is not set. Set the %2$s Profile %3$s', 'wp-analytify' ), '<div class="error"><p><strong>', '<a href="' . esc_url( menu_page_url( 'analytify-settings', false ) ) . '&tab=profile">', '</a></p></div>' );
				}
			}
		}

		/**
		 * get the Analytics data from ajax() call
		 */
		public function get_ajax_single_admin_analytics() {
			// This method is depricated, moved to rest.
			return;

			check_ajax_referer( 'analytify-get-single-stats', 'nonce' );

			$start_date = '';
			$end_date   = '';
			$post_id    = 0;
			$start_date = sanitize_text_field( wp_unslash( $_POST['start_date'] ) );
			$end_date   = sanitize_text_field( wp_unslash( $_POST['end_date'] ) );
			$post_id    = sanitize_text_field( wp_unslash( $_POST['post_id'] ) );

			$this->get_single_admin_analytics( $start_date, $end_date, $post_id, 1 );

			die();
		}

		/**
		 * Set modules state.
		 */
		public function set_module_state() {
			$analytify_modules = get_option( 'wp_analytify_modules' );
			$module_slug       = sanitize_text_field( $_POST['module_slug'] );
			$set_state         = sanitize_text_field( $_POST['set_state'] );
			$internal_module   = sanitize_text_field( $_POST['internal_module'] );
			$plugins_dir       = ABSPATH . 'wp-content/plugins/';
			$return            = 'success';

			if ( ! wp_verify_nonce( $_POST['nonce'], 'addons' ) ) {
				echo 'failed';
				wp_die();
			}

			if ( 'true' === $internal_module ) {
				if ( 'active' === $set_state ) {
					$analytify_modules[ $module_slug ]['status'] = 'active';
				} else {
					$analytify_modules[ $module_slug ]['status'] = false;
				}

				update_option( 'wp_analytify_modules', $analytify_modules );
			} else {
				if ( 'active' === $set_state ) {
					$plugin_change_state = activate_plugin( $plugins_dir . $module_slug );
				} else {
					$plugin_change_state = deactivate_plugins( $plugins_dir . $module_slug );
				}

				// Error in response.
				if ( ! empty( $plugin_change_state ) ) {
					$return = 'failed';
				}
			}

			echo $return;
			wp_die();
		}

		/**
		 * get the Analytics data for wp-admin posts/pages.
		 */
		public function get_single_admin_analytics( $start_date = '', $end_date = '', $post_id = 0, $ajax = 0 ) {
			// This method is deprecated, moved to rest.
			return;

			global $post;

			// Check Profile selection.
			if ( WP_ANALYTIFY_FUNCTIONS::wpa_check_profile_selection( 'Analytify', '<br /><b class="wpa_notice_error">' . __( 'Select your website profile at Analytify->settings->profile tab to load stats.', 'wp-analytify' ) . '</b>' ) ) {
				return;
			}

			if ( 0 === $post_id ) {
				$u_post = '/'; // $url_post['path'];
			} else {
				// decode the url for the filtration.
				$link   = apply_filters( 'analytify_sinlge_stats_permalink', get_permalink( $post_id ), $post_id );
				$u_post = parse_url( urldecode( $link ) );
			}

			if ( 'ga4' === WPANALYTIFY_Utils::get_ga_mode() ) {
				if ( 'localhost' == $u_post['host'] ) {
					$filter = '/';
				} else {
					$filter = $u_post['path'];

					// Change the page pAth filter for site that use domain mapping.
					$filter = apply_filters( 'analytify_ga_page_path_filter', $filter, $u_post );
				}
			}

			if ( '' == $start_date ) {
				$s_date = get_the_time( 'Y-m-d', $post->ID );

				if ( get_the_time( 'Y', $post->ID ) < 2005 ) {
					$s_date = '2005-01-01';
				}
			} else {
				$s_date = $start_date;
			}

			if ( '' == $end_date ) {
				$e_date = date( 'Y-m-d' );
			} else {
				$e_date = $end_date;
			}

			$show_settings = array();
			$show_settings = $this->settings->get_option( 'show_panels_back_end', 'wp-analytify-admin', array( 'show-overall-dashboard' ) );

			// Stop here, if user has disable backend analytics i.e OFF.
			if ( 'on' !== $this->settings->get_option( 'enable_back_end', 'wp-analytify-admin' ) and 0 === $ajax ) {
				return;
			}

			echo sprintf( esc_html__( '%1$s Displaying Analytics of this page from %2$s to %3$s %4$s', 'wp-analytify' ), '<p>', date( 'jS F, Y', strtotime( $s_date ) ), date( 'jS F, Y', strtotime( $e_date ) ), '</p>' );
			echo '<div class="analytify_wraper analytify_single_post_page">';

			if ( is_array( $show_settings ) ) {
				if ( in_array( 'show-overall-dashboard', $show_settings ) ) {
					if ( 'ga4' === WPANALYTIFY_Utils::get_ga_mode() ) {
						$wp_analytify = $GLOBALS['WP_ANALYTIFY'];
						$stats        = $wp_analytify->get_reports('analytify-single-general-stats', array(
								'sessions',
								'totalUsers',
								'screenPageViews',
								'averageSessionDuration',
								'bounceRate',
								// 'screenPageViewsPerSession',
								'newUsers',
								// 'avgTimeOnPage'
							), array(
								'start' => $s_date,
								'end'   => $e_date,
							), array(
								'pagePathPlusQueryString',
							), array(), array(
								'logic'   => 'AND',
								'filters' => array(
									array(
										'type'       => 'dimension',
										'name'       => 'pagePathPlusQueryString',
										'match_type' => 1,
										'value'      => $filter,
									),
								),
							));

						include_once ANALYTIFY_ROOT_PATH . '/views/default/admin/single-general-stats.php';
						ga_single_general( $stats );
					}
				}

				// Display page depth stats.
				if ( in_array( 'show-scroll-depth-stats', $show_settings ) && 'on' === $this->settings->get_option( 'depth_percentage', 'wp-analytify-advanced' ) ) {
					// Remove protocol form permalink.
					$permalink = get_the_permalink( $post_id );
					$permalink = str_replace( array( 'http://', 'https://' ), '', $permalink );

					if ( 'ga4' === WPANALYTIFY_Utils::get_ga_mode() ) {
						$depth_stats = $this->get_reports(
							'analytify-single-general-scrolldepth',
							array(
								'eventCount',
							),
							array(
								'start' => $s_date,
								'end'   => $e_date,
							),
							array(
								'customEvent:category',
								'customEvent:link_label',
								'customEvent:link_action',
							),
							array(),
							array(
								'logic'   => 'AND',
								'filters' => array(
									array(
										'type'       => 'dimension',
										'name'       => 'customEvent:link_label',
										'match_type' => 1,
										'value'      => $permalink,
									),
								),
							)
						);

						include_once ANALYTIFY_ROOT_PATH . '/views/default/admin/single-depth-stats.php';
						wpa_include_ga_single_depth( $this, $depth_stats );
					}
				}
			}

			do_action( 'wp_analytify_stats_under_post', $show_settings, $s_date, $e_date, $filter );

			echo '</div>';
		}

		/**
		 * Pretty numbers
		 *
		 * @param int $num number.
		 */
		public function wpa_pretty_numbers( $num ) {
			return round( ( $num / 1000 ), 2 ) . 'k';
		}

		/**
		 * Format numbers.
		 *
		 * @param int $num number.
		 */
		public function wpa_number_format( $num ) {
			return number_format( $num );
		}

		/**
		 * Pretty time to display.
		 *
		 * @param int $time time.
		 */
		public function pa_pretty_time( $time ) {
			// Check if numeric.
			if ( is_numeric( $time ) ) {
				$value = array(
					'years'   => '00',
					'days'    => '00',
					'hours'   => '',
					'minutes' => '',
					'seconds' => '',
				);

				$attach_hours = '';
				$attach_min   = '';
				$attach_sec   = '';

				$time = floor($time);

				if ( $time >= 31556926 ) {
					$value['years'] = floor( $time / 31556926 );
					$time           = ( $time % 31556926 );
				} //$time >= 31556926

				if ( $time >= 86400 ) {
					$value['days'] = floor( $time / 86400 );
					$time          = ( $time % 86400 );
				} //$time >= 86400
				if ( $time >= 3600 ) {
					$value['hours'] = str_pad( floor( $time / 3600 ), 1, 0, STR_PAD_LEFT );
					$time           = ( $time % 3600 );
				} //$time >= 3600
				if ( $time >= 60 ) {
					$value['minutes'] = str_pad( floor( $time / 60 ), 1, 0, STR_PAD_LEFT );
					$time             = ( $time % 60 );
				} //$time >= 60
				$value['seconds'] = str_pad( floor( $time ), 1, 0, STR_PAD_LEFT );
				// Get the hour:minute:second version.
				if ( '' != $value['hours'] ) {
					$attach_hours = '<sub>' . _x( 'h', 'Hour Time', 'wp-analytify' ) . '</sub> ';
				}
				if ( '' != $value['minutes'] ) {
					$attach_min = '<sub>' . _x( 'm', 'Minute Time', 'wp-analytify' ) . '</sub> ';
				}
				if ( '' != $value['seconds'] ) {
					$attach_sec = '<sub>' . _x( 's', 'Second Time', 'wp-analytify' ) . '</sub>';
				}

				return $value['hours'] . $attach_hours . $value['minutes'] . $attach_min . $value['seconds'] . $attach_sec;
			} else {
				return false;
			}
		}

		/**
		 * Check current user role.
		 *
		 * @since 1.2.6
		 * @param array $access_level selected access level.
		 * @return boolean
		 */
		public function pa_check_roles( $access_level ) {
			
			// Convert string to array if none of the role selected.
			$access_level = (array) $access_level;
			
			if ( is_user_logged_in() && isset( $access_level ) ) {

				global $current_user;
				$roles = $current_user->roles;

				if ( array_intersect( $roles, $access_level ) ) {
					return true;
				} elseif ( is_super_admin( $current_user->ID ) && is_multisite() ) {
					return true;
				} else {
					return false;
				}
			}

			return false;
		}

		/**
		 * Display a notice to update the addons
		 * to latest version on analytify 5.0.0
		 * also display a ga4 move to notice.
		 * 
		 * @since 5.0.6
		 */
		public function addons_ga4_update_notice() {


			if ( ! $this->is_reporting_in_ga4 ) {
				$class   = 'wp-analytify-danger';
				$message = sprintf(
					esc_html__( '%1$sAttention:%2$s Switch to GA4 (Google Analytics 4), Your current version of Google Analytics (UA) is outdated and no longer tracks data. %3$sFollow the guide%4$s.', 'wp-analytify' ),
					'<b>',
					'</b>',
					'<a href="https://analytify.io/doc/switch-to-ga4/?utm_source=plugin-notices" target="_blank">',
					'</a>'
				);
				analytify_notice( $message, $class );
			}

			$analytify_pages = array(
				'toplevel_page_analytify-dashboard',
				'analytify_page_analytify-settings',
				'analytify_page_analytify-goals',
				'analytify_page_analytify-woocommerce',
				'analytify_page_analytify-authors',
				'edd-dashboard',
				'dashboard',
				'analytify_page_analytify-dimensions',
				'analytify_page_analytify-campaigns',
				'analytify_page_analytify-addons',
			);
			$current_screen  = get_current_screen()->base;
			if ( in_array( $current_screen, $analytify_pages ) ) {

				$addons_update_todo = WPANALYTIFY_Utils::get_addons_to_update();
				if ( ! empty( $addons_update_todo ) ) {
					$class   = 'wp-analytify-danger';
					$message = sprintf( esc_html__( '%1$sNotice:%2$s Please update the following plugins to make them work with the Analytify 5.0.0 smoothly. %3$s', 'wp-analytify' ), '<b>', '</b>', '<br>' . implode( '<br>', $addons_update_todo ) );
					analytify_notice( $message, $class );
				}
			}


		}

		/**
		 * Display a notice that the stored cache is cleared.
		 * 
		 * @since 5.0.5
		 * 
		 * @version 5.0.6
		 */
		public function analytify_cache_clear_notice() {
			if( ! isset( $_GET['analytify-cache'] ) ) {
				return;
			}
			echo '<div id="message" class="updated notice is-dismissible"><p> ' .  __( 'Analytify statistics refreshed', 'wp-analytify') . ' </p></div>';
		}

		public function analytify_dismiss_rank_math_notice()
		{
			update_option('analytify_show_rank_math_notice', false);
		}

		/**
		 * Display a notice that can be dismissed.
		 *
		 * @version 5.0.6
		 * @since 1.3
		 */
		public function analytify_admin_notice() {

			if (isset($_GET['page']) && strpos($_GET['page'], 'analytify-dashboard') === 0) {
			// Check if the notice should be displayed by fetching the option
			$show_notice = get_option('analytify_show_rank_math_notice', true);
			
			if ($show_notice && is_plugin_active('seo-by-rank-math-pro/rank-math-pro.php')) {
				add_option('analytify_show_rank_math_notice', true);
				$rank_math_analytics_options = get_option('rank_math_google_analytic_options');

				if (is_array($rank_math_analytics_options) && isset($rank_math_analytics_options['local_ga_js']) && $rank_math_analytics_options['local_ga_js']) {
					$screen = get_current_screen();
					// Check if the current page is related to Rank Math or Analytify
					if ($screen && (strpos($screen->id, 'analytify') !== false)) {
						echo '<div id="message" class="notice notice-warning is-dismissible analytify-rank-math-notice">
								<p>' . sprintf(
							__('Kindly note that Rank Math Self-Hosted Analytics JS File Feature is available in %1$s Analytify %2$s as well. We recommend using Analytify for this functionality.', 'wp-analytify'),
							'<a style="text-decoration:none" href="' . menu_page_url('analytify-settings', false) . '#wp-analytify-advanced">',
							'</a>'
						) . '</p></div>'; ?>
						<script type="text/javascript">
							(function($) {
								$(document).on('click', '.analytify-rank-math-notice .notice-dismiss', function() {
									$.post(ajaxurl, {
										action: 'analytify_dismiss_rank_math_notice',
									});
								});
							})(jQuery);
						</script>
					<?php
					} else if (strpos($screen->id, 'rank-math') !== false) {
						echo '<div id="message" class="rank-math-notice notice is-dismissible">
								<p>' . sprintf(
							__('Kindly note that Rank Math Self-Hosted Analytics JS File Feature is available in %1$s Analytify %2$s as well. We recommend using Analytify for this functionality.', 'wp-analytify'),
							'<a style="text-decoration:none" href="' . menu_page_url('analytify-settings', false) . '#wp-analytify-advanced">',
							'</a>'
						) . '</p></div>'; ?>
						<script type="text/javascript">
							(function($) {
								$(document).on('click', '.rank-math-notice .notice-dismiss', function() {
									$.post(ajaxurl, {
										action: 'analytify_dismiss_rank_math_notice',
									});
								});
							})(jQuery);
						</script>
			<?php
					}
				}
			}
		}

			if (isset($_GET['page']) && strpos($_GET['page'], 'analytify-settings') === 0) {
			if ( get_option( 'analytify_profile_exception' ) ) {
				return;
			}
			}

			if (isset($_GET['page']) && strpos($_GET['page'], 'analytify-settings') === 0) {
			$profile_id     = get_option( 'pt_webprofile' );
			}
			$acces_token    = get_option( 'post_analytics_token' );
			$manual_ua_code = $this->settings->get_option( 'manual_ua_code', 'wp-analytify-authentication', false );

			/* Show notices */
			if ( empty( $manual_ua_code ) && ( ! isset( $acces_token ) || empty( $acces_token ) || ! get_option( 'pa_google_token' ) ) ) {
				$dashboard_pages = array(
					'toplevel_page_analytify-dashboard',
					'analytify_page_analytify-goals',
					'analytify_page_analytify-woocommerce',
					'analytify_page_analytify-authors',
					'edd-dashboard',
					'analytify_page_analytify-dimensions',
					'analytify_page_analytify-campaigns',
					'analytify_page_analytify-addons',
				);
				$current_screen  = get_current_screen()->base;

				// Prevent doubling of notices on analytify dashboard pages.
				if ( ! in_array( $current_screen, $dashboard_pages ) ) {
					$class   = 'wp-analytify-danger';
					$link    = esc_url( menu_page_url( 'analytify-settings', false ) );
					$message = sprintf( esc_html__( '%1$sNotice:%2$s %3$sConnect%4$s %2$s Analytify with your Google account.', 'wp-analytify' ), '<b>', '</b>', '<b><a style="text-decoration:none" href=' . $link . '>', '</a>' );
					analytify_notice( $message, $class );
				}
			} else {
				if ( empty( $manual_ua_code ) && ! WP_ANALYTIFY_FUNCTIONS::is_profile_selected() ) {
					$class   = 'wp-analytify-success';
					$link    = esc_url( menu_page_url( 'analytify-settings', false ) );
					$message = sprintf( esc_html__( 'Congratulations! Analytify is now authenticated. Please select your website profile %1$s here %2$s to get started.', 'wp-analytify' ), '<a style="text-decoration:none" href="' . $link . '#wp-analytify-profile">', '</a>' );
					analytify_notice( $message, $class );
				}
			}

			if ( defined( 'ANALYTIFY_TRACKING_MODE' ) && 'gtag' === ANALYTIFY_TRACKING_MODE ) {
				$update_gtag_plugins = array();

				if ( class_exists( 'WP_Analytify_Woocommerce' ) && 1 === version_compare( '4.1.0', ANALTYIFY_WOOCOMMERCE_VERSION ) ) {
					array_push( $update_gtag_plugins, 'Analytify - WooCommerce Tracking' );
				}
				if ( class_exists( 'Analytify_Forms' ) && defined( 'ANALYTIFY_FORMS_VERSION' ) && 1 === version_compare( '2.0.0', ANALYTIFY_FORMS_VERSION ) ) {
					array_push( $update_gtag_plugins, 'Analytify - Forms Tracking' );
				} else {
					if ( ! defined( 'ANALYTIFY_FORMS_VERSION' ) ) {
						//error_log( 'ANALYTIFY_FORMS_VERSION is not defined.' ); // Log if the constant is missing
					}
				}
				if ( class_exists( 'WP_Analytify_Pro_Base' ) && 1 === version_compare( '4.1.0', ANALYTIFY_PRO_VERSION ) ) {
					array_push( $update_gtag_plugins, 'Analytify Pro' );
				}

				if ( ! empty( $update_gtag_plugins ) ) {
					$class   = 'wp-analytify-danger';
					$message = sprintf( esc_html__( '%1$sNotice:%2$s Please update the following plugins to make them work with the Analytify gtag.js tracking mode. %3$s', 'wp-analytify' ), '<b>', '</b>', '<br>' . implode( ', ', $update_gtag_plugins ) );
					analytify_notice( $message, $class );
				}
			}
		}

		/**
		 * Notice to switch gtag.js tracking mode.
		 *
		 * @return void
		 */
		public function gtag_move_to_notice() {
			$scheme      = ( parse_url( $_SERVER['REQUEST_URI'], PHP_URL_QUERY ) ) ? '&' : '?';
			$url         = $_SERVER['REQUEST_URI'] . $scheme . 'wp_analytify_gtag_dismiss=yes';
			$dismiss_url = wp_nonce_url( $url, 'analytify-gtag-nonce' );
			?>

			<div class="wp-analytify-notification wp-analytify-danger">
				<a class="" href="#" aria-label="Dismiss the welcome panel"></a>
				<div class="wp-analytify-notice-logo">
					<img src="<?php echo plugins_url( 'assets/img/notice-logo.svg', __FILE__ ); ?>" alt="notice">
				</div>
				<div class="wp-analytify-notice-discription">
					<p><?php _e( 'Analytify introduced the new gtag.js tracking mode. Switch it now from plugin Advanced settings to use recommended Google Analytics gtag.js tracking method. <br />', 'wp-analytify' ); ?><br /></p>
					<ul class="analytify-review-ul" style="padding-top:10px">
						
						<li><a href="<?php echo $dismiss_url; ?>"><span class="dashicons dashicons-dismiss"></span><?php _e( 'I have moved to gtag.js', 'wp-analytify' ); ?></a></li>
					</ul>
				</div>
			</div>

			<?php
		}

		public function dismiss_notices() {
			if ( ! is_admin() || ! current_user_can( 'manage_options' ) || ! isset( $_GET['_wpnonce'] ) ) {
				return;
			}

			// Gtag dismiss notice.
			if ( wp_verify_nonce( sanitize_key( wp_unslash( $_GET['_wpnonce'] ) ), 'analytify-gtag-nonce' ) && isset( $_GET['wp_analytify_gtag_dismiss'] ) && 'yes' === $_GET['wp_analytify_gtag_dismiss'] ) {
				delete_option( 'analytify_gtag_move_to_notice' );
			}
		}

		/**
		 * Analytify_nag_ignore Ignore notice.
		 *
		 * @return void
		 */
		public function analytify_nag_ignore() {
			global $current_user;

			$user_id = $current_user->ID;

			/* If user clicks to ignore the notice, add that to their user meta */
			if ( isset( $_GET['analytify_nag_ignore'] ) && '0' === $_GET['analytify_nag_ignore'] ) { // Input var okay.
				add_user_meta( $user_id, 'analytify_2_1_22_ignore', 'true', true );
			}

			/* If user clicks to ignore the 2.1.5 notice, add that to their user meta */
			if ( isset( $_GET['analytify_2_1_22_ignore'] ) && '0' === $_GET['analytify_2_1_22_ignore'] ) { // Input var okay.
				add_user_meta( $user_id, 'analytify_2_1_22_ignore', 'true', true );
			}
		}

		/**
		 * Show pointers for announcements
		 *
		 * @return void
		 */
		public function pa_welcome_message() {
			$pointer_content  = '<h3>Announcement:</h3>';
			$pointer_content .= '<p><input type="checkbox" name="wpa_allow_tracking" value="1" id="wpa_allow_tracking"> ';
			$pointer_content .= 'Help us making Analytify even better by sharing very basic plugin usage data.';

			if ( ! WPANALYTIFY_Utils::is_active_pro() ) {
				$pointer_content .= ' Opt-in and receive a $10 Off coupon for <a href="https://analytify.io/upgrade-from-free">Analytify PRO</a>.</p>';
			}
			?>

			<script type="text/javascript">
			//<![CDATA[
			jQuery(document).ready( function($) {

				if(typeof(jQuery().pointer) != 'undefined') {

					$('#toplevel_page_analytify-dashboard').pointer({

						content: '<?php echo $pointer_content; ?>',
						position: {
							edge: 'left',
							align: 'center'
						},
						close: function() {
							$.post( ajaxurl, {
								pointer: 'tracking',
								wpa_allow:  $('#wpa_allow_tracking:checked').val(),
								action: 'analytify_dismiss_pointer'
							});

						   <?php if ( ! WPANALYTIFY_Utils::is_active_pro() ) { ?>
								if($('#wpa_allow_tracking:checked').val() == 1) alert( '<?php _e( 'Thankyou!\nYour Coupon code is Analytify2016', 'wp-analytify' ); ?>' );
						   <?php } ?>
						}
					}).pointer('open');
				};
			});
			//]]>
		</script>

			<?php
		}

		/**
		 *  Check and Dismiss review message.
		 *
		 *  @since 1.3
		 */
		private function review_dismissal() {
			if ( ! is_admin() || ! current_user_can( 'manage_options' ) || ! isset( $_GET['_wpnonce'] ) || ! wp_verify_nonce( sanitize_key( wp_unslash( $_GET['_wpnonce'] ) ), 'analytify-review-nonce' ) || ! isset( $_GET['wp_analytify_review_dismiss'] ) ) {
				return;
			}

			add_site_option( 'wp_analytify_review_dismiss_4_1_8', 'yes' );
		}

		/**
		 * Ask users to review our plugin on .org
		 *
		 * @since 1.3
		 * @return boolean false
		 */
		public function analytify_review_notice() {
			$this->review_dismissal();
			$this->review_prending();

			$activation_time  = get_site_option( 'wp_analytify_active_time' );
			$review_dismissal = get_site_option( 'wp_analytify_review_dismiss_4_1_8' );

			if ( 'yes' == $review_dismissal ) {
				return;
			}

			if ( ! $activation_time ) {
				$activation_time = time();
				add_site_option( 'wp_analytify_active_time', $activation_time );
			}

			// 1296000 = 15 Days in seconds.
			if ( time() - $activation_time > 1296000 ) {
				add_action( 'admin_notices', array( $this, 'analytify_review_notice_message' ) );
			}
		}

		/**
		 * Set time to current so review notice will popup after 14 days
		 *
		 * @since 2.0.9
		 */
		public function review_prending() {
			if ( ! is_admin() || ! current_user_can( 'manage_options' ) || ! isset( $_GET['_wpnonce'] ) || ! wp_verify_nonce( sanitize_key( wp_unslash( $_GET['_wpnonce'] ) ), 'analytify-review-nonce' ) || ! isset( $_GET['wp_analytify_review_later'] ) ) {
				return;
			}

			// Reset Time to current time.
			update_site_option( 'wp_analytify_active_time', time() );
		}

		/**
		 * Review notice message
		 *
		 * @since  1.3
		 */
		public function analytify_review_notice_message() {
			$scheme      = ( parse_url( $_SERVER['REQUEST_URI'], PHP_URL_QUERY ) ) ? '&' : '?';
			$url         = $_SERVER['REQUEST_URI'] . $scheme . 'wp_analytify_review_dismiss=yes';
			$dismiss_url = wp_nonce_url( $url, 'analytify-review-nonce' );

			$_later_link = $_SERVER['REQUEST_URI'] . $scheme . 'wp_analytify_review_later=yes';
			$later_url   = wp_nonce_url( $_later_link, 'analytify-review-nonce' );
			?>

			<div class="analytify-review-notice">
				<div class="analytify-review-thumbnail">
					<img src="<?php echo plugins_url( 'assets/img/notice-logo.svg', __FILE__ ); ?>" alt="notice">
				</div>
				<div class="analytify-review-text">
					<h3><?php _e( 'How\'s Analytify going, impressed?', 'wp-analytify' ); ?></h3>
					<p><?php _e( 'We hope you\'ve enjoyed using Analytify! Would you consider leaving us a 5-star review on WordPress.org?', 'wp-analytify' ); ?></p>
					<ul class="analytify-review-ul">
						<li><a href="https://wordpress.org/support/view/plugin-reviews/wp-analytify?rate=5#postform" target="_blank"><span class="dashicons dashicons-external"></span><?php _e( 'Sure! I\'d love to!', 'wp-analytify' ); ?></a></li>
						<li><a href="<?php echo $dismiss_url; ?>"><span class="dashicons dashicons-smiley"></span><?php _e( 'I\'ve already left a 5-star review', 'wp-analytify' ); ?></a></li>
						<li><a href="<?php echo $later_url; ?>"><span class="dashicons dashicons-calendar-alt"></span><?php _e( 'Maybe Later', 'wp-analytify' ); ?></a></li>
						<li><a href="<?php echo $dismiss_url; ?>"><span class="dashicons dashicons-dismiss"></span><?php _e( 'Never show again', 'wp-analytify' ); ?></a></li>
					</ul>
				</div>
			</div>

			<?php
		}

		/**
		 * Show Buy Pro Notice after 7 days of activation.
		 *
		 * @since 2.1.23
		 */
		public function analytify_buy_pro_notice() {
			$this->buy_pro_notice_dismissal();

			$activation_time  = get_site_option( 'wp_analytify_buy_pro_active_time' );
			$review_dismissal = get_site_option( 'wp_analytify_buy_pro_notice' );

			if ( 'yes' == $review_dismissal ) {
				return;
			}

			if ( ! $activation_time ) {
				$activation_time = time();
				add_site_option( 'wp_analytify_buy_pro_active_time', $activation_time );
			}

			// 604800 = 7 Days in seconds.
			if ( time() - $activation_time > 604800 ) {
				add_action( 'admin_notices', array( $this, 'analytify_buy_pro_message' ) );
			}
		}

		/**
		 * Dismiss Buy Pro Notice.
		 *
		 * @since 2.1.23
		 */
		public function buy_pro_notice_dismissal() {
			if ( ! is_admin() || ! current_user_can( 'manage_options' ) || ! isset( $_GET['_wpnonce'] ) || ! wp_verify_nonce( sanitize_key( wp_unslash( $_GET['_wpnonce'] ) ), 'wp_analytify_buy_pro_notice' ) || ! isset( $_GET['wp_analytify_buy_pro_notice_dismiss'] ) ) {
				return;
			}

			add_site_option( 'wp_analytify_buy_pro_notice', 'yes' );
		}

		/**
		 * Show Buy Pro Notice.
		 *
		 * @since 2.1.23
		 */
		public function analytify_buy_pro_message() {
			$scheme      = ( parse_url( $_SERVER['REQUEST_URI'], PHP_URL_QUERY ) ) ? '&' : '?';
			$url         = $_SERVER['REQUEST_URI'] . $scheme . 'wp_analytify_buy_pro_notice_dismiss=yes';
			$dismiss_url = wp_nonce_url( $url, 'wp_analytify_buy_pro_notice' );

			$class = 'wp-analytify-success';

			$message = sprintf( 'Analytify now powering %1$s30,000+%2$s websites. Use the coupon code %1$BFCM60%2$s to redeem a %1$s60%% %2$s discount on Pro. %3$sApply Coupon%4$s %5$s I\'m good with free.%6$s', '<strong>', '</strong>', '<a href="https://analytify.io/pricing/?discount=BFCM60" target="_blank" class="wp-analytify-notice-link"><span class="dashicons dashicons-smiley"></span> ', '</a>', '<a href="' . $dismiss_url . '" class="wp-analytify-notice-link"><span class="dashicons dashicons-dismiss"></span>', '</a>' );

			analytify_notice( $message, $class );
		}

		/**
		 * Include required ajax files.
		 * Ajax functions for admin and the front-end
		 */
		public function ajax_includes() {
			include_once 'inc/class-wpa-ajax.php';
		}

		/**
		 * Display stats link under each post row
		 *
		 * @param  Array  $actions [description].
		 * @param  Object $post    Current post data.
		 * @return Array
		 *
		 * @version 5.0.3
		 * @since 1.3.5
		 */
		public function post_rows_stats( $actions, $post ) {
			//return if disable post stats is on
			if( 'on' !== $this->disable_post_stats ) {
				return $actions;
			}
			$display_draft_posts = apply_filters('analytify_filter_to_display_draft_posts', false);

			if ( 'publish' === $post->post_status || $display_draft_posts === true) {
				$actions['post_row_stats'] = '<a href="' . admin_url( 'post.php?post=' . $post->ID . '&action=edit#pa-single-admin-analytics' ) . '" title="View Stats of “' . get_the_title( $post ) . '”">Stats</a>';
			}

			return $actions;
		}

		/**
		 * Display stats button in the publish box
		 *
		 * @param  Object $post WP_POST Object.
		 * @return void
		 *
		 * @since 1.3.5
		 */
		public function post_submitbox_stats_action( $post ) {

			$display_draft_posts = apply_filters('analytify_filter_to_display_draft_posts', false);

    		// Check if the post is published or if the filter allows displaying draft posts
			if ( 'publish' === $post->post_status || $display_draft_posts ) {
				if (in_array($post->post_type, $this->settings->get_option('show_analytics_post_types_back_end', 'wp-analytify-admin', array()))) {
					echo '<a id="view_stats_analytify" href="'. esc_url(admin_url('post.php?post='. esc_html($post->ID). '&action=edit#pa-single-admin-analytics')). '" title="View Stats of “'. get_the_title($post). '”" class="button button-primary button-large" style="float:left">View Stats</a>';
				}
			}
		}

		/**
		 * Enqueue script for miscellaneous tracking.
		 */
		public function analytify_track_miscellaneous(){
			wp_enqueue_script( 'analytify_track_miscellaneous', plugins_url( 'assets/js/miscellaneous-tracking.js', __FILE__ ), array( 'jquery' ), ANALYTIFY_VERSION, true );

			$miscellaneous_tracking_options = array(
				'ga_mode'          => WPANALYTIFY_Utils::get_ga_mode(),
				'tracking_mode'    => ANALYTIFY_TRACKING_MODE,
				'track_404_page'   => array(
					'should_track'  => $this->settings->get_option( '404_page_track', 'wp-analytify-advanced' ),
					'is_404' => is_404(),
					'current_url'   => esc_url_raw( home_url( add_query_arg( null, null ) ) ),
				),
				'track_js_error'   => $this->settings->get_option( 'javascript_error_track', 'wp-analytify-advanced' ),
				'track_ajax_error' => $this->settings->get_option( 'ajax_error_track', 'wp-analytify-advanced' ),
			);
			wp_localize_script( 'analytify_track_miscellaneous', 'miscellaneous_tracking_options', $miscellaneous_tracking_options );
		}

		/**
		 * Process logout and clear stored options.
		 *
		 * @return void
		 */
		public function logout() {
			if ( isset( $_POST['wp_analytify_log_out'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash($_POST['analytify_analytics_logout_nonce']) ),'analytify_analytics_logout') ) {
				delete_option( 'pt_webprofile' );
				delete_option( 'pt_webprofile_dashboard' );
				delete_option( 'pt_webprofile_url' );
				delete_option( 'pa_google_token' );
				delete_option( 'post_analytics_token' );
				delete_option( 'hide_profiles' );
				delete_option( 'analytify-ga4-streams' );
				delete_option( 'analytify_tracking_property_info' );
				delete_option( 'analytify_reporting_property_info' );
				delete_option( 'analytify_ga4_exception' );
				delete_option( 'analytify_ga4_exceptions' );
				delete_option( 'profiles_list_summary' );
				delete_option( 'analytify_ga_properties_list' ); // GA properties list.

				$update_message = sprintf( esc_html__( '%1$s %2$s %3$s Authentication Cleared login again. %4$s %5$s %6$s', 'wp-analytify' ), '<div id="setting-error-settings_updated" class="updated notice is-dismissible settings-error below-h2">', '<p>', '<strong>', '</strong>', '</p>', '</div>' );
			}
		}

		/**
		 * Used to add query args that need to be removed from url
		 * 
		 * @since 5.0.6
		 */
		public function Analytify_remove_query( $args_array ){
			$analytify_args_to_remove = ['analytify-cache'];
			$args_array               = array_merge( $args_array, $analytify_args_to_remove );
			return $args_array;
		}

		/**
		 * Trigger logging cleanup using the logging class.
		 *
		 * @since 2.1.23
		 */

		public function analytify_cleanup_logs() {
			$logger = analytify_get_logger();

			if ( is_callable( array( $logger, 'clear_expired_logs' ) ) ) {
				$logger->clear_expired_logs();
			}
		}

		/**
		 * Clear the Selected Profile if user changes the
		 * Google analytics version update the tracking code
		 * and mp secret on stream change.
		 * 
		 * @param array $old_value
		 * @param array $new_value
		 * 
		 * @since 5.0.0
		 */
		public function update_selected_profiles( $old_value, $new_value ) {

			if ( isset($new_value['google_analytics_version']) && ( isset($old_value['google_analytics_version']) && $new_value['google_analytics_version'] != $old_value['google_analytics_version'] ) ) {
				$analytify_profile_section = get_option('wp-analytify-profile');
				if( isset( $analytify_profile_section['profile_for_dashboard'] ) && $analytify_profile_section['profile_for_dashboard'] ) {
					$analytify_profile_section['profile_for_dashboard'] = '';
				}
				if( isset( $analytify_profile_section['profile_for_posts'] ) && $analytify_profile_section['profile_for_posts'] ) {
					$analytify_profile_section['profile_for_posts'] = '';
				}
				update_option( 'wp-analytify-profile', $analytify_profile_section );
				delete_option( 'analytify-ga-properties-summery' );
				delete_option( 'analytify_ga4_exceptions' );
			}

			// if user change the stream update the ua code and mp secret
			if ( isset( $new_value['ga4_web_data_stream'] ) && isset( $old_value['ga4_web_data_stream'] ) && $new_value['ga4_web_data_stream'] != $old_value['ga4_web_data_stream'] ) {
                // TODO: legacy code with wrong naming
				$ua_code = get_option('analytify_ua_code');
				// check if the ua code is same if it's then return.
				if( $ua_code == $new_value['ga4_web_data_stream'] ) {
					return;
				}
				// Update the tracking code.
				update_option( 'analytify_ua_code', $new_value['ga4_web_data_stream'] );

				new Analytify_Host_Analytics( 'gtag', false , true ); // update the locally host analytics file.
				
				//Get the stored data for currect property and stream.
				$property_info = get_option('analytify_tracking_property_info');
				$all_streams   = get_option('analytify-ga4-streams');

				if ( !empty( $property_info ) ){
					// Extract the current property id.
					$property_id = $property_info['property_id'];

					// get all the data for currently selected stream from the all streams array.
					$stream_data = $all_streams[$property_id][$new_value['ga4_web_data_stream']] ?? false;

					// Set mp secret value initally to null.
					$new_secret_value = null;

					if( isset( $stream_data['full_name'] ) ){

						$new_secret_value = $this->get_mp_secret( $stream_data['full_name'] );

						if( empty( $new_secret_value ) ) {
							$new_secret_value = $this->create_mp_secret( $property_id, $stream_data['full_name'], $stream_data['measurement_id'] );
						}
						WPANALYTIFY_Utils::update_option( 'measurement_protocol_secret', 'wp-analytify-advanced', $new_secret_value );
						update_option( 'analytify_tracking_property_info', $stream_data );
						update_option( 'analytify_reporting_property_info', $stream_data );
					}
				}
			}
		}
		/**
		* Update profiles_list_summary option when hide profile is set.
		* @param  array $old_value
		* @param  array $new_value
		*
		* @since 2.1.4
		*/
		public function update_profiles_list_summary( $old_value, $new_value ) {
			if ( isset( $new_value['hide_profiles_list'] ) && $new_value['hide_profiles_list'] == 'on' && ( $new_value['hide_profiles_list'] != $old_value['hide_profiles_list'] ) && isset( $new_value['profile_for_dashboard'] ) ) {
				$accounts = get_option( 'profiles_list_summary' );

				update_option( 'profiles_list_summary_backup', $accounts, 'no' );

				$new_properties = array();
				if(! empty($accounts)) {
					foreach ($accounts->getItems() as $account) {
						foreach ($account->getWebProperties() as  $property) {
							foreach ($property->getProfiles() as $profile) {
								// Get Property ID i.e UA Code
								if ($profile->getId() === $new_value['profile_for_dashboard']) {
									$new_properties[ $account->getId() ] = $property;
								}
								if ($profile->getId() === $new_value['profile_for_posts']) {
									$new_properties[ $account->getId() ] = $property;
								}
							}
						}
					}
				}

				update_option( 'profiles_list_summary', $new_properties );
			}

			// Update stream and save measurement id when user selects the GA4 property for tracking. (Profile for posts (Backend/Front-end))
			if ( isset( $new_value['profile_for_posts'] ) && $new_value['profile_for_posts'] && substr( $_POST['wp-analytify-profile']['profile_for_posts'], 0, 3 ) === 'ga4' ) {
				$property_id = explode( ':', $new_value['profile_for_posts'] )[1];
				$this->setup_property( $property_id, 'tracking' );
			}

			// Update stream and save measurement id when user selects the GA4 property for reporting. (Profile for dashboard)
			if ( isset( $new_value['profile_for_dashboard'] ) && $new_value['profile_for_dashboard'] && substr( $_POST['wp-analytify-profile']['profile_for_dashboard'], 0, 3 ) === 'ga4' ) {
				$ga4_update_number = rand( 10, 100 );
				update_option( 'ga4_update_number', 'updated_' . $ga4_update_number );
				$property_id = explode( ':', $new_value['profile_for_dashboard'] )[1];
				$this->setup_property( $property_id, 'reporting' );
			} else {
				$ua_update_number = rand( 10, 100 );
				update_option( 'ua_update_number', 'updated_' . $ua_update_number );
			}
		}

		/**
		 * Setup property for tracking and reporting.
		 *
		 * @param integer $property_id
		 * @param string  $mode
		 * 
		 * @since 5.0.0
		 */
		private function setup_property( $property_id, $mode ) {

			$ga4_streams      = $this->get_ga_streams( $property_id ) ?? false;
			$measurement_data = array();

            if( ! empty( $ga4_streams ) ) {
				$stream_name      = 'Analytify - ' . get_site_url();
				$default_stream   = null;
				// if our created stream exist select that one. Otherwise select the first stream in array.
				foreach ($ga4_streams as $stream) {
					if ( isset( $stream['stream_name'] ) && $stream['stream_name'] == $stream_name ) {
						$default_stream = $stream;
						break;
					} else if (!$default_stream && isset( $stream['stream_name'] ) ) {
						$default_stream = $stream;
					}
				  }
				// if found the stream select that one otherwise checks added for old streams structure we were using if found the stream in that structure select it otherwise return null.
				$measurement_data =  ! empty( $default_stream ) ? $default_stream : ( isset($ga4_streams['measurement_id']) && isset($ga4_streams['full_name']) ? $ga4_streams : null );
			} else {
				$measurement_data = $this->create_ga_stream( $property_id );
			}

			if ( ! empty( $measurement_data['measurement_id'] ) ) {

				// Get and Update the secret value in settings.
				$get_secret_value  = $this->get_mp_secret( $measurement_data['full_name'] );
				if ( ! empty( $get_secret_value ) ) {
					WPANALYTIFY_Utils::update_option( 'measurement_protocol_secret', 'wp-analytify-advanced', $get_secret_value );
				} else {
					$mp_secret_value = $this->create_mp_secret( $property_id, $measurement_data['full_name'], $measurement_data['measurement_id'] );
					if ( ! empty( $mp_secret_value ) ) {
						WPANALYTIFY_Utils::update_option( 'measurement_protocol_secret', 'wp-analytify-advanced', $get_secret_value );
					}
				}

				$dimensions = $this->list_dimensions_needs_creation();
	
				// Store property with stream data for future use.
				update_option( 'analytify_' . $mode . '_property_info', $measurement_data );

				if ( 'tracking' === $mode ) {
					update_option( 'analytify_ua_code', $measurement_data['measurement_id'] );
					new Analytify_Host_Analytics( 'gtag', false , true ); // update the locally host analytics file.
					// update the advanced section ga4 stream option value.
					WPANALYTIFY_Utils::update_option( 'ga4_web_data_stream', 'wp-analytify-advanced', $measurement_data['measurement_id']);
				}
				
				// Create dimensions for Analytify tracking.
				foreach ( $dimensions as $dimension_info ) {
					$create_dimesion = $this->create_dimension( $dimension_info['parameter_name'], $dimension_info['display_name'], $dimension_info['scope'] );
				}
			}
		}

		/**
		 * Remove the unnecessary data from profile summary list.
		 *
		 * @since 2.2.5
		 */
		public function update_profile_list_summary_on_update() {
			if ( version_compare( ANALYTIFY_VERSION, get_option( 'WP_ANALYTIFY_PLUGIN_VERSION' ), '>' ) ) {
				$option = get_option( 'wp-analytify-profile' );

				if ( isset( $option['hide_profiles_list'] ) && $option['hide_profiles_list'] == 'on' ) {
					$accounts = get_option( 'profiles_list_summary' );

					if ( ! $accounts ) {
						return;
					}

					// Means that its run already.
					if ( is_array( $accounts ) ) {
						return;
					}

					update_option( 'profiles_list_summary_backup', $accounts, 'no' );

					$new_value['profile_for_dashboard'] = $option['profile_for_dashboard'];
					$new_value['profile_for_posts']     = $option['profile_for_posts'];

					$new_properties = array();

					foreach ( $accounts->getItems() as $account ) {
						foreach ( $account->getWebProperties() as  $property ) {
							foreach ( $property->getProfiles() as $profile ) {
								// Get Property ID i.e UA Code
								if ( $profile->getId() === $new_value['profile_for_dashboard'] ) {
									$new_properties[ $account->getId() ] = $property;
								}
								if ( $profile->getId() === $new_value['profile_for_posts'] ) {
									$new_properties[ $account->getId() ] = $property;
								}
							}
						}
					}

					update_option( 'profiles_list_summary', $new_properties );
				}
			}
		}

		/**
		 * Show Black Friday Deal Notice.
		 */
		public function bf_admin_notice() {
			if ( current_user_can( 'install_plugins' ) && ! class_exists( 'WP_Analytify_Pro' ) ) {
				global $current_user;
				$user_id = $current_user->ID;

				/* Check that the user hasn't already clicked to ignore the message */
				if ( ! get_user_meta( $user_id, 'analytify_ignore_bf_deal_1' ) ) {
					$message  = '<p> ';
					$message .= sprintf(
						__(
							'<strong>Biggest Black Friday Deal</strong> in the WordPress Analytics Universe! Everything is <strong>50%% OFF</strong> for <strong>Analytify</strong> [Limited Availability].<a href="https://analytify.io/in/thanks2018" target="_blank" style="text-decoration: none;"><span class="dashicons dashicons-smiley" style="margin-left: 10px;"></span> Grab The Deal</a>
						<a href="%1$s" style="text-decoration: none; margin-left: 10px;"><span class="dashicons dashicons-dismiss"></span> I\'m good with free version</a>'
						),
						admin_url( 'admin.php?page=analytify-dashboard&analytify_bf_nag_ignore_1=0' )
					);
					$message .= '</p>';
					$class    = 'wp-analytify-success';

					analytify_notice( $message, $class );
				}
			}
		}

		/**
		 * Remove Black Friday Deal Notice.
		 */
		public function bf_nag_ignore() {
			global $current_user;
			$user_id = $current_user->ID;

			/* If user clicks to ignore the notice, add that to their user meta */
			if ( isset( $_GET['analytify_bf_nag_ignore_1'] ) && '0' == $_GET['analytify_bf_nag_ignore_1'] ) {
				add_user_meta( $user_id, 'analytify_ignore_bf_deal_1', 'true', true );
			}
		}

		/**
		 * Show Winter Sale promo notice.
		 */
		public function winter_sale_promo() {
			if ( current_user_can( 'install_plugins' ) && ! class_exists( 'WP_Analytify_Pro' ) ) {
				global $current_user;
				$user_id = $current_user->ID;

				/* Check that the user hasn't already clicked to ignore the message */
				if ( ! get_user_meta( $user_id, 'analytify_ignore_winter_deal' ) ) {
					$message  = '<p> ';
					$message .= sprintf(
						__(
							'<strong>The Biggest New Year Deal</strong> in the WordPress Universe! Everything is <strong>50%% OFF</strong> for <strong>Analytify</strong> [Limited Availability].<a href="https://analytify.io/in/winter2019" target="_blank" style="text-decoration: none;"><span class="dashicons dashicons-smiley" style="margin-left: 10px;"></span> Grab The Deal</a>
						<a href="%1$s" style="text-decoration: none; margin-left: 10px;"><span class="dashicons dashicons-dismiss"></span> I\'m good with free version</a>'
						),
						admin_url( 'admin.php?page=analytify-dashboard&analytify_winter_nag_ignore=0' )
					);
					$message .= '</p>';
					$class    = 'wp-analytify-success';

					analytify_notice( $message, $class );
				}
			}
		}

		/**
		 * Dismiss Winter Sale promo notice.
		 */
		public function winter_sale_dismiss_notice() {
			global $current_user;
			$user_id = $current_user->ID;

			/* If user clicks to ignore the notice, add that to their user meta */
			if ( isset( $_GET['analytify_winter_nag_ignore'] ) && '0' == $_GET['analytify_winter_nag_ignore'] ) {
				add_user_meta( $user_id, 'analytify_ignore_winter_deal', 'true', true );
			}
		}

		/**
		 * Add rating icon on plugins page.
		 *
		 * @since 2.2.11
		 */
		public function add_rating_icon( $meta_fields, $file ) {
			if ( $file != 'wp-analytify/wp-analytify.php' ) {
				return $meta_fields;
			}

			echo '<style>.analytify-rate-stars { display: inline-block; color: #ffb900; position: relative; top: 3px; }.analytify-rate-stars svg{ fill:#ffb900; } .analytify-rate-stars svg:hover{ fill:#ffb900 } .analytify-rate-stars svg:hover ~ svg{ fill:none; } </style>';
			$plugin_url    = 'https://wordpress.org/support/plugin/wp-analytify/reviews/?rate=5#new-post';
			$meta_fields[] = "<a href='" . esc_url( $plugin_url ) . "' target='_blank' title='" . esc_html__( 'Rate', 'wp-analytify' ) . "'>
			<i class='analytify-rate-stars'>"
			. "<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-star'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>"
			. "<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-star'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>"
			. "<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-star'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>"
			. "<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-star'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>"
			. "<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-star'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>"
			. '</i></a>';

			return $meta_fields;
		}

		/**
		 * Register meta-box for excluding posts in tracking.
		 *
		 * @return void
		 */
		public function add_exclusion_meta_box() {
			global $current_screen;

			$allowed_posts_types = $GLOBALS['WP_ANALYTIFY']->settings->get_option( 'show_analytics_post_types_back_end', 'wp-analytify-admin', array() );

			// Prevent meta-box on post types that are not allowed.
			if ( ! in_array( $current_screen->post_type, $allowed_posts_types ) ) {
				return;
			}

			// Prevent meta-box on gutenberg editor. Gutenberg has seperate block based metabox.
			if ( WPANALYTIFY_Utils::is_gutenberg_editor() && post_type_supports( WPANALYTIFY_Utils::get_current_admin_post_type(), 'custom-fields' ) ) {
				return;
			}

			add_meta_box(
				'analytify-metabox',
				'Analytify Exclude Tracking',
				array( $this, 'print_exclusion_meta_box' ),
				null,
				'side',
				'high'
			);
		}

		/**
		 * Meta-box for excluding posts in tracking.
		 *
		 * @return void
		 */
		public function print_exclusion_meta_box( $post ) {
			if ( class_exists( 'WP_Analytify_Pro_Base' ) ) {
				do_action( 'analytify_pro_exclusion_meta_box' );
			} else {
				?>

				<div class="analytify-metabox-pro-badge">
					<span>
						<?php _e( 'This is a PRO feature.', 'wp-analytify' ); ?>
					</span>
					<div class="analytify-metabox-pro-badge-upgrade">
						<a href="<?php echo esc_url( 'https://analytify.io/pricing/?utm_source=analytify-lite&amp;utm_medium=blocks-settings&amp;utm_content=Blocks&amp;utm_campaign=pro-upgrade' ); ?>" target="_blank" rel="noopener">
							<?php _e( 'Upgrade to Analytify Pro', 'wp-analytify' ); ?>
						</a>
					</div>
				</div>

			<?php } ?>

			<?php
		}

		/**
		 * Init the compliance class.
		 *
		 * @return void
		 */
		public function init_gdpr_compliance() {
			new Analytify_GDPR_Compliance();
		}
	}
} // End if class_exists check

register_activation_hook( __FILE__, 'wp_analytify_activate' ); // active
register_deactivation_hook( __FILE__, 'wp_analytify_de_activate' ); // in-active
add_action( 'wp_wpb_sdk_after_uninstall',  'wp_analytify_uninstall' ); // delete

/**
 * Run on plugin activation.
 *
 * @since       1.2.2
 * @return      void
 */
function wp_analytify_activate() {

	// update version.
	if ( ! get_option( 'pa_google_token' ) ) {
		update_option( 'wpa_current_version', '2.1.2' );
	}

	// Return if settings already added in DB.
	$_admin_settings = get_option( 'wp-analytify-admin' );
	if ( $_admin_settings && 'on' === $_admin_settings['enable_back_end'] && ! empty( $_admin_settings['show_analytics_roles_back_end'] ) ) {
		return;
	}

	// Load default settings on new install.
	if ( ! get_option( 'analytify_default_settings' ) ) {
		$profile_tab_settings = array(
			'exclude_users_tracking' => array( 'administrator' ),
		);

		update_option( 'wp-analytify-profile', $profile_tab_settings );

		$admin_tab_settings = array(
			'enable_back_end'                   => 'on',
			'show_analytics_roles_back_end'      => array( 'administrator', 'editor' ),
			'show_analytics_post_types_back_end' => array( 'post', 'page' ),
			'show_panels_back_end'               => array( 'show-overall-dashboard', 'show-social-dashboard', 'show-geographic-dashboard', 'show-system-stats', 'show-keywords-dashboard', 'show-referrer-dashboard' ),
		);

		update_option( 'wp-analytify-admin', $admin_tab_settings );

		$dashboard_tab_settings['show_analytics_panels_dashboard'] = array(
			'show-real-time',
			'show-compare-stats',
			'show-overall-dashboard',
			'show-top-pages-dashboard',
			'show-geographic-dashboard',
			'show-system-stats',
			'show-keywords-dashboard',
			'show-social-dashboard',
			'show-referrer-dashboard',
			'show-page-stats-dashboard',
		);

		$dashboard_tab_settings['show_analytics_roles_dashboard'] = array( 'administrator' );

		update_option( 'wp-analytify-dashboard', $dashboard_tab_settings );

		$advanced_tab_settings = array(
			'gtag_tracking_mode'           => 'gtag',
			'google_analytics_version'     => 'ga4'
		);

		update_option( 'wp-analytify-advanced', $advanced_tab_settings );

		// Update meta so default settings load only one time.
		update_option( 'analytify_default_settings', 'done' );

		update_option( 'analytify_active_date', date( 'l jS F Y h:i:s A' ) . date_default_timezone_get() );
	}
}

/**
 * Delete option values on plugin deactivation.
 *
 * @since       1.2.2
 * @return      void
 */
function wp_analytify_de_activate() {
	// Delete welcome page check on de-activate.
	delete_option( 'show_welcome_page' );
}

/**
 * Delete plugin settings meta on deleting the plugin
 *
 * @return void
 */
function wp_analytify_uninstall() {

	require_once ANALYTIFY_PLUGIN_DIR . '/classes/analytify-utils.php';

	$remove_settings_on_uninstall  = WPANALYTIFY_Utils::get_option( 'uninstall_analytify_settings', 'wp-analytify-advanced', false );
	
	if( $remove_settings_on_uninstall && $remove_settings_on_uninstall === 'on' ) {

		require_once ANALYTIFY_PLUGIN_DIR . '/classes/analytify-factory-reset.php';

		// Remove all the settings on uninstall.
		( new Analytify_Factory_Reset )->remove_settings();
	}

}

/**
 * Send status of subscriber who opt-in for improving the product.
 *
 * @param string $email  users email.
 * @param string $status plugin status.
 */
function send_status_analytify( $email, $status ) {
	$url = 'https://analytify.io/plugin-manager/';

	if ( '' === $email ) {
		$email = 'track@analytify.io';
	}

	$fields = array(
		'email'  => $email,
		'site'   => get_site_url(),
		'status' => $status,
		'type'   => 'FREE',
	);

	wp_remote_post(
		$url,
		array(
			'method'      => 'POST',
			'timeout'     => 5,
			'httpversion' => '1.0',
			'blocking'    => false,
			'headers'     => array(),
			'body'        => $fields,
		)
	);
}


/**
 * Create instance of wp-analytify class.
 */
function analytify_free_instance() {
	$GLOBALS['WP_ANALYTIFY'] = WP_Analytify::get_instance();
}
add_action( 'plugins_loaded', 'analytify_free_instance', 10 );
