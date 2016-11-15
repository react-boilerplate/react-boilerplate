import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

import Header from '../index';

describe('<Header />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <Header />
    );
    expect(renderedComponent.find('div').length).toEqual(1);
  });
});
