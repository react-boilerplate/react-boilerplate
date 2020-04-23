import React from 'react';
import { Masthead } from '../Masthead';
import { createRenderer } from 'react-test-renderer/shallow';

const shallowRenderer = createRenderer();

describe('<Masthead />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<Masthead />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
