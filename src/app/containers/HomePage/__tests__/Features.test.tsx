import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { Features } from '../Features';
import i18next from 'i18next';

const shallowRenderer = createRenderer();

describe('<Features />', () => {
  it('should render with en translations', () => {
    i18next.changeLanguage('en');
    shallowRenderer.render(<Features />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should render with de translations', () => {
    i18next.changeLanguage('de');
    shallowRenderer.render(<Features />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should render different after language change', () => {
    i18next.changeLanguage('en');
    shallowRenderer.render(<Features />);
    const renderedOutput1 = shallowRenderer.getRenderOutput();

    i18next.changeLanguage('de');
    shallowRenderer.render(<Features />);
    const renderedOutput2 = shallowRenderer.getRenderOutput();

    expect(renderedOutput1).not.toEqual(renderedOutput2);
  });
});
