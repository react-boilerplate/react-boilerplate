import { makeSelectLocationState } from 'containers/App/selectors';

describe('makeSelectLocationState', () => {
  it('should select the route as a plain JS object', () => {
    const route = {
      locationBeforeTransitions: null,
    };
    const mockedState = {
      route,
    };
    expect(makeSelectLocationState()(mockedState)).toEqual(route);
  });

  it('should return cached js routeState for same concurrent calls', () => {
    const route = {
      locationBeforeTransitions: null,
    };
    const mockedState = {
      route,
    };
    const selectLocationState = makeSelectLocationState();

    const firstRouteStateJS = selectLocationState(mockedState);
    expect(selectLocationState(mockedState)).toBe(firstRouteStateJS);
  });
});
