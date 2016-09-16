import App from '../index';
import Footer from 'components/Footer';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<App />', () => {
  it('should render the logo', () => {
    const renderedComponent = shallow(
      <App />
    );
    expect(renderedComponent.find('Img').length).toEqual(1);
  });

  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <App>
        {children}
      </App>
    );
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should render the footer', () => {
    const renderedComponent = shallow(
      <App />
    );
    expect(renderedComponent.find(Footer).length).toEqual(1);
  });
});
