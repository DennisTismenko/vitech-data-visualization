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
import Container from 'components/Container';
import Equalizer from 'material-ui-icons/Equalizer';


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
          <Container>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              <Equalizer style={{ marginRight: '10px', width: '36px', height: '36px' }} />
              <h2 style={{ display: 'inline-block' }}>V3 Data Visualization</h2>
            </Link>
          </Container>
        </AppBar>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}
