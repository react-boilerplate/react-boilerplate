import React from 'react';
import renderer from 'react-test-renderer';
import { Masthead } from '../Masthead';

describe('<Masthead />', () => {
  it('should render and match the snapshot', () => {
    const renderedOutput = renderer.create(<Masthead />).toJSON();
    expect(renderedOutput).toMatchSnapshot();
  });
});
