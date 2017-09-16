import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { chain, defaultsDeep } from 'lodash';
import { pieChartOptions, genderColor } from 'components/theme';

function GenderPieChart(props) {
  const {
    participants,
  } = props;

  // Gender distribution of the participants
  // key is the gender. For example, "M" or "F"
  // value is the percentage rounded to the nearest tenths.
  // For example, 40, 60.5
  const genderDistribution = chain(participants)
    .reduce((result, x) => ({
      ...result,
      [x.sex]: result[x.sex] ? result[x.sex] + 1 : 1,
    }), {})
    .value();

  return (
    <Pie
      data={{
        datasets: [{
          data: Object.values(genderDistribution),
          backgroundColor: Object.keys(genderDistribution)
            .map(genderColor),
        }],
        labels: Object.keys(genderDistribution),
      }}

      options={defaultsDeep(pieChartOptions, {
        title: {
          text: 'Gender',
        },
        tooltips: {
          callbacks: {
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

GenderPieChart.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GenderPieChart;
