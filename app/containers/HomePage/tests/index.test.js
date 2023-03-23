/**
 * Test the HomePage
 */

import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { HomePage, mapDispatchToProps } from '../index';
import { loadStrings } from '../../App/actions';
import configureStore from '../../../configureStore';

describe('<HomePage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <HomePage loading={false} error={false} repos={[]} />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should fetch the repos on mount if a repos == false', () => {
    const submitSpy = jest.fn();
    render(
      <Provider store={store}>
        <HomePage
          repos={false}
          onLoadStringList={submitSpy}
        />
      </Provider>,
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should not call onLoadStringList if repos != false', () => {
    const submitSpy = jest.fn();
    render(
      <Provider store={store}>
        <HomePage repos="" onLoadStringList={submitSpy} />
      </Provider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  describe('onLoadStringList', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.onLoadStringList).toBeDefined();
    });

    it('should dispatch loadStrings when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.onLoadStringList();
      expect(dispatch).toHaveBeenCalledWith(loadStrings());
    });

    it('should preventDefault if called with event', () => {
      const preventDefault = jest.fn();
      const result = mapDispatchToProps(() => { });
      const evt = { preventDefault };
      result.onLoadStringList(evt);
      expect(preventDefault).toHaveBeenCalledWith();
    });
  });
});
