import React from 'react';
import PropTypes from 'prop-types';
import { chain, min, max } from 'lodash';
import { Line as LineChart } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

const DAYS = 24 * 60 * 60 * 1000;

function mapPolicyDistribution(activityDate, distribution) {
  const daysBeforeCampaign = 5;
  const daysAfterCampaign = 15;

  const firstDate = new Date(
    min(
      Object.keys(distribution)
        .map((x) => new Date(x).getTime())
        .concat([activityDate.getTime() - (daysBeforeCampaign * DAYS)])
    )
  );
  const lastDate = new Date(
    max(
      Object.keys(distribution)
        .map((x) => new Date(x).getTime())
        .concat([activityDate.getTime() + (daysAfterCampaign * DAYS)])
    )
  );

  const interpolatedLabels = {};
  const iterdate = new Date(firstDate);

  interpolatedLabels[iterdate.toISOString().split('T')[0]] = 0;
  while (iterdate.getTime() <= new Date(lastDate).getTime()) {
    iterdate.setDate(iterdate.getDate() + 1);
    interpolatedLabels[iterdate.toISOString().split('T')[0]] = 0;
  }

  const distributionSorted = chain(interpolatedLabels)
    .mapValues((v, k) => distribution[`${k}T00:00:00Z`] || 0)
    .value();

  const activityDateIndex = Object.keys(distributionSorted)
      .indexOf(activityDate.toISOString().split('T')[0]);

  const labels = Object.keys(distributionSorted)
    .slice(activityDateIndex - daysBeforeCampaign, activityDateIndex + daysAfterCampaign);
  const values = Object.values(distributionSorted)
    .slice(activityDateIndex - daysBeforeCampaign, activityDateIndex + daysAfterCampaign);

  return {
    labels,
    values,
  };
}

function PoliciesOverTimeChart(props) {
  const {
    activity,
    policyDistribution,
    policyWithPromoDistribution,
  } = props;

  const activityDate = new Date(activity.activity_date);

  const mappedPolicyDistribution = mapPolicyDistribution(activityDate, policyDistribution);
  const mappedPolicyWithPromoDistribution = mapPolicyDistribution(activityDate, policyWithPromoDistribution);

  const maxValue = max(mappedPolicyDistribution.values) || 2;
  const upperBound = Math.ceil((maxValue + (maxValue * 0.15)) / 100) * 100;

  return (
    <LineChart
      data={{
        labels: mappedPolicyDistribution.labels,
        datasets: [{
          data: mappedPolicyWithPromoDistribution.values,
          backgroundColor: '#F48FB1',
          borderColor: '#C2185B',
          label: 'Conversions using Promotion'
        }, {
          data: mappedPolicyDistribution.values,
          backgroundColor: '#81D4FA',
          borderColor: '#0288D1',
          label: 'Total Conversions'
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
          display: true,
          position: 'right'
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Date',
              fontSize: 20,
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
              fontSize: 20,
              fontStyle: 'bold',
            },
            ticks: {
              stepSize: Math.round(maxValue / 10 / 100) * 100,
              max: upperBound,
              min: 0,
            } }],
        },
        title: {
          display: true,
          fontSize: 30,
          text: 'Conversions per day',
        },
      }}
    />
  );
}


PoliciesOverTimeChart.propTypes = {
  activity: PropTypes.object.isRequired,
  policyDistribution: PropTypes.object.isRequired,
  policyWithPromoDistribution: PropTypes.object.isRequired,
};

export default PoliciesOverTimeChart;
