<?php
class Analytify_Update_Routine {

	private $current_version = '';

	/**
	 * Private constructor for singleton class.
	 * 
	 */
	public function __construct( $current_version ) {
		$this->current_version = $current_version;
		$this->run_routines();
	}

	/**
	 * Run update routines.
	 * This will run all preceding update routine than current version if required.
	 *
	 * @return void
	 */
	private function run_routines() {

		if ( version_compare( $this->current_version, '4.1.1', '<' ) ) {
			$this->update_routine_411();
		}

		// Update version to latest release.
		update_option( 'analytify_current_version', ANALYTIFY_VERSION );
	}

	/**
	 * Update routine for version 4.1.1
	 *
	 * @return void
	 */
	private function update_routine_411() {
		update_option( 'analytify_gtag_move_to_notice', 'visible' );
	}
}

// Get current plugin version.
$analytify_current_version = get_option( 'analytify_current_version', '4.1.0' );

// Upcoming version on which routine will run.
$run_routine_ver = '4.1.1';

// Call update routine.
if ( version_compare( $analytify_current_version, $run_routine_ver, '<' ) ) {

	// Note: Analytify_Update_Routine will run all updates preceding the version in $run_routine_ver.
	new Analytify_Update_Routine( $analytify_current_version );
}
