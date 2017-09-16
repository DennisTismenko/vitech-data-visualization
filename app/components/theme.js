export const pieChartOptions = {
  rotation: Math.PI,
  tooltips: {
    cornerRadius: 0,
    caretSize: 0,
    titleFontColor: '#222222',
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
 * @param {string} maritalStatus
 * @returns {string} color
 */
export function maritalStatusColor(maritalStatus) {
  switch (maritalStatus) {
    case 'M':
      return '#8BC34A';

    case 'S':
      return '#607D8B';

    default:
      return '#AAAAAA';
  }
}

export const maritalStatusAcronym = (maritalStatus) => ({
  M: 'Married',
  S: 'Single',
})[maritalStatus];

/**
 * Returns a color associated with an age range.
 *
 * @param {string} ageRange
 * @returns {string} color
 */
export function ageRangeColor(ageRange) {
  switch (ageRange) {
    case '<18':
      return '#2196F3';

    case '18-24':
      return '#FFEB3B';

    case '25-34':
      return '#8BC34A';

    case '35-44':
      return '#F44336';

    case '45-54':
      return '#673AB7';

    case '55+':
      return '#795548';

    default:
      return '#AAAAAA';
  }
}

/**
 * Returns a color associated with an insurance plan.
 *
 * @param {string} insurancePlan
 * @returns {string} color
 */
export function insurancePlansColor(insurancePlan) {
  switch (insurancePlan) {
    case 'Regular':
      return '#607D8B';

    case 'Silver':
      return '#9E9E9E';

    case 'Gold':
      return '#FFC107';

    default:
      return '#AAAAAA';
  }
}
