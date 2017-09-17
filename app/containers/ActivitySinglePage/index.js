import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router';
import GenderPieChart from 'components/GenderPieChart';
import MaritalStatusPieChart from 'components/MaritalStatusPieChart';
import AgeRangePieChart from 'components/AgeRangePieChart';
import StatePieChart from 'components/StatePieChart';
import InsurancePlansPieChart from 'components/InsurancePlansPieChart';
import InsuranceCoveragePieChart from 'components/InsuranceCoveragePieChart';
import InsuranceProductPieChart from 'components/InsuranceProductPieChart';
import Container from 'components/Container';
import OneOfTwo from 'components/OneOfTwo';

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

        <Container>
          <OneOfTwo>
            <GenderPieChart
              participants={[
                { sex: 'M' },
                { sex: 'M' },
                { sex: 'M' },
                { sex: 'F' },
              ]}
            />
          </OneOfTwo>

          <OneOfTwo>
            <MaritalStatusPieChart
              participants={[
                { marital_status: 'M' },
                { marital_status: 'M' },
                { marital_status: 'S' },
                { marital_status: 'S' },
              ]}
            />
          </OneOfTwo>

          <OneOfTwo>
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
          </OneOfTwo>

          <OneOfTwo>
            <StatePieChart
              participants={[
                { state: 'Ontario' },
                { state: 'Quebec' },
                { state: 'Quebec' },
                { state: 'Quebec' },
                { state: 'British Columbia' },
                { state: 'Alberta' },
                { state: 'New Brunswick' },
                { state: 'New Brunswick' },
                { state: 'Nova Scotia' },
                { state: 'New Brunswick' },
                { state: 'New Brunswick' },
                { state: 'Manitoba' },
                { state: 'Saskatchewan' },
                { state: 'Saskatchewan' },
                { state: 'Newfoundland and Labrador' },
                { state: 'Prince Edward Island' },
              ]}
            />
          </OneOfTwo>

          <OneOfTwo>
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
          </OneOfTwo>

          <OneOfTwo>
            <InsuranceCoveragePieChart
              policies={[
                { insurance_coverage: 'Family' },
                { insurance_coverage: 'Family' },
                { insurance_coverage: 'Family' },
                { insurance_coverage: 'Family' },
                { insurance_coverage: 'Family' },
                { insurance_coverage: 'Single' },
                { insurance_coverage: 'Single' },
                { insurance_coverage: 'Single' },
              ]}
            />
          </OneOfTwo>

          <OneOfTwo>
            <InsuranceProductPieChart
              policies={[
                { insurance_product: 'Dental' },
                { insurance_product: 'Dental' },
                { insurance_product: 'Dental' },
                { insurance_product: 'Dental' },
                { insurance_product: 'Dental' },
                { insurance_product: 'Accidental' },
                { insurance_product: 'Accidental' },
                { insurance_product: 'Accidental' },
                { insurance_product: 'Accidental' },
                { insurance_product: 'Accidental' },
              ]}
            />
          </OneOfTwo>
        </Container>
      </div>
    );
  }
}

export default withRouter(ActivitySinglePage);
