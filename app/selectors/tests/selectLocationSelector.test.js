import selectLocationSelector from '../selectLocationSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

const selector = selectLocationSelector();

describe('selectLocationSelector', () => {
  it('should select the route as a plain JS object', () => {
    const route = fromJS({
      locationBeforeTransitions: null,
    });
    const mockedState = fromJS({
      route,
    });
    expect(selector(mockedState)).toEqual(route.toJS());
  });
});
