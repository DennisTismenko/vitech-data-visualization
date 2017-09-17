import React from 'react'
import PropTypes from 'prop-types'
import { chain, defaultsDeep, minBy, maxBy } from 'lodash';
import {Line as LineChart} from 'react-chartjs-2'
import 'chartjs-plugin-annotation';

export default class PoliciesOverTimeChart extends React.PureComponent {
	static propTypes = {
		policies: PropTypes.arrayOf(PropTypes.object).isRequired,
		activity: PropTypes.object.isRequired
	}


	render() {
		const daysBeforeCampaign = 5;
		const daysAfterCampaign = 15;

		const {
			policies,
			activity
		} = this.props;

		const firstDate = minBy(policies, x => new Date(x.policy_start_date).getTime()).policy_start_date
		const lastDate = maxBy(policies, x => new Date(x.policy_start_date).getTime()).policy_start_date

		const activityDate = new Date(activity.activity_date)
		
		const interpolatedLabels = {}
		const iterdate = new Date(firstDate)
		
		interpolatedLabels[iterdate.toISOString().split('T')[0]] = 0;
		while (iterdate.getTime() <= new Date(lastDate).getTime()) {
			iterdate.setDate(iterdate.getDate() + 1);
			interpolatedLabels[iterdate.toISOString().split('T')[0]] = 0
		}

		let previous = 0
		const policyDistribution = chain(policies)
			.map((x) => ({
				...x,
				policy_start_date: x.policy_start_date.split('T')[0],
			}))
			.reduce((result, x) => ({
				...result,
				 [x.policy_start_date]: result[x.policy_start_date] + 1,
			}), interpolatedLabels)
			.value();
			
			const activityDateIndex = Object.keys(policyDistribution)
				.indexOf(activityDate.toISOString().split('T')[0]);

			return (
				<LineChart
					data={{
						labels: Object.keys(policyDistribution)
							.slice(activityDateIndex - daysBeforeCampaign, activityDateIndex + daysAfterCampaign),
						datasets: [{
							data: Object.values(policyDistribution)
								.slice(activityDateIndex - daysBeforeCampaign, activityDateIndex + daysAfterCampaign)
						}]
					}}
					options={{
						annotation: {
							annotations: [{
								type: "line",
								mode: "vertical",
								scaleID: "x-axis-0",
								value: activityDate.toISOString().split('T')[0]	,
								borderColor: "red",
								label: {
									content: "Activity Start",
									enabled: true,
									position: "top"
								}
							}
						]}
					}}
				/>
			);
	}
}