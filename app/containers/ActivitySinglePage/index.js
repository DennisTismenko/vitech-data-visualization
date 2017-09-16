import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router';
import GenderPieChart from 'components/GenderPieChart';

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
      </div>
    );
  }
}

export default withRouter(ActivitySinglePage);
