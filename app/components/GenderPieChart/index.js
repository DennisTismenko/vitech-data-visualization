import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { reduce, defaultsDeep } from 'lodash';
import { numberWithCommas, pieChartOptions, genderColor, genderAcronym } from 'components/theme';

function GenderPieChart(props) {
  // Gender distribution of the participants
  // Key is the gender. For example, "M" for male or "F" for female
  // Value is the number of participants with that gender.
  const {
    genderDistribution,
  } = props;
  const total = reduce(genderDistribution, (sum, x) => sum + (x || 0), 0);

  return (
    <Pie
      height={500}

      data={{
        datasets: [{
          data: Object.values(genderDistribution),
          backgroundColor: Object.keys(genderDistribution)
            .map(genderColor),
        }],
        labels: Object.keys(genderDistribution)
          .map(genderAcronym),
      }}

      options={defaultsDeep({}, pieChartOptions, {
        title: {
          text: 'Gender',
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

GenderPieChart.propTypes = {
  genderDistribution: PropTypes.object.isRequired,
};

export default GenderPieChart;
