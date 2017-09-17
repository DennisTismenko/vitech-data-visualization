import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { chain, defaultsDeep } from 'lodash';
import { pieChartOptions, stateColor } from 'components/theme';

function StatePieChart(props) {
  const {
    participants,
  } = props;

  // State distribution of the participants
  // Key is the state. For example, "Ontario", "British Columbia"
  // Value is the number of participants within that state.
  // For example, 40, 80
  const stateDistribution = chain(participants)
    .reduce((result, { state }) => ({
      ...result,
      [state]: result[state] ? result[state] + 1 : 1,
    }), {})
    .value();

  return (
    <Pie
      width="100%"
      height="500"

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
              const percentage = Math.round((value / participants.length) * 100);
              return `${value} participant${value === 1 ? '' : 's'}, ${percentage}%`;
            },
          },
        },
      })}
    />
  );
}

StatePieChart.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StatePieChart;
