import { FeaturePage } from './index';
import H1 from 'H1';

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

describe('<FeaturePage />', () => {
  it('should render its heading', () => {
    const renderedComponent = shallow(
      <FeaturePage />
    );
    expect(renderedComponent.contains(<H1>Features</H1>)).toEqual(true);
  });

  it('should list the features', () => {
    const renderedComponent = shallow(
      <FeaturePage />
    );
    const expectedText = '<H1 />Using <A />, your changes in the CSS and JS get reflected in the app instantly without refreshing the page. That means that the current application state persists even when you change something in the underlying code! For a very good explanation and demo watch Dan Abramov himself <A />.<A /> is a much better implementation of a flux–like, unidirectional data flow. Redux makes actions composable, reduces the boilerplate code and makes hot–reloading possible in the first place. For a good overview of redux check out the talk linked above or the <A />!<A /> is like Sass, but modular and capable of much more. PostCSS is, in essence, just a wrapper for plugins which exposes an easy to use, but very powerful API. While it is possible to <A /> with PostCSS, PostCSS has an <A /> with functionalities Sass cannot even dream about having.Unit tests should be an important part of every web application developers toolchain. <A /> checks your application is working exactly how it should without you lifting a single finger. Congratulations, you just won a First Class ticket to world domaination, fasten your seat belt please!<A /> is used for routing in this boilerplate. react-router makes routing really easy to do and takes care of a lot of the work.<A /> and <A /> make it possible to use the application offline. As soon as the website has been opened once, it is cached and available without a network connection. <A /> is specifically for Chrome on Android. Users can add the website to the homescreen and use it like a native app!<Button />';
    expect(renderedComponent.text()).toEqual(expectedText);
  });

  it('should link to "/"', () => {
    const openRouteSpy = expect.createSpy();

    // Spy on the openRoute method of the FeaturePage
    const openRoute = (dest) => {
      if (dest === '/') {
        openRouteSpy();
      }
    };

    const renderedComponent = mount(
      <FeaturePage changeRoute={openRoute} />
    );
    const button = renderedComponent.find('button');
    button.simulate('click');
    expect(openRouteSpy).toHaveBeenCalled();
  });
});
