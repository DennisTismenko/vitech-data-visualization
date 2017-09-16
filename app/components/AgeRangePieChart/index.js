import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { chain, defaultsDeep } from 'lodash';
import { pieChartOptions, ageRangeColor } from 'components/theme';

function AgeRangePieChart(props) {
  const {
    participants,
  } = props;

  // Age range distribution of the participants
  // Key is the age range. For example, "<18", "18-24", "25-34", "35-44",
  // "45-54", or "55+"
  // Value is the number of participants belonging to that age range.
  // For example, 40, 80
  const ageRangeDistribution = chain(participants)
    .sortBy('birth_date')
    .reverse()
    .reduce((result, { birth_date }) => {
      const YEAR = 3.154e+10; // milliseconds in a year
      const age = (Date.now() - new Date(birth_date).getTime()) / YEAR;
      let ageRange;
      if (age < 18) {
        ageRange = '<18';
      } else if (age >= 18 && age <= 24) {
        ageRange = '18-24';
      } else if (age >= 25 && age <= 34) {
        ageRange = '25-34';
      } else if (age >= 35 && age <= 44) {
        ageRange = '35-44';
      } else if (age >= 45 && age <= 54) {
        ageRange = '45-54';
      } else {
        ageRange = '55+';
      }
      return {
        ...result,
        [ageRange]: result[ageRange] ? result[ageRange] + 1 : 1,
      };
    }, {})
    .value();

  return (
    <Pie
      data={{
        datasets: [{
          data: Object.values(ageRangeDistribution),
          backgroundColor: Object.keys(ageRangeDistribution)
            .map(ageRangeColor),
        }],
        labels: Object.keys(ageRangeDistribution),
      }}

      options={defaultsDeep({}, pieChartOptions, {
        title: {
          text: 'Age Range',
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

AgeRangePieChart.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AgeRangePieChart;
