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

  it('should return cached js routeState for same concurrent calls', () => {
    const route = fromJS({
      locationBeforeTransitions: null,
    });
    const mockedState = fromJS({
      route,
    });
    const selectLocationState = makeSelectLocationState();

    const firstRouteStateJS = selectLocationState(mockedState);
    expect(selectLocationState(mockedState)).toBe(firstRouteStateJS);
  });
});
