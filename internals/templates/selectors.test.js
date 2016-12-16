import { fromJS } from 'immutable';

import { makeSelectLocationState } from 'containers/App/selectors';

describe('makeSelectLocationState', () => {
  it('should select the route as a plain JS object', () => {
    const route = fromJS({
      locationBeforeTransitions: null,
    });
    const mockedState = fromJS({
      route,
    });
    expect(makeSelectLocationState()(mockedState)).toEqual(route.toJS());
  });
});
