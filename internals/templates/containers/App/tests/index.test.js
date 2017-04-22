import React from 'react';
import { shallow } from 'enzyme';

import Routes from 'routes';

import { App } from '../index';

describe('<App />', () => {
  it('should render routes', () => {
    const renderedComponent = shallow(
      <App />
    );
    expect(renderedComponent.find(Routes).length).toBe(1);
  });
});
