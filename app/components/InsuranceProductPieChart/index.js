import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { chain, defaultsDeep } from 'lodash';
import { pieChartOptions, insuranceProductsColor } from 'components/theme';

function InsuranceProductPieChart(props) {
  const {
    policies,
  } = props;

  // Insurance products distribution of the policies
  // Key is the insurance products. For example, "Dental" or "Accidental"
  // Value is the number of policies with that insurance products.
  // For example, 40, 80
  const insuranceProductsDistribution = chain(policies)
    .reduce((result, { insurance_product }) => ({
      ...result,
      [insurance_product]: result[insurance_product] ? result[insurance_product] + 1 : 1,
    }), {})
    .value();

  return (
    <Pie
      data={{
        datasets: [{
          data: Object.values(insuranceProductsDistribution),
          backgroundColor: Object.keys(insuranceProductsDistribution)
            .map(insuranceProductsColor),
        }],
        labels: Object.keys(insuranceProductsDistribution),
      }}

      options={defaultsDeep({}, pieChartOptions, {
        title: {
          text: 'Insurance Product',
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

InsuranceProductPieChart.propTypes = {
  policies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InsuranceProductPieChart;
