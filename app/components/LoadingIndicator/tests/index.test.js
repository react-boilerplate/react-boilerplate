import LoadingIndicator from '../index';

import { render } from 'enzyme';

import React from 'react';

describe('<LoadingIndicator />', () => {
  it('should render 13 divs', () => {
    const renderedComponent = render(
      <LoadingIndicator />
    );
    expect(renderedComponent.find('div').length).toBe(13);
  });
});
