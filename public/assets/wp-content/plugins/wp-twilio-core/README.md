# WP Twilio Core

WP SMS TWILIO helps to integrate SMS capability to your WordPress website using the most advanced Twilio API. 

How does it work?
-

The plugin includes functionality to directly send a text message (SMS) to any permissible number from the plugin settings page. You can use it to send BULK SMS to any user role of your website, or to all the users.It's an excelent marketing approach.

The plugin also allows WordPress Users/Developers to extend its settings and functionality and integrate it into any type of site. For example, it can easily be extended to send a text message on virtually any WordPress action.

Here's a list of what the plugin provides out of the box:


* Custom function to easily send SMS messages to any number (including international ones)
* Functionality to directly send a text message to any permissible number from the plugin settings page
* Send Bulk SMS to all the users of the website or to a user role.
* Enable sending SMS notifications to the admin or any number about any activity on the website (New comment,New Post,..)
* Hooks to add additional tabs on the plugin settings page to allow managing all SMS related settings from the same page
* Basic logging capability to keep track of up to 100 entries
* Mobile Phone User Field added to each profile (optional)
* Shorten URLs using Bit.ly or Google URL Shortener API (optional)


<h3>twl_send_sms( $args )</h3>
<p>Sends a standard text message from your Twilio Number when arguments are passed in an array format. Description of each array key is given below.</p>

Array Key | Type | Description
------------- | ------------- | ----
number_to | string | The mobile number that will be texted. Must be formatted as country code + 10-digit number (i.e. +13362522164).
message | string | The message that will be sent to the recipient.
number_from *(optional)* | string | Override the Twilio Number from settings. Must be associated with Account SID and Auth Token
account_sid *(optional)* | string | Override the Twilio Account SID from settings. Must be associated with Twilio number and Auth Token.
auth_token *(optional)* | string | Override the Auth Token from settings. Must be associated with Twilio number and Account SID.
logging *(optional)* | integer (1 or 0) | Override the logging option set from the settings page. Requires the digit '1' to enable.
url_shorten *(optional)* | integer (1 or 0) | Override the Goo.gl URL shortening option set from the settings page. Requires the digit '1' to enable.
url_shorten_bitly *(optional)* | integer (1 or 0) | Override the Bit.ly URL shortening option set from the settings page. Requires the digit '1' to enable.

Returns an array with response from Twilio's servers on success of a *WP_Error* object on failure.

<h5>Example</h5>

```php
$args = array( 
	'number_to' => '+13362522164',
	'message' => 'Hello Programmer!',
); 
twl_send_sms( $args );	
```

<h3>Extending the Settings page</h3>
<p>It is very easy to add your own tab to the plugin settings page. Please see the example below:</p>

```php
// Registering a new tab name
function add_new_settings_tab( $tabs ) {
	$tabs['my_shop'] = 'My Shop';
	return $tabs;
}
add_filter( 'twl_settings_tabs', 'add_new_settings_tab' );

// Adding form to that new tab
function add_my_shop_tab_content( $tab, $page_url ) {
	if( $tab != 'my_shop' ) {
		return;
	} 
	// Add my settings form here!
}
add_action( 'twl_display_tab', 'add_my_shop_tab_content', 10, 2 );
```
<h5>Contributors</h5>
Feel free to send pull requests. They are always welcome!
	
<h5>Copyright</h5>
[WP Twilio Core](https://wpsms.io/) plugin created by [WP SMS](https://wpsms.io). It is also available at the [WordPress Plugins repository](https://wordpress.org/plugins/wp-twilio-core/). For custom integration with your WordPress website, please [contact us here](https://wpsms.io/).

Disclaimer: This plugin is not affiliated with or supported by Twilio, Inc. All logos and trademarks are the property of their respective owners.
