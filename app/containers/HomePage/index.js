import React from 'react';
import { Link } from 'react-router';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <h1>
        Home
        <br />
        <Link to="/activities">Go to Activities</Link>
      </h1>
    );
  }
}
