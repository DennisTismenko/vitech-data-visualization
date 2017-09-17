import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { chain, defaultsDeep } from 'lodash';
import { pieChartOptions, insuranceCoveragesColor } from 'components/theme';

function InsuranceCoveragePieChart(props) {
  const {
    policies,
  } = props;

  // Insurance coverages distribution of the policies
  // Key is the insurance coverages. For example, "Single" or "Family"
  // Value is the number of policies with that insurance coverages.
  // For example, 40, 80
  const insuranceCoveragesDistribution = chain(policies)
    .reduce((result, { insurance_coverage }) => ({
      ...result,
      [insurance_coverage]: result[insurance_coverage] ? result[insurance_coverage] + 1 : 1,
    }), {})
    .value();

  return (
    <Pie
      width="100%"
      height="500"

      data={{
        datasets: [{
          data: Object.values(insuranceCoveragesDistribution),
          backgroundColor: Object.keys(insuranceCoveragesDistribution)
            .map(insuranceCoveragesColor),
        }],
        labels: Object.keys(insuranceCoveragesDistribution),
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
              const percentage = Math.round((value / policies.length) * 100);
              return `${value} polic${value === 1 ? 'y' : 'ies'}, ${percentage}%`;
            },
          },
        },
      })}
    />
  );
}

InsuranceCoveragePieChart.propTypes = {
  policies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InsuranceCoveragePieChart;
