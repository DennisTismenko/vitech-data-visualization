import React from 'react';
import PropTypes from 'prop-types';
import { chain, minBy, maxBy, max } from 'lodash';
import { Line as LineChart } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

function PoliciesOverTimeChart(props) {
  const daysBeforeCampaign = 5;
  const daysAfterCampaign = 15;

  const {
    policies,
    activity,
  } = props;

  const firstDate = minBy(policies, (x) => new Date(x.policy_start_date).getTime()).policy_start_date;
  const lastDate = maxBy(policies, (x) => new Date(x.policy_start_date).getTime()).policy_start_date;

  const activityDate = new Date(activity.activity_date);

  const interpolatedLabels = {};
  const iterdate = new Date(firstDate);

  interpolatedLabels[iterdate.toISOString().split('T')[0]] = 0;
  while (iterdate.getTime() <= new Date(lastDate).getTime()) {
    iterdate.setDate(iterdate.getDate() + 1);
    interpolatedLabels[iterdate.toISOString().split('T')[0]] = 0;
  }

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

  const dataValues = Object.values(policyDistribution)
      .slice(activityDateIndex - daysBeforeCampaign, activityDateIndex + daysAfterCampaign);

  const upperBound = max(dataValues) + 2;


  return (
    <LineChart
      data={{
        labels: Object.keys(policyDistribution)
            .slice(activityDateIndex - daysBeforeCampaign, activityDateIndex + daysAfterCampaign),
        datasets: [{
          data: dataValues,
          backgroundColor: '#81D4FA',
          borderColor: '#0288D1',
        }],
      }}
      options={{
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: activityDate.toISOString().split('T')[0],
            borderColor: 'red',
            label: {
              content: 'Activity Start',
              enabled: true,
              position: 'top',
            },
          },
          ] },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Date',
              fontSize: 24,
              fontStyle: 'bold',
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45,
            },
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Conversions',
              fontSize: 24,
              fontStyle: 'bold',
            },
            ticks: {
              stepSize: 1,
              max: upperBound,
            } }],
        },
        title: {
          display: true,
          fontSize: 36,
          text: 'Conversions per day',
        },
      }}
    />
  );
}


PoliciesOverTimeChart.propTypes = {
  policies: PropTypes.arrayOf(PropTypes.object).isRequired,
  activity: PropTypes.object.isRequired,
};

export default PoliciesOverTimeChart;
