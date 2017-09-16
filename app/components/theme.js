export const pieChartOptions = {
  rotation: Math.PI,
  tooltips: {
    cornerRadius: 0,
    caretSize: 0,
    bodyFontColor: '#333333',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  title: {
    display: true,
    fontSize: 18,
  },
};

/**
 * Returns a color associated with a gender.
 *
 * @param {string} gender
 * @returns {string} color
 */
export function genderColor(gender) {
  switch (gender) {
    case 'M':
      return '#2196F3';

    case 'F':
      return '#E91E63';

    default:
      return '#AAAAAA';
  }
}

export const genderAcronym = (gender) => ({
  M: 'Male',
  F: 'Female',
})[gender];

/**
 * Returns a color associated with a marital status.
 *
 * @param {string} gender
 * @returns {string} color
 */
export function maritalStatusColor(gender) {
  switch (gender) {
    case 'M':
      return '#8BC34A';

    case 'S':
      return '#607D8B';

    default:
      return '#AAAAAA';
  }
}

export const maritalStatusAcronym = (gender) => ({
  M: 'Married',
  S: 'Single',
})[gender];
