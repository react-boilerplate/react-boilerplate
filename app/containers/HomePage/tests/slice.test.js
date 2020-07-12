import produce from 'immer';

import { reducer, changeUsername } from '../slice';

describe('slice actions and reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      username: '',
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(reducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeUsername action correctly', () => {
    const fixture = 'mxstbr';
    const expectedResult = produce(state, draft => {
      draft.username = fixture;
    });

    expect(reducer(state, changeUsername({ username: fixture }))).toEqual(
      expectedResult,
    );
  });
});
