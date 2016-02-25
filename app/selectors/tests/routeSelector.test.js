import routeSelector from '../routeSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

describe('routeSelector', () => {
  it('should select the route', () => {
    const route = fromJS({
      location: '',
    });
    const mockedState = fromJS({
      route,
    });
    expect(routeSelector(mockedState)).toEqual(route);
  });
});
