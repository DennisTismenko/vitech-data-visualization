import React from 'react';
import { shallow } from 'enzyme';

import ActivitySinglePage from '../index';

describe('<ActivitySinglePage />', () => {
  it('should render the page message', () => {
    shallow(
      <ActivitySinglePage />
    );
  });
});
