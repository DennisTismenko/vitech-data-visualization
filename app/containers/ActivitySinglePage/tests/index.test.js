import React from 'react';
import { shallow } from 'enzyme';

import ActivitySinglePage from '../index';

describe('<ActivitySinglePage />', () => {
  it('should render an activity page', () => {
    shallow(
      <ActivitySinglePage params={{ id: 1 }} />
    );
  });

  it('should render should fail to render activity page', () => {
    shallow(
      <ActivitySinglePage params={{ id: 'abc' }} />
    );
  });
});
