import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { reduce, defaultsDeep } from 'lodash';
import { numberWithCommas, pieChartOptions, stateColor } from 'components/theme';

function StatePieChart(props) {
  // State distribution of the participants
  // Key is the state. For example, "Ontario", "British Columbia"
  // Value is the number of participants within that state.
  const {
    stateDistribution,
  } = props;
  const total = reduce(stateDistribution, (sum, x) => sum + (x || 0), 0);

  return (
    <Pie
      height={500}

      data={{
        datasets: [{
          data: Object.values(stateDistribution),
          backgroundColor: Object.keys(stateDistribution)
            .map(stateColor),
        }],
        labels: Object.keys(stateDistribution),
      }}

      options={defaultsDeep({}, pieChartOptions, {
        title: {
          text: 'State',
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

StatePieChart.propTypes = {
  stateDistribution: PropTypes.object.isRequired,
};

export default StatePieChart;
