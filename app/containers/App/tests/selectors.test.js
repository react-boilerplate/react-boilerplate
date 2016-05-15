import { fromJS } from 'immutable';
import expect from 'expect';

import {
  selectGlobal,
  selectCurrentUser,
  selectLoading,
  selectError,
  selectRepos,
  selectLocationState,
} from '../selectors';

let currentSelector = selectGlobal();

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      global: globalState,
    });
    expect(currentSelector(mockedState)).toEqual(globalState);
  });
});

currentSelector = selectCurrentUser();

describe('selectCurrentUser', () => {
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

currentSelector = selectLoading();

describe('selectLoading', () => {
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

currentSelector = selectError();

describe('selectError', () => {
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

currentSelector = selectRepos();

describe('selectRepos', () => {
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

currentSelector = selectLocationState();

describe('selectLocationState', () => {
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
