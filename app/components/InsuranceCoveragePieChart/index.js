import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { reduce, defaultsDeep } from 'lodash';
import { numberWithCommas, pieChartOptions, insuranceCoveragesColor } from 'components/theme';

function InsuranceCoveragePieChart(props) {
  // Insurance coverages distribution of the policies
  // Key is the insurance coverages. For example, "Single" or "Family"
  // Value is the number of policies with that insurance coverages.
  const {
    insuranceCoverageDistribution,
  } = props;
  const total = reduce(insuranceCoverageDistribution, (sum, x) => sum + (x || 0), 0);

  return (
    <Pie
      height={500}

      data={{
        datasets: [{
          data: Object.values(insuranceCoverageDistribution),
          backgroundColor: Object.keys(insuranceCoverageDistribution)
            .map(insuranceCoveragesColor),
        }],
        labels: Object.keys(insuranceCoverageDistribution),
      }}

      options={defaultsDeep({}, pieChartOptions, {
        title: {
          text: 'Insurance Coverage',
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

InsuranceCoveragePieChart.propTypes = {
  insuranceCoverageDistribution: PropTypes.object.isRequired,
};

export default InsuranceCoveragePieChart;
