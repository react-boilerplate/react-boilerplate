import expect from 'expect';
import { render } from 'enzyme';
import React from 'react';

import Header from '../index';

describe('<Header />', () => {
  it('should render the logo', () => {
    const renderedComponent = render(
      <Header />
    );
    expect(renderedComponent.find('img').length).toEqual(1);
  });
});
