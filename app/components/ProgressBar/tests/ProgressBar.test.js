import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import ProgressBar from '../ProgressBar';
import Wrapper from '../Wrapper';
import Percent from '../Percent';

let clock = null;

describe('<ProgressBar />', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock = sinon.restore();
  });

  it('should initially render hidden progress bar', () => {
    const renderedComponent = shallow(
      <ProgressBar />
    );
    expect(renderedComponent.find(Wrapper).length).toEqual(1);
  });

  it('should render render horizontal progress bar', () => {
    const renderedComponent = shallow(
      <ProgressBar />
    );
    expect(renderedComponent.find(Percent).length).toEqual(1);
  });

  it('should set state.percent as props.percent', () => {
    const expected = 50;
    const renderedComponent = mount(
      <ProgressBar percent={expected} />
    );
    expect(renderedComponent.state().percent).toEqual(expected);
  });

  it('should call componentDidMount', () => {
    sinon.spy(ProgressBar.prototype, 'componentDidMount');
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={0} updateProgress={(noop) => noop} />
    );
    expect(ProgressBar.prototype.componentDidMount.calledOnce).toEqual(true);
    ProgressBar.prototype.componentDidMount.restore();
  });

  it('should call componentWillReceiveProps', () => {
    sinon.spy(ProgressBar.prototype, 'componentWillReceiveProps');
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={0} updateProgress={(noop) => noop} />
    );
    renderedComponent.setProps({ percent: 50 });
    expect(ProgressBar.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
    ProgressBar.prototype.componentWillReceiveProps.restore();
  });

  it('should unset ProgressBar.interval after getting new props', () => {
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={0} updateProgress={(noop) => noop} />
    );
    const inst = renderedComponent.instance();

    clock.tick(1000);
    expect(inst.interval).toBeDefined();
    inst.componentWillReceiveProps({ percent: 50 });
    expect(inst.interval).toBeUndefined();
  });

  it('should unset ProgressBar.timeout after getting new props', () => {
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={100} updateProgress={(noop) => noop} />
    );
    const inst = renderedComponent.instance();

    clock.tick(1000);
    expect(inst.timeout).toBeDefined();
    inst.componentWillReceiveProps({ percent: 50 });
    expect(inst.timeout).toBeUndefined();
  });

  it('should set state to -1 after new route mounts', () => {
    const renderedComponent = mount(
      <ProgressBar percent={0} updateProgress={(noop) => noop} />
    );
    renderedComponent.setProps({ percent: 100 });
    clock.tick(501);
    expect(renderedComponent.state().percent).toEqual(-1);
  });

  it('should call componentWillUnmount', () => {
    sinon.spy(ProgressBar.prototype, 'componentWillUnmount');
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={0} updateProgress={(noop) => noop} />
    );
    renderedComponent.unmount();
    expect(ProgressBar.prototype.componentWillUnmount.calledOnce).toEqual(true);
    ProgressBar.prototype.componentWillUnmount.restore();
  });

  it('should unset ProgressBar.interval after unmounting', () => {
    sinon.spy(ProgressBar.prototype, 'componentWillUnmount');
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={0} updateProgress={(noop) => noop} />
    );
    const inst = renderedComponent.instance();

    clock.tick(1000);
    expect(inst.interval).toBeDefined();
    renderedComponent.unmount();
    expect(inst.interval).toBeUndefined();
    ProgressBar.prototype.componentWillUnmount.restore();
  });

  it('should unset ProgressBar.timeout after unmounting', () => {
    sinon.spy(ProgressBar.prototype, 'componentWillUnmount');
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={100} updateProgress={(noop) => noop} />
    );
    const inst = renderedComponent.instance();

    clock.tick(1000);
    expect(inst.timeout).toBeDefined();
    renderedComponent.unmount();
    expect(inst.timeout).toBeUndefined();
    ProgressBar.prototype.componentWillUnmount.restore();
  });

  describe('increment progress', () => {
    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock = sinon.restore();
    });

    it('should start incrementing progress if 0 <= percent < 100', () => {
      const initialPercent = 50;
      const renderedComponent = mount(
        <ProgressBar percent={initialPercent} updateProgress={(noop) => noop} />
      );
      clock.tick(1000);
      expect(renderedComponent.state().percent).toBeGreaterThan(initialPercent);
    });

    it('should stop incrementing progress if percent >= 100', () => {
      const initialPercent = 100;
      const expected = -1;
      const renderedComponent = mount(
        <ProgressBar percent={initialPercent} updateProgress={(noop) => noop} />
      );
      clock.tick(1000);
      expect(renderedComponent.state().percent).toEqual(expected);
    });
  });
});
