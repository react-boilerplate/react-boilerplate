import { fromJS } from 'immutable';
import expect from 'expect';

import {
  globalSelector,
  currentUserSelector,
  loadingSelector,
  errorSelector,
  reposSelector,
  selectLocationSelector,
} from '../selectors';

let currentSelector = globalSelector();

describe('globalSelector', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      global: globalState,
    });
    expect(currentSelector(mockedState)).toEqual(globalState);
  });
});

currentSelector = currentUserSelector();

describe('currentUserSelector', () => {
  it('should select the current user', () => {
    const username = 'mxstbr';
    const mockedState = fromJS({
      global: {
        username,
      },
    });
    expect(currentSelector(mockedState)).toEqual(username);
  });
});

currentSelector = loadingSelector();

describe('loadingSelector', () => {
  it('should select the loading', () => {
    const loading = false;
    const mockedState = fromJS({
      global: {
        loading,
      },
    });
    expect(currentSelector(mockedState)).toEqual(loading);
  });
});

currentSelector = errorSelector();

describe('errorSelector', () => {
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      global: {
        error,
      },
    });
    expect(currentSelector(mockedState)).toEqual(error);
  });
});

currentSelector = reposSelector();

describe('reposSelector', () => {
  it('should select the repos', () => {
    const repositories = fromJS([]);
    const mockedState = fromJS({
      global: {
        userData: {
          repositories,
        },
      },
    });
    expect(currentSelector(mockedState)).toEqual(repositories);
  });
});

currentSelector = selectLocationSelector();

describe('selectLocationSelector', () => {
  it('should select the route as a plain JS object', () => {
    const route = fromJS({
      locationBeforeTransitions: null,
    });
    const mockedState = fromJS({
      route,
    });
    expect(currentSelector(mockedState)).toEqual(route.toJS());
  });
});
