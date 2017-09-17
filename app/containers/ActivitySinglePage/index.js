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
import BlurredBackground from 'components/BlurredBackground';
import background from 'assets/activity-background.jpg';
import Card from 'material-ui/Card';

class ActivitySinglePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  render() {
    const {
      params,
    } = this.props;
    const cardStyle = {
      padding: 30,
      boxShadow: 'none',
    };
    return (
      <div>
        <h1>
          Activity with id {params.id}
          <br />
          <Link to="/activities">Go back to activities</Link>
        </h1>

        <BlurredBackground
          backgroundImage={background}
          height="2750px"
        />
        <Container>
          <OneOfTwo>
            <Card style={cardStyle}>
              <GenderPieChart
                participants={[
                  { sex: 'M' },
                  { sex: 'M' },
                  { sex: 'M' },
                  { sex: 'F' },
                ]}
              />
            </Card>
          </OneOfTwo>

          <OneOfTwo>
            <Card style={cardStyle}>
              <MaritalStatusPieChart
                participants={[
                  { marital_status: 'M' },
                  { marital_status: 'M' },
                  { marital_status: 'S' },
                  { marital_status: 'S' },
                ]}
              />
            </Card>
          </OneOfTwo>

          <OneOfTwo>
            <Card style={cardStyle}>
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
            </Card>
          </OneOfTwo>

          <OneOfTwo>
            <Card style={cardStyle}>
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
            </Card>
          </OneOfTwo>

          <OneOfTwo>
            <Card style={cardStyle}>
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
            </Card>
          </OneOfTwo>

          <OneOfTwo>
            <Card style={cardStyle}>
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
            </Card>
          </OneOfTwo>

          <OneOfTwo>
            <Card style={cardStyle}>
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
            </Card>
          </OneOfTwo>
        </Container>
      </div>
    );
  }
}

export default withRouter(ActivitySinglePage);
