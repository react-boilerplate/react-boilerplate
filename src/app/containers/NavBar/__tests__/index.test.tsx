import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { NavBar } from '../index';

const shallowRenderer = createRenderer();

describe('<NavBar />', () => {
  it('should match snapshot', () => {
    shallowRenderer.render(<NavBar />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
