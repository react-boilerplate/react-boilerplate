import expect from 'expect';
import globalReducer from '../reducer';
import {
  changeUsername,
  loadRepos,
  reposLoaded,
  repoLoadingError
} from '../actions';
import { fromJS } from 'immutable';

describe('globalReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      currentUser: false,
      userData: fromJS({
        repositories: false,
        username: ''
      })
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(globalReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeUsername action correctly', () => {
    const fixture = 'mxstbr';
    const expectedResult = state.setIn(['userData', 'username'], fixture);

    expect(globalReducer(state, changeUsername(fixture))).toEqual(expectedResult);
  });

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = state.set('loading', 'true').set('error', false).setIn(['userData', 'repositories'], false);

    expect(globalReducer(state, loadRepos())).toEqual(expectedResult);
  });

  it('should handle the reposLoaded action correctly', () => {
    const fixture = [{
      name: 'My Repo'
    }];
    const expectedResult = state
      .setIn(['userData', 'repositories'], fixture)
      .set('loading', false)
      .set('currentUser', state.getIn(['userData', 'username']));

    expect(globalReducer(state, reposLoaded(fixture))).toEqual(expectedResult);
  });

  it('should handle the repoLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found'
    };
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false);

    expect(globalReducer(state, repoLoadingError(fixture))).toEqual(expectedResult);
  });
});
