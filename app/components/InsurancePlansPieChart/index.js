import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { chain, defaultsDeep } from 'lodash';
import { pieChartOptions, insurancePlansColor } from 'components/theme';

function InsurancePlansPieChart(props) {
  const {
    policies,
  } = props;

  // Insurance plans distribution of the policies
  // Key is the insurance plans. For example, "Silver" or "Gold"
  // Value is the number of policies with that insurance plans.
  // For example, 40, 80
  const insurancePlansDistribution = chain(policies)
    .reduce((result, { insurance_plan }) => ({
      ...result,
      [insurance_plan]: result[insurance_plan] ? result[insurance_plan] + 1 : 1,
    }), {})
    .value();

  return (
    <Pie
      data={{
        datasets: [{
          data: Object.values(insurancePlansDistribution),
          backgroundColor: Object.keys(insurancePlansDistribution)
            .map(insurancePlansColor),
        }],
        labels: Object.keys(insurancePlansDistribution),
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
              const percentage = Math.round((value / policies.length) * 100);
              return `${value} polic${value === 1 ? 'y' : 'ies'}, ${percentage}%`;
            },
          },
        },
      })}
    />
  );
}

InsurancePlansPieChart.propTypes = {
  policies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InsurancePlansPieChart;
