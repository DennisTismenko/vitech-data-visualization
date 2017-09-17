import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import GenderPieChart from 'components/GenderPieChart';
import PoliciesOverTimeChart from 'components/PoliciesOverTimeChart';
import MaritalStatusPieChart from 'components/MaritalStatusPieChart';
import AgeRangePieChart from 'components/AgeRangePieChart';
import StatePieChart from 'components/StatePieChart';
import InsurancePlanPieChart from 'components/InsurancePlanPieChart';
import InsuranceCoveragePieChart from 'components/InsuranceCoveragePieChart';
import InsuranceProductPieChart from 'components/InsuranceProductPieChart';
import Container from 'components/Container';
import OneOfTwo from 'components/OneOfTwo';
// import BlurredBackground from 'components/BlurredBackground';
// import background from 'assets/activity-background.jpg';
import Card from 'material-ui/Card';
import { numberWithCommas } from 'components/theme';
import { stateAdapterHack, arrayToObjectHack } from '../../HACKS';
import fetchCollection from '../../network';

class ActivitySinglePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  state = {
    isLoading: true,
    activity: null,
    policyDistribution: null,
    genderDistribution: null,
    maritalStatusDistribution: null,
    stateDistribution: null,
    insurancePlanDistribution: null,
    insuranceCoverageDistribution: null,
    insuranceProductDistribution: null,
  }

  componentDidMount() {
    const {
      params,
    } = this.props;
    const defaultFacetOptions = {
      q: '*:*',
      facet: 'on',
      rows: 0,
      wt: 'json',
    };
    Promise.all([
      fetchCollection('activities', {
        rows: 1,
        wt: 'json',
        q: `id:${params.id}`,
      }),
      fetchCollection('policy_info', {
        ...defaultFacetOptions,
        'facet.limit': 10000000,
        'facet.field': 'policy_start_date',
      }),
      fetchCollection('policy_info', {
        ...defaultFacetOptions,
        q: 'promo_codes:*',
        'facet.limit': 10000000,
        'facet.field': 'policy_start_date',
      }),
      fetchCollection('participant', {
        ...defaultFacetOptions,
        'facet.limit': 10000000,
        'facet.field': 'sex',
      }),
      fetchCollection('participant', {
        ...defaultFacetOptions,
        'facet.limit': 10000000,
        'facet.field': 'marital_status',
      }),
      fetchCollection('participant', {
        ...defaultFacetOptions,
        'facet.limit': 10000000,
        'facet.field': 'state',
      }),
      fetchCollection('policy_info', {
        ...defaultFacetOptions,
        'facet.limit': 10000000,
        'facet.field': 'insurance_plan',
      }),
      fetchCollection('policy_info', {
        ...defaultFacetOptions,
        'facet.limit': 10000000,
        'facet.field': 'insurance_coverage',
      }),
      fetchCollection('policy_info', {
        ...defaultFacetOptions,
        'facet.limit': 10000000,
        'facet.field': 'insurance_product',
      }),
    ])
      .then(([
        activity,
        policy,
        policyWithPromo,
        gender,
        maritalStatus,
        state,
        insurancePlan,
        insuranceCoverage,
        insuranceProduct,
      ]) => {
        this.setState({
          isLoading: false,
          activity: activity.response.docs.length > 0 ? activity.response.docs[0] : null,
          policyDistribution: arrayToObjectHack(policy.facet_counts.facet_fields.policy_start_date),
          policyWithPromoDistribution: arrayToObjectHack(policyWithPromo.facet_counts.facet_fields.policy_start_date),
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
      isLoading,
      activity,
      policyDistribution,
      policyWithPromoDistribution,
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
    };
    return (
      <div>
        <div style={{ height: 140 }} />
        {/* <BlurredBackground
          backgroundImage={background}
          height="2750px"
        /> */}
        <Container>
          <Card
            style={{
              width: 535,
              height: 320,
              display: 'inline-block',
              verticalAlign: 'bottom',
              padding: 15,
              margin: '0 15px 45px 15px',
            }}
          >
            <h2>{activity.campaign_initiative}</h2>
            <p>{activity.comments}</p>
            <p><strong>Campaign started:</strong> {activity.activity_date.split('T')[0]}</p>
            <p><strong>Activity type:</strong> {activity.activity_type}</p>
            <p><strong>Reach:</strong> {numberWithCommas(activity.targeted_counts)} people</p>
            <p><strong>Promotional code:</strong> {activity.promocodes}</p>
          </Card>
          <Card
            style={{
              width: 365,
              height: 320,
              display: 'inline-block',
              verticalAlign: 'bottom',
              padding: 15,
              margin: '0 15px 45px 15px',
            }}
          >
            <p><strong>Promotional Codes Redeemed</strong> {}</p>
            
            <p><strong>Growth</strong> {}</p>
          </Card>

          <Card style={{ ...cardStyle, margin: '0 15px' }}>
            <PoliciesOverTimeChart
              activity={activity}
              policyDistribution={policyDistribution}
              policyWithPromoDistribution={policyWithPromoDistribution}
            />
          </Card>
          <div style={{ height: 50 }} />

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
