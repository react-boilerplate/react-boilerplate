import { expect } from 'chai';
import homeReducer from '../reducer';
import {
  changeUsername,
} from '../actions';
import { Record } from 'immutable';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    const HomeRecord = Record({ username: '' }, 'HomeRecord'); // eslint-disable-line
    state = new HomeRecord({});
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).to.equal(expectedResult);
  });

  it('should handle the changeUsername action correctly', () => {
    const fixture = 'mxstbr';
    const expectedResult = state.set('username', fixture);

    expect(homeReducer(state, changeUsername(fixture))).to.equal(expectedResult);
  });
});
