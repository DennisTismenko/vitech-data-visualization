import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { reduce, defaultsDeep } from 'lodash';
import { numberWithCommas, pieChartOptions, maritalStatusColor, maritalStatusAcronym } from 'components/theme';

function MaritalStatusPieChart(props) {
  // Marital status distribution of the participants
  // Key is the marital status. For example, "M" for married or "S" for single
  // Value is the number of participants with that marital status.
  const {
    maritalStatusDistribution,
  } = props;
  const total = reduce(maritalStatusDistribution, (sum, x) => sum + (x || 0), 0);

  return (
    <Pie
      height={500}

      data={{
        datasets: [{
          data: Object.values(maritalStatusDistribution),
          backgroundColor: Object.keys(maritalStatusDistribution)
            .map(maritalStatusColor),
        }],
        labels: Object.keys(maritalStatusDistribution)
          .map(maritalStatusAcronym),
      }}

      options={defaultsDeep({}, pieChartOptions, {
        title: {
          text: 'Marital Status',
        },
        tooltips: {
          callbacks: {
            title: ([item], { labels }) => labels[item.index],
            label: ({ index }, { datasets }) => {
              const value = datasets[0].data[index];
              const percentage = Math.round((value / total) * 100);
              return `${numberWithCommas(value)} participant${value === 1 ? '' : 's'}, ${percentage}%`;
            },
          },
        },
      })}
    />
  );
}

MaritalStatusPieChart.propTypes = {
  maritalStatusDistribution: PropTypes.object.isRequired,
};

export default MaritalStatusPieChart;
