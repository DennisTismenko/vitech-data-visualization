import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { reduce, defaultsDeep } from 'lodash';
import { numberWithCommas, pieChartOptions, insuranceProductsColor } from 'components/theme';

function InsuranceProductPieChart(props) {
  // Insurance products distribution of the policies
  // Key is the insurance products. For example, "Dental" or "Accidental"
  // Value is the number of policies with that insurance products.
  const {
    insuranceProductDistribution,
  } = props;
  const total = reduce(insuranceProductDistribution, (sum, x) => sum + (x || 0), 0);

  return (
    <Pie
      height={500}

      data={{
        datasets: [{
          data: Object.values(insuranceProductDistribution),
          backgroundColor: Object.keys(insuranceProductDistribution)
            .map(insuranceProductsColor),
        }],
        labels: Object.keys(insuranceProductDistribution),
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
              const percentage = Math.round((value / total) * 100);
              return `${numberWithCommas(value)} polic${value === 1 ? 'y' : 'ies'}, ${percentage}%`;
            },
          },
        },
      })}
    />
  );
}

InsuranceProductPieChart.propTypes = {
  insuranceProductDistribution: PropTypes.object.isRequired,
};

export default InsuranceProductPieChart;
