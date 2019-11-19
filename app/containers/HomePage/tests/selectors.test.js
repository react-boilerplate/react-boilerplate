import {
  selectHome,
  makeSelectUsername,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
} from '../selectors';
import { initialState } from '../slice';

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState = {
      repos: [],
      loading: false,
      error: false,
    };
    const mockedState = {
      home: homeState,
    };
    expect(selectHome(mockedState)).toEqual(homeState);
  });

  it("should return the initial state if home isn't defined", () => {
    expect(selectHome({})).toEqual(initialState);
  });
});

describe('makeSelectUsername', () => {
  const usernameSelector = makeSelectUsername();
  it('should select the username', () => {
    const username = 'mxstbr';
    const mockedState = {
      home: {
        username,
      },
    };
    expect(usernameSelector(mockedState)).toEqual(username);
  });
});

describe('makeSelectLoading', () => {
  it('should select the loading', () => {
    const loadingSelector = makeSelectLoading();
    const loading = false;
    const mockedState = {
      home: {
        loading,
      },
    };
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  it('should select the error', () => {
    const errorSelector = makeSelectError();
    const error = true;
    const mockedState = {
      home: {
        error,
      },
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectRepos', () => {
  it('should select the repos', () => {
    const reposSelector = makeSelectRepos();
    const repositories = [];
    const mockedState = {
      home: {
        repositories,
      },
    };
    expect(reposSelector(mockedState)).toEqual(repositories);
  });
});
