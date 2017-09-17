import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { chain, defaultsDeep } from 'lodash';
import { pieChartOptions, maritalStatusColor, maritalStatusAcronym } from 'components/theme';

function MaritalStatusPieChart(props) {
  const {
    participants,
  } = props;

  // Marital status distribution of the participants
  // Key is the marital status. For example, "M" for married or "S" for single
  // Value is the number of participants with that marital status.
  // For example, 40, 80
  const maritalStatusDistribution = chain(participants)
    .reduce((result, { marital_status }) => ({
      ...result,
      [marital_status]: result[marital_status] ? result[marital_status] + 1 : 1,
    }), {})
    .value();

  return (
    <Pie
      width="100%"
      height="500"

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
              const percentage = Math.round((value / participants.length) * 100);
              return `${value} participant${value === 1 ? '' : 's'}, ${percentage}%`;
            },
          },
        },
      })}
    />
  );
}

MaritalStatusPieChart.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MaritalStatusPieChart;
