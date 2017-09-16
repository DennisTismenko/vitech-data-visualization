import React from 'react';
import { shallow } from 'enzyme';

import ActivitiesPage from '../index';

describe('<ActivitiesPage />', () => {
  it('should render the page message', () => {
    shallow(
      <ActivitiesPage />
    );
  });
});
