import React from 'react';
import { shallow } from 'enzyme';

import { ProgressBarWrapper, ProgressBarPercent } from '../styles';

describe('<ProgressBarWrapper /> and <ProgressBarPercent />', () => {
  it('<ProgressBarWrapper /> should render an <div> tag', () => {
    const renderedComponent = shallow(<ProgressBarWrapper />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('<ProgressBarPercent /> should render an <div> tag', () => {
    const renderedComponent = shallow(<ProgressBarPercent />);
    expect(renderedComponent.type()).toEqual('div');
  });
});
