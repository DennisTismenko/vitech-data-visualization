import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router';
import GenderPieChart from 'components/GenderPieChart';
import MaritalStatusPieChart from 'components/MaritalStatusPieChart';
import AgeRangePieChart from 'components/AgeRangePieChart';
import StatePieChart from 'components/StatePieChart';
import InsurancePlanPieChart from 'components/InsurancePlanPieChart';
import InsuranceCoveragePieChart from 'components/InsuranceCoveragePieChart';
import InsuranceProductPieChart from 'components/InsuranceProductPieChart';
import Container from 'components/Container';
import OneOfTwo from 'components/OneOfTwo';
import BlurredBackground from 'components/BlurredBackground';
import background from 'assets/activity-background.jpg';
import Card from 'material-ui/Card';
import { stateAdapterHack, arrayToObjectHack } from '../../HACKS';
import fetchCollection from '../../network';

class ActivitySinglePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  state = {
    isLoading: true,
    genderDistribution: null,
    maritalStatusDistribution: null,
    stateDistribution: null,
    insurancePlanDistribution: null,
    insuranceCoverageDistribution: null,
    insuranceProductDistribution: null,
  }

  componentDidMount() {
    const defaultOptions = {
      q: '*:*',
      facet: 'on',
      rows: 0,
      wt: 'json',
    };
    Promise.all([
      fetchCollection('participant', {
        ...defaultOptions,
        'facet.field': 'sex',
      }),
      fetchCollection('participant', {
        ...defaultOptions,
        'facet.field': 'marital_status',
      }),
      fetchCollection('participant', {
        ...defaultOptions,
        'facet.field': 'state',
      }),
      fetchCollection('policy_info', {
        ...defaultOptions,
        'facet.field': 'insurance_plan',
      }),
      fetchCollection('policy_info', {
        ...defaultOptions,
        'facet.field': 'insurance_coverage',
      }),
      fetchCollection('policy_info', {
        ...defaultOptions,
        'facet.field': 'insurance_product',
      }),
    ])
      .then(([
        gender,
        maritalStatus,
        state,
        insurancePlan,
        insuranceCoverage,
        insuranceProduct,
      ]) => {
        this.setState({
          isLoading: false,
          genderDistribution: arrayToObjectHack(gender.facet_counts.facet_fields.sex),
          maritalStatusDistribution: arrayToObjectHack(maritalStatus.facet_counts.facet_fields.marital_status),
          stateDistribution: stateAdapterHack(arrayToObjectHack(state.facet_counts.facet_fields.state)),
          insurancePlanDistribution: arrayToObjectHack(insurancePlan.facet_counts.facet_fields.insurance_plan),
          insuranceCoverageDistribution: arrayToObjectHack(insuranceCoverage.facet_counts.facet_fields.insurance_coverage),
          insuranceProductDistribution: arrayToObjectHack(insuranceProduct.facet_counts.facet_fields.insurance_product),
        });
      });
  }

  render() {
    const {
      params,
    } = this.props;
    const {
      isLoading,
      genderDistribution,
      maritalStatusDistribution,
      stateDistribution,
      insurancePlanDistribution,
      insuranceCoverageDistribution,
      insuranceProductDistribution,
    } = this.state;

    if (isLoading) {
      return null;
    }

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
                genderDistribution={genderDistribution}
              />
            </Card>
          </OneOfTwo>

          <OneOfTwo>
            <Card style={cardStyle}>
              <MaritalStatusPieChart
                maritalStatusDistribution={maritalStatusDistribution}
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
                stateDistribution={stateDistribution}
              />
            </Card>
          </OneOfTwo>

          <OneOfTwo>
            <Card style={cardStyle}>
              <InsurancePlanPieChart
                insurancePlanDistribution={insurancePlanDistribution}
              />
            </Card>
          </OneOfTwo>

          <OneOfTwo>
            <Card style={cardStyle}>
              <InsuranceCoveragePieChart
                insuranceCoverageDistribution={insuranceCoverageDistribution}
              />
            </Card>
          </OneOfTwo>

          <OneOfTwo>
            <Card style={cardStyle}>
              <InsuranceProductPieChart
                insuranceProductDistribution={insuranceProductDistribution}
              />
            </Card>
          </OneOfTwo>
        </Container>
      </div>
    );
  }
}

export default withRouter(ActivitySinglePage);
