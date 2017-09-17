/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        <AppBar
          style={{
            backgroundColor: '#00BCD4',
            padding: '0 30px',
          }}
        >
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <h2>V3 Data Visualization</h2>
          </Link>

        </AppBar>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}
