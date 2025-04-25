<?php

namespace WP_Defender\Component\Http\Remote_Address;

use WP_Defender\Component\Trusted_Proxy_Preset\Trusted_Proxy_Preset;
use WP_Defender\Traits\IP;

/**
 * Class Remote_Addr.
 *
 * Inspired from Laminas.
 *
 * @see https://github.com/laminas/laminas-http/blob/2.16.0/src/PhpEnvironment/RemoteAddress.php
 *
 * @package WP_Defender\Component\Http\Remote_Address
 */
class Remote_Address {
	use IP;

	/**
	 * Whether to use proxy addresses or not.
	 *
	 * As default this setting is disabled - IP address is mostly needed to increase
	 * security. HTTP_* are not reliable since can easily be spoofed. It can be enabled
	 * just for more flexibility, but if user uses proxy to connect to trusted services
	 * it's his/her own risk, only reliable field for IP address is $_SERVER['REMOTE_ADDR'].
	 *
	 * @var bool
	 */
	protected $use_proxy = false;

	/**
	 * List of trusted proxy IP addresses.
	 *
	 * @var array
	 */
	protected $trusted_proxies = [];

	/**
	 * HTTP header to introspect for proxies.
	 *
	 * @var string
	 */
	protected $proxy_header = 'HTTP_X_FORWARDED_FOR';

	/**
	 * The trusted proxy preset.
	 *
	 * @var string
	 */
	protected $trusted_proxy_preset = '';

	/**
	 * Changes proxy handling setting.
	 *
	 * This must be static method, since validators are recovered automatically
	 * at session read, so this is the only way to switch setting.
	 *
	 * @param  bool  $use_proxy Whether to check also proxied IP addresses.
	 * @return $this
	 */
	public function set_use_proxy( $use_proxy = true ): self {
		$this->use_proxy = $use_proxy;

		return $this;
	}

	/**
	 * Checks proxy handling setting.
	 *
	 * @return bool Current setting value.
	 */
	public function get_use_proxy(): bool {
		return $this->use_proxy;
	}

	/**
	 * Get the list of trusted proxy addresses.
	 *
	 * @since 4.6.0
	 * @return array
	 */
	public function get_trusted_proxies(): array {
		/**
		 * Filter the list of trusted proxies.
		 *
		 * @param array $trusted_proxies List of trusted proxy IP addresses or CIDR ranges.
		 * @since 4.6.0
		 */
		return (array) apply_filters( 'wpdef_firewall_trusted_proxies', $this->trusted_proxies );
	}

	/**
	 * Set list of trusted proxy addresses.
	 *
	 * @param  array $trusted_proxies
	 * @return $this
	 */
	public function set_trusted_proxies( array $trusted_proxies ): self {
		$this->trusted_proxies = $trusted_proxies;

		return $this;
	}

	/**
	 * Set the header to introspect for proxy IPs.
	 *
	 * @param  string $header
	 * @return $this
	 */
	public function set_proxy_header( $header = 'X-Forwarded-For' ): self {
		$this->proxy_header = $this->normalize_proxy_header( $header );

		return $this;
	}

	/**
	 * Set the trusted proxy preset.
	 *
	 * @param  string $trusted_proxy_preset
	 * @return $this
	 */
	public function set_trusted_proxy_preset( string $trusted_proxy_preset ): self {
		$this->trusted_proxy_preset = $trusted_proxy_preset;

		return $this;
	}

	/**
	 * Returns client IP address.
	 *
	 * @return string IP address.
	 */
	public function get_ip_address(): string {
		$ip = $this->get_ip_address_from_proxy();

		if ( $ip ) {
			return $ip;
		}

		// Direct IP address.
		if ( isset( $_SERVER['REMOTE_ADDR'] ) ) {
			return $_SERVER['REMOTE_ADDR'];
		}

		return '';
	}

	/**
	 * Attempt to get the IP address for a proxied client.
	 *
	 * @see http://tools.ietf.org/html/draft-ietf-appsawg-http-forwarded-10#section-5.2
	 *
	 * @return false|string
	 */
	protected function get_ip_address_from_proxy() {
		if ( ! $this->use_proxy ) {
			return false;
		}

		$header = $this->proxy_header;

		if ( ! isset( $_SERVER[ $header ] ) || empty( $_SERVER[ $header ] ) ) {
			return false;
		}

		$trusted_proxies = $this->get_trusted_proxies();

		// Extract IPs
		$ips = array_reverse( explode( ',', $_SERVER[ $header ] ) );
		foreach( $ips as $ip ) {
			// trim, so we can compare against trusted proxies properly
			$ip = trim( $ip );

			// Since we've removed any known, trusted proxy servers, the right-most
			// address represents the first IP we do not know about -- i.e., we do
			// not know if it is a proxy server, or a client. As such, we treat it
			// as the originating IP.
			// @see http://en.wikipedia.org/wiki/X-Forwarded-For
			foreach( $trusted_proxies as $trusted_proxy ) {
				if (
					( false !== strpos( $trusted_proxy, '/' ) && $this->compare_cidr( $ip, $trusted_proxy ) ) ||
					$trusted_proxy === $ip
				) {
					continue 2;
				}
			}

			if ( $this->is_ip_in_trusted_proxy_preset( $ip ) ) {
				continue;
			}


			return $ip;
		}

		return false;
	}

	/**
	 * Normalize a header string.
	 *
	 * Normalizes a header string to a format that is compatible with
	 * $_SERVER.
	 *
	 * @param  string $header
	 * @return string
	 */
	protected function normalize_proxy_header( $header ): string {
		$header = strtoupper( $header );
		$header = str_replace( '-', '_', $header );

		if ( 0 !== strpos( $header, 'HTTP_' ) ) {
			$header = 'HTTP_' . $header;
		}

		return $header;
	}

	/**
	 * Check if IP is in trusted proxy preset.
	 *
	 * @param string $ip
	 *
	 * @return bool
	 */
	public function is_ip_in_trusted_proxy_preset( string $ip ): bool {
		$trusted_ips = [];
		if ( ! empty( $this->trusted_proxy_preset ) ) {
			/**
			 * @var Trusted_Proxy_Preset $trusted_proxy_preset ;
			 */
			$trusted_proxy_preset = wd_di()->get( Trusted_Proxy_Preset::class );
			$trusted_proxy_preset->set_proxy_preset( $this->trusted_proxy_preset );
			$trusted_ips = $trusted_proxy_preset->get_ips();
		}

		if ( empty( $trusted_ips ) ) {
			return false;
		}

		foreach ( $trusted_ips as $trusted_ip ) {
			if (
				( false !== strpos( $trusted_ip, '/' ) && $this->compare_cidr( $ip, $trusted_ip ) ) ||
				$trusted_ip === $ip
			) {
				return true;
			}
		}

		return false;
	}
}
