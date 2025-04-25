<?php

ob_start();
class Analytify_Email_Core
{

	private $WP_ANALYTIFY = '';

	function __construct()
	{
		if (!$this->verify_update())
			return;

		$this->WP_ANALYTIFY = $GLOBALS['WP_ANALYTIFY'];

		$this->setup_constants();
		$this->anaytify_email_check_time();
		$this->hooks();

		if (isset($_POST['test_email'])) {
			$this->callback_on_cron_time();
			add_action('admin_notices', array($this, 'analytify_email_notics'));
		}
	}

	function hooks()
	{
		add_action('admin_enqueue_scripts', array($this, 'analytify_email_scripts'));
		// add_action( 'analyitfy_email_setting_submenu', array( $this, 'email_submenu' ), 25 );
		add_action('analytify_email_cron_function', array($this, 'callback_on_cron_time'));
		add_action('wp_analytify_pro_setting_tabs', array($this, 'analytify_email_setting_tabs'), 20, 1);
		add_filter('wp_analytify_pro_setting_fields', array($this, 'analytifye_email_setting_fields'), 20, 1);
		add_action('after_single_view_stats_buttons', array($this, 'single_send_email'));
		add_action('wp_ajax_send_analytics_email', array($this, 'send_analytics_email'));
		add_action('analytify_settings_logs', array($this, 'analytify_settings_logs'));
	}

	/**
	 * Enqueue Scripts
	 *
	 * @since 1.0
	 */
	function analytify_email_scripts()
	{
		wp_enqueue_script('analytify_email_script', ANALYTIFY_PLUGIN_URL . 'assets/js/wp-analytify-email.js', array(), ANALYTIFY_VERSION, 'true');
	}

	// /**
	//  * Add email reporting submenu.
	//  *
	//  * @since 1.0
	//  */
	// function email_submenu() {
	// 	add_submenu_page( 'analytify-dashboard', ANALYTIFY_NICK . esc_html__( 'Email Notifications', 'wp-analytify' ), esc_html__( 'Email Notifications', 'wp-analytify' ), 'manage_options', 'analytify-settings#wp-analytify-email', array( $this, 'analytify_email_setting' ) );
	// }

	function analytify_email_setting()
	{
	}

	/**
	 * Setup plugin constants
	 *
	 * @access      private
	 * @since       1.0.0
	 * @return      void
	 */
	private function setup_constants()
	{
		// Setting Global Values
		$this->define('ANALYTIFY_IMAGES_PATH', "https://analytify.io/assets/email/");
	}

	/**
	 * Define constant if not already set
	 * @param  string $name
	 * @param  string|bool $value
	 */
	private function define($name, $value)
	{
		if (!defined($name)) {
			define($name, $value);
		}
	}

	function anaytify_email_check_time()
	{
		// Check if event is scheduled before.
		if (!wp_next_scheduled('analytify_email_cron_function')) {
			wp_schedule_event(time(), 'daily', 'analytify_email_cron_function');
		}
	}

	function analytify_email_setting_tabs($old_tabs)
	{
		$pro_tabs = array(
			array(
				'id'       => 'wp-analytify-email',
				'title'    => __('Email', 'wp-analytify'),
				'priority' => '32',
			),
		);

		return array_merge($old_tabs, $pro_tabs);
	}

	function  analytify_email_notics()
	{
		$email_options= get_option('wp-analytify-email');

		if($email_options['disable_email_reports'] == 'on'){
			$class   = 'wp-analytify-danger';
			$message = esc_html('Analytify email reports and test emails disabled.');
		}else{
			$class   = 'wp-analytify-success';
			$message = esc_html('Analytify detailed report sent!', 'wp-analytify-email');
		}


		analytify_notice($message, $class);
	}

	function custom_phpmailer_init($PHPMailer)
	{
		$PHPMailer->IsSMTP();
		$PHPMailer->SMTPAuth = true;
		$PHPMailer->SMTPSecure = 'ssl';
		$PHPMailer->Host = 'smtp.gmail.com';
		$PHPMailer->Port = 465;
		$PHPMailer->Username = 'test@gmail.com';
		$PHPMailer->Password = '';
	}

	function analytifye_email_setting_fields($old_fields)
	{
		$email_fields = array(
			'wp-analytify-email' => array(
				array(
					'name'  => 'disable_email_reports',
					'label' => __('Disable Email Reporting', 'wp-analytify'),
					'desc'  => __('This option will stop sending all email reports, including test emails.', 'wp-analytify'),
					'type'  => 'checkbox',
				),
				array(
					'name'              => 'analytiy_from_email',
					'label'             => __('Sender Email Address', 'wp-analytify'),
					'desc'              => __('Sender Email Address.', 'wp-analytify'),
					'type'              => 'text',
					'default'           => '',
					'sanitize_callback' => 'sanitize_email',
					'tooltip' => false
				),
				array(
					'name'              => 'analytify_email_user_email',
					'label'             => __('Receiver Email Address', 'wp-analytify'),
					'desc'              => __(''),
					'default'           => '',
					'type'              => 'email_receivers',
				),
			),
		);

		if (!class_exists('WP_Analytify_Email')) {
			array_push($email_fields['wp-analytify-email'], array(
				'name'              => 'analytify_email_promo',
				'type'              => 'email_promo',
				'label'             => '',
				'desc'              => '',
			));
		}

		return array_merge($old_fields, $email_fields);
	}

	function callback_on_cron_time()
	{
		// Return if no profile selected.
		$profile = $GLOBALS['WP_ANALYTIFY']->settings->get_option('profile_for_dashboard', 'wp-analytify-profile');
		if (empty($profile)) {
			return;
		}

		// Return if reports are off.
		$disable_emails = $this->WP_ANALYTIFY->settings->get_option('disable_email_reports', 'wp-analytify-email');
		if ('on' == $disable_emails) {
			return;
		}

		// stop TranslatePress to translate the emails.
		add_filter('trp_stop_translating_page', '__return_true');

		$wp_analytify = $GLOBALS['WP_ANALYTIFY'];
		$site_url = site_url();
		$when_to_send_report = $this->when_to_send_report();

		foreach ($when_to_send_report as $when) {
			if ($when == 'week') {
				$start_date_val = strtotime('-1 week');
				$report_of = 'Weekly';
			} else {
				$start_date_val = strtotime('-1 month');
				$report_of = 'Monthly';
			}

			$end_date_val        = strtotime('now');
			$start_date          = date('Y-m-d', $start_date_val);
			$end_date            = date('Y-m-d', $end_date_val);

			$date1               = date_create($start_date);
			$date2               = date_create($end_date);
			$diff                = date_diff($date2, $date1);
			$different           = $diff->format("%a") . ' ' . analytify__('days', 'wp-analytify');

			$compare_start_date  = strtotime($start_date . $diff->format("%R%a days"));
			$compare_start_date  = date('Y-m-d', $compare_start_date);
			$compare_end_date 	 = $start_date;

			$_logo_id  = $wp_analytify->settings->get_option('analytify_email_logo', 'wp-analytify-email');

			if ($_logo_id) {
				$_logo_link_array =  wp_get_attachment_image_src($_logo_id, array(150, 150));
				$logo_link = $_logo_link_array[0];
			} else {
				$logo_link = ANALYTIFY_IMAGES_PATH . "logo.png";
			}

			$emails = $wp_analytify->settings->get_option('analytify_email_user_email', 'wp-analytify-email');
			$emails_array = [];

			if (!empty($emails)) {
				if (!is_array($emails)) {
					$emails_array = explode(',', $emails);
				} else {
					$emails_array = $emails;
				}
			}

			$subject = $wp_analytify->settings->get_option('analytify_email_subject', 'wp-analytify-email');

			if (!$subject) {
				$protocols = array('https://', 'https://www', 'http://', 'http://www.', 'www.');
				$site_url = str_replace($protocols, '', get_home_url());

				if ($when == 'week') {
					$subject = __('Weekly Engagement Summary of ' . $site_url, 'wp-analytify');
				} elseif ($when == 'month') {
					$subject = __('Monthly Engagement Summary of ' . $site_url, 'wp-analytify');
				}
			}

			$_from_name  = $wp_analytify->settings->get_option('analytiy_from_name', 'wp-analytify-email');
			$_from_name  = !empty($_from_name) ? $_from_name : 'Analytify Notifications';
			$_from_email = $wp_analytify->settings->get_option('analytiy_from_email', 'wp-analytify-email');
			$_from_email = !empty($_from_email) ? $_from_email : 'no-reply@analytify.io';

			foreach ($emails_array as $email_group) {
				if (is_array($email_group)) {
					$email_group_name = trim($email_group['name']);
					$name = !empty($email_group_name) ? ' ' . esc_html($email_group_name) : '';
					$email_address = sanitize_email($email_group['email']);
				} else {
					$name = '';
					$email_address = sanitize_email($email_group);
				}

				$headers = array(
					'From: ' . $_from_name . ' <' . $_from_email . '>',
					//'To: '. $email_address,
					'Content-Type: text/html; charset=UTF-8'
				);

				$message = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
				<html xmlns="http://www.w3.org/1999/xhtml">
				<head>
					<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="x-apple-disable-message-reformatting" />
					<title>Analytify</title>
					<meta name="color-scheme" content="light dark">
					<meta name="supported-color-schemes" content="light dark"> 
					<link href="http://fonts.googleapis.com/css?family=Roboto%7cRoboto+Slab:400,500" rel="stylesheet" />
					<style type="text/css">
						@media screen and (max-width: 620px) {
							.main-table {
								width: 100% !important;
								padding-left: 20px !important;
								padding-right: 20px !important;
							}
						}

						@media screen and (max-width: 560px) {
							.box-table>tbody>tr>td {
								width: 100% !important;
								display: block !important;
								margin-bottom: 10px !important;
							}

							.session-table>table {
								display: block !important;
								width: 100% !important;
							}

							.session-table>table>tbody {
								display: block !important;
								width: 100% !important;
							}

							.session-table>table>tbody>tr {
								display: block !important;
								width: 96% !important;
								margin: 10px 2% 10px !important;
							}

							.os-table>td,
							.keywords-table>td {
								display: block;
								width: 100% !important;
							}

							.geographic-table>tbody>tr>td {
								display: block !important;
								width: 100% !important;
							}

							.user-data>table>tbody>tr>td {
								padding: 10px !important;
							}

							.mobile-hide {
								display: none !important;
							}

							.main-table>tbody>tr>td {
								padding: 10px !important;
							}

							.user-data>table>tbody>tr>td img {
								margin-left: 0 !important;
							}
						}
						@media (prefers-color-scheme: dark ) {
							body, [bgcolor="#ffffff"],[bgcolor="#f5f9ff"],[bgcolor="#f9fafa"], [bgcolor="#f3f7fa"], .session-table, .session-table tr td{
								background-color: #000 !important;
							}
							table[bgcolor="#f9fafa"]>tbody>tr>td, .os-table td,.geographic-table{
								background-color: #000000 !important;
							}
							.session-table tr td{
								border-color: #fff !important; 
								color: #fff !important;
							}
							table tbody td [color="#444"],
							table tbody td [color="#444444"],
							table tbody td [color="#848484"],
							table tbody td [color="#909090"]{
								color: #fff !important;
							}
							table tbody td hr{
								border-top:1px solid #fff !important;
							}
						} 
					</style>
				</head>

				<body style="margin: 0;padding: 0; background: #f3f7fa; " bgcolor="#f3f7fa">
				<table cellpadding="0" cellspacing="0" border="0" width="100%" align="center" bgcolor="#f3f7fa">
					
					<tr>
						<td valign="top" style="padding-bottom:95px">
							<table cellpadding="0" cellspacing="0" border="0" width="600" align="center" class="main-table">
							
								<tr>
									<td style="padding: 22px 35px;">
										<table width="100%" cellpadding="0" cellspacing="0" align="center">
											<tr>
												<td align="left"><a href="' . $site_url . '"><img src="' . $logo_link . '" alt="analytify"/></a></td>
												<td align="right" style="font: normal 15px \'Roboto\', Arial, Helvetica, sans-serif; line-height: 1.5;">
												<font color="#444444">' . $report_of . __(' Report', 'wp-analytify') . '</font><br>
												<font color="#848484">' . date('M d Y', $start_date_val) . ' - ' . date('M d Y', $end_date_val) . '</font><br />
												<font color="#848484"><a href="' . get_home_url() . '">' . get_home_url() . '</a></font>
												</td>
											</tr>
										</table>
									</td>
								</tr>	

								<tr>
						<td style="padding: 0 15px;">
										<table width="100%" cellpadding="0" cellspacing="0" align="center">
											<tr>
												<td valign="top">
													<table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#ffffff">
														<tr>
															<td	style="font: 400 18px \'Roboto slab\', Arial, Helvetica, sans-serif; padding: 25px 20px 11px 20px;">
																<font color="#444444">' . analytify__('Hi') . $name . ',</font>
															</td>
														</tr>
														<tr>
															<td	style="font: normal 14px \'Roboto\', Arial, Helvetica, sans-serif; padding: 0px 20px 0px 20px;">
																<font color="#848484">' . apply_filters('analytify_custom_email_message',analytify__('Please find below your Google Analytics report for the noted period.')) . '</font>
															</td>
														</tr>
													</table>
												</td>
											</tr>';

				$selected_stats = !empty($wp_analytify->settings->get_option('analytify_email_stats', 'wp-analytify-email')) ? $wp_analytify->settings->get_option('analytify_email_stats', 'wp-analytify-email') : array('show-overall-general');

				// General Stats.
				if (is_array($selected_stats) && in_array('show-overall-general', $selected_stats, true)) {

					if (method_exists('WPANALYTIFY_Utils', 'get_ga_mode') && 'ga4' === WPANALYTIFY_Utils::get_ga_mode()) {

						$stats = $wp_analytify->get_reports('analytify-email-general-stats', array(
							'sessions',
							'totalUsers',
							'bounceRate',
							'screenPageViewsPerSession',
							'screenPageViews',
							'engagedSessions',
							'newUsers',
							'averageSessionDuration',
							'userEngagementDuration',
						), array(
							'start' => $start_date,
							'end' => $end_date,
						), array(
							'date',
						), array(
							'type'  => 'dimension',
							'order' => 'desc',
							'name'  => 'date',
						), array());

						$old_stats = $wp_analytify->get_reports('analytify-email-general-compare-stats', array(
							'sessions',
							'totalUsers',
							'bounceRate',
							'screenPageViewsPerSession',
							'screenPageViews',
							'engagedSessions',
							'newUsers',
							'averageSessionDuration',
							'userEngagementDuration',
						), array(
							'start' => $compare_start_date,
							'end' => $compare_end_date,
						), array(
							'date',
						), array(
							'type'  => 'dimension',
							'order' => 'desc',
							'name'  => 'date',
						), array());

						if (!function_exists('pa_email_include_general')) {
							include ANALYTIFY_ROOT_PATH . '/views/email/general-stats.php';
						}

						$message .= pa_email_include_general($wp_analytify, $stats, $old_stats, $different);
					}

				}

				$dates = array('start_date' => $start_date, 'end_date' => $end_date);

				// Get pro settings options.
				$message = apply_filters('wp_analytify_email_on_cron_time', $message, $selected_stats, $dates);

				$message .= '
																</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</body>
							</html>';

				wp_mail($email_address, $subject, $message, $headers);
			}
		}
	}

	function when_to_send_report()
	{
		$when_to_send_email = array();

		// Return true, if test button trigger.
		if (isset($_POST['test_email'])) {
			if (class_exists('WP_Analytify_Email')) {
				$when_to_send_email[] = 'month';
			} else {
				$when_to_send_email[] = 'week';
			}

			return $when_to_send_email;
		}

		if (class_exists('WP_Analytify_Email')) {
			$time_settings = $GLOBALS['WP_ANALYTIFY']->settings->get_option('analytif_email_cron_time', 'wp-analytify-email');
			$week_date  = $time_settings['week'];
			$month_date = $time_settings['month'];
		} else {
			$week_date  = 'Monday';
			$month_date = false;
		}

		$current_day       = date('l'); // Sunday through Saturday.
		$current_date      = date('j'); // Day of the month without leading zeros.
		$last_day_of_month = date('t'); // Number of days in the given month.

		if ($week_date == $current_day) {
			$when_to_send_email[] = 'week';
		}

		// if last date of month
		if ($month_date == $last_day_of_month) {
			$when_to_send_email[] = 'month';
		} elseif ($month_date == $current_date) {
			$when_to_send_email[] = 'month';
		}

		return $when_to_send_email;
	}

	/**
	 * Show Send Email button on Single Page/Post.
	 *
	 * @since 1.2.0
	 */
	function single_send_email() {
		echo '<div class="analytify-single-mail-submit">
  		<input type="submit" value="' . __( 'Send Email', 'wp-analytify' ) . '" name="send_email" class="analytify_submit_date_btn"  id="send_single_analytics">';
    
		if (apply_filters('wpa_display_email_single_input_field', $display = false)){
			echo '<input type="email" name="recipient_email" placeholder="' . esc_attr__( 'Enter Recipient Email', 'wp-analytify' ) . '" id="recipient_email" style="min-height: 46px; min-width: 250px;">';
		}

  	echo '<span style=\'min-height:30px;min-width:150px;display:none\' class=\'send_email stats_loading\'></span></div>';
	}
	/**
	 * Send Email Stats for Single Page/Post
	 *
	 * @since 1.2.0
	 */
	function send_analytics_email()
	{

		$nonce = isset( $_POST['nonce'] ) ? $_POST['nonce'] : '';
		$recipient_email = isset($_POST['recipient_email']) ? sanitize_email($_POST['recipient_email']) : '';
		$is_access_level = $this->WP_ANALYTIFY->settings->get_option( 'show_analytics_roles_back_end', 'wp-analytify-admin', array( 'administrator' ) );

		$is_access_level = (bool) $this->WP_ANALYTIFY->pa_check_roles($is_access_level);

		if (!wp_verify_nonce($nonce, 'analytify-single-post-email') || !$is_access_level) {
			wp_die('Sorry, you are not allowed to do that.', 403);
		}

		$start_date = sanitize_text_field(wp_unslash($_POST['start_date']));
		$end_date   = sanitize_text_field(wp_unslash($_POST['end_date']));
		$post_id    = sanitize_text_field(wp_unslash($_POST['post_id']));
		$site_url   = site_url();

		if (0 === $post_id) {
			$u_post = '/'; // $url_post['path'];
		} else {
			$u_post = parse_url(get_permalink($post_id));
		}

		if ('localhost' == $u_post['host']) {
			$filter = 'ga:pagePath==/'; // .$u_post['path'];
		} else {
			$filter = 'ga:pagePath==' . $u_post['path'] . '';
			// $filter = 'ga:pagePath==' . $u_post['host'] . '/';
			$filter = apply_filters('analytify_page_path_filter', $filter, $u_post);
			// Url have query string incase of WPML.
			if (isset($u_post['query'])) {
				$filter .= '?' . $u_post['query'];
			}
		}


		if ('' == $start_date) {

			$s_date = get_the_time('Y-m-d', $post->ID);
			if (get_the_time('Y', $post->ID) < 2005) {
				$s_date = '2005-01-01';
			}
		} else {
			$s_date = $start_date;
		}

		if ('' == $end_date) {
			$e_date = date('Y-m-d');
		} else {
			$e_date = $end_date;
		}
		$search_console_stats = $this->WP_ANALYTIFY->get_search_console_stats('post_' . $post_id, array('start' => $start_date, 'end' => $end_date));
		$total_clicks = 0;
		$total_impressions = 0;
		$total_ctrs = 0;
		if (isset($search_console_stats['response']['rows']) && count($search_console_stats['response']['rows']) > 0) {
			foreach ($search_console_stats['response']['rows'] as $row) {
				$total_clicks += $row['clicks'];
				$total_impressions += $row['impressions'];
			}
		}

		if ($total_impressions > 0) {
			$total_ctrs = round(($total_clicks / $total_impressions) * 100);
		} else {
			$total_ctrs = 0;
		}

		$wp_analytify = $GLOBALS['WP_ANALYTIFY'];

		$_logo_id  = $wp_analytify->settings->get_option('analytify_email_logo', 'wp-analytify-email');
		if ($_logo_id) {
			$_logo_link_array =  wp_get_attachment_image_src($_logo_id, array(150, 150));
			$logo_link = $_logo_link_array[0];
		} else {
			$logo_link = ANALYTIFY_IMAGES_PATH . "logo.png";
		}

		if ( $recipient_email ) {
			$emails_array = array( $recipient_email );
		} else {
			$emails = $wp_analytify->settings->get_option( 'analytify_email_user_email','wp-analytify-email' );
			if (!empty($emails)) {
				if (!is_array($emails)) {
					$emails_array = explode( ',' , $emails );
				} else {
					$emails_array = $emails;
				}
			}
		}

		$subject = 'Analytics for ' . get_the_title($post_id);

		$_from_name  = $wp_analytify->settings->get_option('analytiy_from_name', 'wp-analytify-email');
		$_from_name  = !empty($_from_name) ? $_from_name : 'Analytify Notifications';

		$_from_email = $wp_analytify->settings->get_option('analytiy_from_email', 'wp-analytify-email');
		$_from_email = !empty($_from_email) ? $_from_email : 'no-reply@analytify.io';

		foreach ($emails_array as $email_group) {

			if (is_array($email_group)) {
				$email_group_name = trim($email_group['name']);
				$name = !empty($email_group_name) ? ' ' . esc_html($email_group_name) : '';
				$email_address = sanitize_email($email_group['email']);
			} else {
				$name = '';
				$email_address = sanitize_email($email_group);
				$name = ucwords(strstr($email_address, '@', true));
			}

			$headers = array(
				'From: ' . $_from_name . ' <' . $_from_email . '>',
				//'To: '. $email_address,
				'Content-Type: text/html; charset=UTF-8'
			);
			$message = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Analytify</title>
				<link href="http://fonts.googleapis.com/css?family=Roboto%7cRoboto+Slab:400,500" rel="stylesheet" />
				<style type="text/css">
					@media screen and (max-width: 620px) {
						.main-table {
							width: 100% !important;
						}
					}

					@media screen and (max-width: 560px) {
						.box-table>tbody>tr>td {
							width: 100% !important;
							display: block !important;
							margin-bottom: 10px !important;
						}

						.session-table>table {
							display: block !important;
							width: 100% !important;
						}

						.session-table>table>tbody {
							display: block !important;
							width: 100% !important;
						}

						.session-table>table>tbody>tr {
							display: block !important;
							width: 96% !important;
							margin: 10px 2% 10px !important;
						}

						.os-table>td,
						.keywords-table>td {
							display: block;
							width: 100% !important;
						}

						.geographic-table>tbody>tr>td {
							display: block !important;
							width: 100% !important;
						}

						.user-data>table>tbody>tr>td {
							padding: 10px !important;
						}

						.mobile-hide {
							display: none !important;
						}

						.main-table>tbody>tr>td {
							padding: 10px !important;
						}

						.user-data>table>tbody>tr>td img {
							margin-left: 0 !important;
						}
					}
						
						@media (prefers-color-scheme: dark ) {
							body, [bgcolor="#ffffff"],[bgcolor="#f5f9ff"],[bgcolor="#f9fafa"], [bgcolor="#f3f7fa"], .session-table, .session-table tr td{
								background-color: #000 !important;
							}
							table[bgcolor="#f9fafa"]>tbody>tr>td, .os-table td,.geographic-table{
								background-color: #000000 !important;
							}
							.session-table tr td{
								border-color: #fff !important; 
								color: #fff !important;
							}
							table tbody td [color="#444"],
							table tbody td [color="#444444"],
							table tbody td [color="#848484"],
							table tbody td [color="#909090"]{
								color: #fff !important;
							}
							table tbody td hr{
								border-top:1px solid #fff !important;
							}
						} 
				</style>
			</head>

			<body style="margin: 0;padding: 0; background: #f3f7fa; " bgcolor="#f3f7fa">
			<table cellpadding="0" cellspacing="0" border="0" width="100%" align="center" bgcolor="#f3f7fa">
				
				<tr>
					<td valign="top" style="padding-bottom:95px">
						<table cellpadding="0" cellspacing="0" border="0" width="600" align="center" class="main-table">
						
							<tr>
								<td style="padding: 22px 35px;">
									<table width="100%" cellpadding="0" cellspacing="0" align="center">
										<tr>
											<td align="left"><a href="' . $site_url . '"><img src="' . $logo_link . '" alt="analytify"/></a></td>
											<td align="right" style="font: normal 15px \'Roboto\', Arial, Helvetica, sans-serif; line-height: 1.5;">
											<font color="#444444">' . __('Analytics Report', 'wp-analytify') . '</font><br>
											<font color="#848484">' . $s_date . ' - ' . $e_date . '</font><br />
											<font color="#848484"><a href="' . get_permalink($post_id) . '">' . get_the_title($post_id) . '</a></font>
											</td>
										</tr>
									</table>
								</td>
							</tr>	

							<tr>
            		<td style="padding: 0 15px;">
									<table width="100%" cellpadding="0" cellspacing="0" align="center">
									
										<tr>
											<td valign="top">
												<table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#ffffff">
													<tr>
														<td	style="font: 400 18px \'Roboto slab\', Arial, Helvetica, sans-serif; padding: 25px 20px 11px 20px;">
															<font color="#444444">Hi '.$name.',</font>
														</td>
													</tr>
													<tr>
													<td style="font: normal 14px \'Roboto\', Arial, Helvetica, sans-serif; padding: 0px 20px 20px 20px;">
														<font color="#848484">Analytify helped you find out your ' . ($total_impressions ?? '0') . ' site visits, and ' . ($total_clicks ?? '0') . ' clicks with an average CTR of ' . ($total_ctrs ?? '0') . '% from ' . wp_date('jS F Y', strtotime($start_date)) . ' to ' . wp_date('jS F Y', strtotime($end_date)) . '.</font>
													</td>
												</tr>
												</table>
											</td>
										</tr>';
			$selected_stats = !empty($wp_analytify->settings->get_option('analytify_email_stats', 'wp-analytify-email')) ? $wp_analytify->settings->get_option('analytify_email_stats', 'wp-analytify-email') : array('show-overall-general');

			// General Stats.
			if (is_array($selected_stats) &&  in_array('show-overall-general', $selected_stats)) {

				if (method_exists('WPANALYTIFY_Utils', 'get_ga_mode') && 'ga4' === WPANALYTIFY_Utils::get_ga_mode()) {

					$report_obj = new Analytify_Report(
						array(
							'dashboard_type' => 'single_post',
							'start_date'     => $s_date,
							'end_date'       => $e_date,
							'post_id'        => $post_id,
						)
					);

					$stats = $report_obj->get_general_stats();

					if (!function_exists('pa_email_include_general')) {
						include ANALYTIFY_ROOT_PATH . '/views/email/general-stats-single.php';
					}

					$message .= pa_email_include_single_general($wp_analytify, $stats['boxes'], false, false, $stats['total_time_spent']);
				} else {
					$report_obj = new Analytify_Report(
						array(
							'dashboard_type' => 'single_post',
							'start_date'     => $s_date,
							'end_date'       => $e_date,
							'post_id'        => $post_id,
						)
					);

					$stats = $report_obj->get_general_stats();

					if (!function_exists('pa_email_include_general')) {
						include ANALYTIFY_ROOT_PATH . '/views/email/general-stats-single.php';
					}

					$message .= pa_email_include_single_general($wp_analytify, $stats['boxes'], false, false, false);
				}
			}

			$dates = array('start_date' => $start_date, 'end_date' => $end_date);

			// Get pro settings options.
			$message = apply_filters('wp_analytify_single_email', $message, $selected_stats, $dates);

			$message .= '			</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</body>
					</html>';

			wp_mail($email_address, $subject, $message, $headers);
		}

		wp_die();
	}

	/**
	 * Add email settings in diagnostic information.
	 *
	 */
	function analytify_settings_logs()
	{

		echo "\r\n";

		echo "-- Analytify Email Setting --\r\n \r\n";

		$analytify_email = get_option('wp-analytify-email');

		WPANALYTIFY_Utils::print_settings_array($analytify_email);
	}

	/**
	 * Verify email addon.
	 * Check if eamil addon is already present and is perior to latest split functionality version.
	 * 
	 * @return bool
	 */
	function verify_update()
	{
		if (defined('ANALTYIFY_EMAIL_VERSION') && '1.2.8' >= ANALTYIFY_EMAIL_VERSION) {
			return false;
		}

		return true;
	}
}

/**
 * Sanitize users email addresses.
 *
 * @param string $str
 * @return string
 */
function sanitize_multi_email($str)
{

	if (is_object($str) || is_array($str)) {
		return '';
	}

	$str = (string) $str;

	$filtered = wp_check_invalid_utf8($str);

	if (!$keep_newlines) {
		$filtered = preg_replace('/[\r\n\t ]+/', ' ', $filtered);
	}

	$filtered = trim($filtered);

	$found = false;

	while (preg_match('/%[a-f0-9]{2}/i', $filtered, $match)) {
		$filtered = str_replace($match[0], '', $filtered);
		$found    = true;
	}

	if ($found) {
		// Strip out the whitespace that may now exist after removing the octets.
		$filtered = trim(preg_replace('/ +/', ' ', $filtered));
	}

	return $filtered;
}

/**
 * Init email reports.
 * 
 * @since 3.1.0
 * @return null
 */
function init_analytify_email()
{
	new Analytify_Email_Core();
}

add_action('init', 'init_analytify_email');

ob_end_flush();
