import { fromJS } from 'immutable';


import { selectLocationState } from 'containers/App/selectors';

describe('selectLocationState', () => {
  it('should select the route as a plain JS object', () => {
    const route = fromJS({
      locationBeforeTransitions: null,
    });
    const mockedState = fromJS({
      route,
    });
    expect(selectLocationState()(mockedState)).toEqual(route.toJS());
  });
});
