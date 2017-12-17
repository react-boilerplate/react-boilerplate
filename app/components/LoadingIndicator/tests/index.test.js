import React from 'react';
import { render } from 'enzyme';

import LoadingIndicator from '../index';

describe('<LoadingIndicator />', () => {
  it('should render 12 child divs', () => {
    const renderedComponent = render(
      <LoadingIndicator />
    );
    // find all child divs
    expect(renderedComponent.find('div').length).toBe(12);
  });
});
