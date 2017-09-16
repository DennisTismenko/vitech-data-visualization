import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router';

class ActivitySinglePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  render() {
    const {
      params,
    } = this.props;
    return (
      <h1>
        Activity with id {params.id}
        <br />
        <Link to="/activities">Go back to activities</Link>
      </h1>
    );
  }
}

export default withRouter(ActivitySinglePage);
