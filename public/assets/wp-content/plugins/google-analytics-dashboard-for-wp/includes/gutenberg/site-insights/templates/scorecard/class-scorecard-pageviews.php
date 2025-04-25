<?php
/**
 * Class that handles the output for the Sessions scorecard.
 *
 * Class ExactMetrics_SiteInsights_Template_Scorecard_Pageviews
 */
class ExactMetrics_SiteInsights_Template_Scorecard_Pageviews extends ExactMetrics_SiteInsights_Template_DuoScorecard {

	protected $metric = 'pageviews';

	protected $type = 'scorecard';

	public function output(){
		$data = $this->get_options();

		if (empty($data)) {
			return false;
		}

		$duration = $data['duration']['value'];
		$prev_duration = $data['duration']['prev'];
		$bounce_rate = $data['bounce_rate']['value'];
		$prev_bounce_rate = $data['bounce_rate']['prev'];

		$left = $this->get_card_template(
			'left',
			__('Avg. Session Duration', 'google-analytics-dashboard-for-wp'),
			$duration,
			$prev_duration,
			__( 'vs. Previous 30 days', 'google-analytics-dashboard-for-wp' ),
			$data['withComparison']
		);

		$right = $this->get_card_template(
			'right',
			__('Bounce Rate', 'google-analytics-dashboard-for-wp'),
			$bounce_rate,
			$prev_bounce_rate,
			__( 'vs. Previous 30 days', 'google-analytics-dashboard-for-wp' ),
			$data['withComparison']
		);

		return sprintf(
			"<div class=\"exactmetrics-duo-scorecard\">%s</div>",
			$left . $right
		);
	}

	/**
	 * Returns data needed for this block.
	 *
	 * @return array|false
	 */
	protected function get_options() {
		if ( empty($this->data['infobox'])) {
			return false;
		}

		$primaryColor = $this->attributes['primaryColor'];
		$secondaryColor = $this->attributes['secondaryColor'];
		$withComparison = $this->attributes['withComparison'];

		$data = $this->data['infobox'];

		return array(
			'duration' => $data['duration'],
			'bounce_rate' => $data['bounce_rate'],
			'withComparison' => $withComparison,
		);
	}
}