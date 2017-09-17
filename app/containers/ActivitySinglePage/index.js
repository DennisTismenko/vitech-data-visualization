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
import { reduce } from 'lodash';
import { numberWithCommas } from 'components/theme';
import { stateAdapterHack, arrayToObjectHack } from '../../HACKS';
import fetchCollection from '../../network';

const ACTIVITY_DURATION_DAYS = 20;

class ActivitySinglePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  state = {
    isLoading: true,
    activity: null,
    activityFrom: null,
    activityTo: null,
    policyDistribution: null,
    policyWithPromoDistribution: null,
    policyDistributionFull: null,
    policyWithPromoDistributionFull: null,
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
    ])
      .then(([
        activity,
      ]) => {
        const activityObj = activity.response.docs[0];
        const activityEnd = new Date(activityObj.activity_date);
        activityEnd.setDate(activityEnd.getDate() + ACTIVITY_DURATION_DAYS);
        const activityPreviousMonth = new Date(activityObj.activity_date);
        activityPreviousMonth.setDate(activityEnd.getDate() - ACTIVITY_DURATION_DAYS);
        Promise.all([
          fetchCollection('policy_info', {
            ...defaultFacetOptions,
            q: `policy_start_date:[${activityObj.activity_date} TO ${activityEnd.toISOString()}]`,
            'facet.limit': 10000000,
            'facet.field': 'policy_start_date',
          }),
          fetchCollection('policy_info', {
            ...defaultFacetOptions,
            q: `promo_codes:* policy_start_date:[${activityObj.activity_date} TO ${activityEnd.toISOString()}]`,
            'q.op': 'AND',
            'facet.limit': 10000000,
            'facet.field': 'policy_start_date',
          }),
          fetchCollection('policy_info', {
            ...defaultFacetOptions,
            'facet.limit': 10000000,
            'facet.field': 'policy_start_date',
          }),
          fetchCollection('policy_info', {
            ...defaultFacetOptions,
            q: 'promo_codes:*',
            'q.op': 'AND',
            'facet.limit': 10000000,
            'facet.field': 'policy_start_date',
          }),
          fetchCollection('participant', {
            ...defaultFacetOptions,
            q: `{!join from=participant_id to=id fromIndex=policy_info}policy_start_date:[${activityObj.activity_date} TO ${activityEnd.toISOString()}]`,
            'facet.limit': 10000000,
            'facet.field': 'sex',
          }),
          fetchCollection('participant', {
            ...defaultFacetOptions,
            q: `{!join from=participant_id to=id fromIndex=policy_info}policy_start_date:[${activityObj.activity_date} TO ${activityEnd.toISOString()}]`,
            'facet.limit': 10000000,
            'facet.field': 'marital_status',
          }),
          fetchCollection('participant', {
            ...defaultFacetOptions,
            q: `{!join from=participant_id to=id fromIndex=policy_info}policy_start_date:[${activityObj.activity_date} TO ${activityEnd.toISOString()}]`,
            'facet.limit': 10000000,
            'facet.field': 'state',
          }),
          fetchCollection('policy_info', {
            ...defaultFacetOptions,
            q: `policy_start_date:[${activityObj.activity_date} TO ${activityEnd.toISOString()}]`,
            'facet.limit': 10000000,
            'facet.field': 'insurance_plan',
          }),
          fetchCollection('policy_info', {
            ...defaultFacetOptions,
            q: `policy_start_date:[${activityObj.activity_date} TO ${activityEnd.toISOString()}]`,
            'facet.limit': 10000000,
            'facet.field': 'insurance_coverage',
          }),
          fetchCollection('policy_info', {
            ...defaultFacetOptions,
            q: `policy_start_date:[${activityObj.activity_date} TO ${activityEnd.toISOString()}]`,
            'facet.limit': 10000000,
            'facet.field': 'insurance_product',
          }),
          fetchCollection('policy_info', {
            ...defaultFacetOptions,
            q: `policy_start_date:[${activityObj.activity_date} TO ${activityEnd.toISOString()}]`,
            'facet.limit': 10000000,
            'facet.field': 'insurance_premium',
          }),
          fetchCollection('policy_info', {
            ...defaultFacetOptions,
            q: `policy_start_date:[${activityPreviousMonth.toISOString()} TO ${activityObj.activity_date}]`,
            'facet.limit': 10000000,
            'facet.field': 'insurance_premium',
          }),
        ])
          .then(([
            policy,
            policyWithPromo,
            policyFull,
            policyWithPromoFull,
            gender,
            maritalStatus,
            state,
            insurancePlan,
            insuranceCoverage,
            insuranceProduct,
            insurancePremium,
            lastMonthInsurancePremium,
          ]) => {
            this.setState({
              isLoading: false,
              activity: activityObj,
              activityFrom: activityObj.activity_date.split('T')[0],
              activityTo: activityEnd.toISOString().split('T')[0],
              policyDistribution: arrayToObjectHack(policy.facet_counts.facet_fields.policy_start_date),
              policyWithPromoDistribution: arrayToObjectHack(policyWithPromo.facet_counts.facet_fields.policy_start_date),
              policyDistributionFull: arrayToObjectHack(policyFull.facet_counts.facet_fields.policy_start_date),
              policyWithPromoDistributionFull: arrayToObjectHack(policyWithPromoFull.facet_counts.facet_fields.policy_start_date),
              genderDistribution: arrayToObjectHack(gender.facet_counts.facet_fields.sex),
              maritalStatusDistribution: arrayToObjectHack(maritalStatus.facet_counts.facet_fields.marital_status),
              stateDistribution: stateAdapterHack(arrayToObjectHack(state.facet_counts.facet_fields.state)),
              insurancePlanDistribution: arrayToObjectHack(insurancePlan.facet_counts.facet_fields.insurance_plan),
              insuranceCoverageDistribution: arrayToObjectHack(insuranceCoverage.facet_counts.facet_fields.insurance_coverage),
              insuranceProductDistribution: arrayToObjectHack(insuranceProduct.facet_counts.facet_fields.insurance_product),
              insurancePremiumDistribution: arrayToObjectHack(insurancePremium.facet_counts.facet_fields.insurance_premium),
              lastMonthInsurancePremiumDistribution: arrayToObjectHack(lastMonthInsurancePremium.facet_counts.facet_fields.insurance_premium),
            });
          });
      });
  }

  render() {
    const {
      isLoading,
      activity,
      activityFrom,
      activityTo,
      policyDistribution,
      policyWithPromoDistribution,
      policyDistributionFull,
      policyWithPromoDistributionFull,
      genderDistribution,
      maritalStatusDistribution,
      stateDistribution,
      insurancePlanDistribution,
      insuranceCoverageDistribution,
      insuranceProductDistribution,
      insurancePremiumDistribution,
      lastMonthInsurancePremiumDistribution,
    } = this.state;

    if (isLoading) {
      return null;
    }

    const policyTotal = reduce(policyDistribution, (sum, x) => sum + (x || 0), 0);
    const policyWithPromoTotal = reduce(policyWithPromoDistribution, (sum, x) => sum + (x || 0), 0);
    const gross = reduce(insurancePremiumDistribution, (sum, count, premium) => sum + (Number(premium) * Number(count)), 0);
    const lastMonthGross = reduce(lastMonthInsurancePremiumDistribution, (sum, count, premium) => sum + (Number(premium) * Number(count)), 0);
    const growth = Math.round((gross / lastMonthGross) * 100) - 100;

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
            <p><strong>Activity type</strong> {activity.activity_type}</p>
            <p><strong>Reach</strong> {numberWithCommas(activity.targeted_counts)} people</p>
            <p><strong>Promotional code</strong> {activity.promocodes}</p>
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
            <p>From <strong style={{ color: '#BF360C' }}>{activityFrom}</strong>, to <strong style={{ color: '#BF360C' }}>{activityTo}</strong></p>
            <p>Policies sold <strong style={{ color: '#43A047' }}>{numberWithCommas(policyTotal)}</strong></p>
            <p>Promotional codes redeemed <strong style={{ color: '#F48FB1' }}>{numberWithCommas(policyWithPromoTotal)}</strong></p>
            <p>Gross income <strong style={{ color: '#43A047' }}>{numberWithCommas(gross)} CAD</strong></p>
            <p>Relative growth <strong style={{ color: growth >= 0 ? '#43A047' : '#E53935' }}>{(growth > 0 ? '+' : '') + numberWithCommas(growth)}%</strong> <small><i>(last 30 days)</i></small></p>
          </Card>

          <Card style={{ ...cardStyle, margin: '0 15px' }}>
            <PoliciesOverTimeChart
              activity={activity}
              policyDistribution={policyDistributionFull}
              policyWithPromoDistribution={policyWithPromoDistributionFull}
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

          {/* <OneOfTwo>
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
          </OneOfTwo> */}

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

        {activity.promocodes != 'NA' && <div style={{ padding: '0 15px 45px' }}>
          <Card style={cardStyle}>
            <h1 style={{textAlign:'center'}}> Who should you target next?</h1>
            <p>We've automatically prepared a list of potential candidates that should be targeted. We picked them based on the success of previous conversions using our well-trained neural network</p>
            <a href={`/assets/${activity.promocodes}.csv`} target="_blank">
              <h4 style={{textAlign: 'center'}}>Download {activity.promocodes}.csv</h4>
            </a>
          </Card>
        </div>}
        </Container>
      </div>
    );
  }
}

export default withRouter(ActivitySinglePage);
