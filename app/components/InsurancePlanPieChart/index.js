import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { reduce, defaultsDeep } from 'lodash';
import { numberWithCommas, pieChartOptions, insurancePlansColor } from 'components/theme';

function InsurancePlanPieChart(props) {
  // Insurance plans distribution of the policies
  // Key is the insurance plans. For example, "Silver" or "Gold"
  // Value is the number of policies with that insurance plans.
  const {
    insurancePlanDistribution,
  } = props;
  const total = reduce(insurancePlanDistribution, (sum, x) => sum + (x || 0), 0);

  return (
    <Pie
      height={500}

      data={{
        datasets: [{
          data: Object.values(insurancePlanDistribution),
          backgroundColor: Object.keys(insurancePlanDistribution)
            .map(insurancePlansColor),
        }],
        labels: Object.keys(insurancePlanDistribution),
      }}

      options={defaultsDeep({}, pieChartOptions, {
        title: {
          text: 'Insurance Plans',
        },
        tooltips: {
          callbacks: {
            title: ([item], { labels }) => labels[item.index],
            label: ({ index }, { datasets }) => {
              const value = datasets[0].data[index];
              const percentage = Math.round((value / total) * 100);
              return `${numberWithCommas(value)} polic${value === 1 ? 'y' : 'ies'}, ${percentage}%`;
            },
          },
        },
      })}
    />
  );
}

InsurancePlanPieChart.propTypes = {
  insurancePlanDistribution: PropTypes.object.isRequired,
};

export default InsurancePlanPieChart;
