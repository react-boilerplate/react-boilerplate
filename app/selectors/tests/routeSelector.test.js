import routeSelector from '../routeSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

const selector = routeSelector();

describe('routeSelector', () => {
  it('should select the route', () => {
    const route = fromJS({
      location: '',
    });
    const mockedState = fromJS({
      route,
    });
    expect(selector(mockedState)).toEqual(route);
  });
});
