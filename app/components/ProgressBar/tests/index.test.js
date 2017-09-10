import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import withProgressBar from '../index';
import ProgressBar from '../ProgressBar';

let clock = null;
const sandbox = sinon.sandbox.create();

describe('withProgressBar()', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock = sandbox.restore();
  });

  function Component() {
    return (
      <div></div>
    );
  }

  const router = {
    listenBefore: () => (() => {}),
  };

  const HocComponent = withProgressBar(Component);

  it('Should exist', () => {
    const renderedComponent = mount(
      <HocComponent />
    );

    expect(renderedComponent.find(Component).length).toBe(1);
  });

  it('Should render <ProgressBar />', () => {
    const renderedComponent = mount(
      <HocComponent />
    );

    expect(renderedComponent.find(ProgressBar).length).toBe(1);
  });

  it('Should initially have state.progress = -1', () => {
    const renderedComponent = mount(
      <HocComponent />
    );

    expect(renderedComponent.state().progress).toBe(-1);
  });

  it('Should initially have state.loadedRoutes = current route', () => {
    const renderedComponent = mount(
      <HocComponent location={{ pathname: '/' }} />
    );

    expect(renderedComponent.state().loadedRoutes[0]).toBe('/');
  });

  it('Should listen to route changes', () => {
    const renderedComponent = mount(
      <HocComponent location={{ pathname: '/' }} router={router} />
    );

    const inst = renderedComponent.instance();
    expect(inst.unsubscribeHistory).toBeTruthy();
  });

  it('Should unset listener when unmounted', () => {
    const renderedComponent = mount(
      <HocComponent location={{ pathname: '/' }} router={router} />
    );

    const inst = renderedComponent.instance();
    inst.componentWillUnmount();
    expect(inst.unsubscribeHistory).toBeFalsy();
  });

  it('Should update state.progress when called updateProgress()', () => {
    const renderedComponent = mount(
      <HocComponent location={{ pathname: '/' }} router={router} />
    );

    const inst = renderedComponent.instance();
    inst.updateProgress(10);
    expect(renderedComponent.state().progress).toBe(10);
  });

  it('Should start progress bar for a new route', () => {
    const renderedComponent = mount(
      <HocComponent location={{ pathname: '/' }} router={router} />
    );

    renderedComponent.setState({ loadedRoutes: [], progress: 10 });
    renderedComponent.setProps({ location: { pathname: '/abc' }, router });
    clock.tick(10);
    expect(renderedComponent.state().progress).toBe(100);
  });

  it('Should start progress bar only when changing route', () => {
    const renderedComponent = mount(
      <HocComponent location={{ pathname: '/' }} router={router} />
    );
    const inst = renderedComponent.instance();
    inst.updateProgress = jest.fn(inst.updateProgress);

    renderedComponent.setState({ loadedRoutes: [], progress: 10 });
    renderedComponent.setProps({ location: { pathname: '/abc' }, router });
    clock.tick(10);
    expect(inst.updateProgress).toHaveBeenCalled();
    expect(renderedComponent.state().progress).toBe(100);
    inst.updateProgress.mockReset();
    renderedComponent.setProps({ location: { pathname: '/abc' }, router });
    expect(inst.updateProgress).not.toHaveBeenCalled();
    expect(renderedComponent.state().progress).toBe(100);
  });
});
