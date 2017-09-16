import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router';
import GenderPieChart from 'components/GenderPieChart';
import MaritalStatusPieChart from 'components/MaritalStatusPieChart';
import AgeRangePieChart from 'components/AgeRangePieChart';
import InsurancePlansPieChart from 'components/InsurancePlansPieChart';

class ActivitySinglePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  render() {
    const {
      params,
    } = this.props;
    return (
      <div>
        <h1>
          Activity with id {params.id}
          <br />
          <Link to="/activities">Go back to activities</Link>
        </h1>

        <GenderPieChart
          participants={[
            { sex: 'M' },
            { sex: 'M' },
            { sex: 'M' },
            { sex: 'F' },
          ]}
        />

        <MaritalStatusPieChart
          participants={[
            { marital_status: 'M' },
            { marital_status: 'M' },
            { marital_status: 'S' },
            { marital_status: 'S' },
          ]}
        />

        <AgeRangePieChart
          participants={[
            { birth_date: '1980-06-11T00:00:00Z' },
            { birth_date: '1980-06-14T00:00:00Z' },
            { birth_date: '1980-07-07T00:00:00Z' },
            { birth_date: '1980-04-23T00:00:00Z' },
            { birth_date: '1967-05-24T00:00:00Z' },
            { birth_date: '1950-05-06T00:00:00Z' },
            { birth_date: '1960-04-24T00:00:00Z' },
            { birth_date: '1960-04-27T00:00:00Z' },
            { birth_date: '1950-07-19T00:00:00Z' },
            { birth_date: '1990-05-28T00:00:00Z' },
          ]}
        />

        <InsurancePlansPieChart
          policies={[
            { insurance_plan: 'Gold' },
            { insurance_plan: 'Gold' },
            { insurance_plan: 'Gold' },
            { insurance_plan: 'Gold' },
            { insurance_plan: 'Gold' },
            { insurance_plan: 'Silver' },
            { insurance_plan: 'Silver' },
            { insurance_plan: 'Silver' },
            { insurance_plan: 'Regular' },
            { insurance_plan: 'Regular' },
          ]}
        />
      </div>
    );
  }
}

export default withRouter(ActivitySinglePage);
