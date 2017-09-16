import React from 'react';
import { Link } from 'react-router';

export default class ActivitiesPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <h1>
        Activities
        <br />
        <Link to="/activities/1">Go to activity with id 1</Link>
        <br />
        <Link to="/">Go back home</Link>
      </h1>
    );
  }
}
