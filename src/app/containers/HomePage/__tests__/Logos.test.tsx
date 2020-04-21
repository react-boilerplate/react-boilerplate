import React from 'react';
import renderer from 'react-test-renderer';
import { Logos } from '../Logos';

describe('<Logos />', () => {
  it('should render and match the snapshot', () => {
    const renderedOutput = renderer.create(<Logos />).toJSON();
    expect(renderedOutput).toMatchSnapshot();
  });
});
