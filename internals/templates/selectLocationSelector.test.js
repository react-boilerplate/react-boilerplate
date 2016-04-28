import { fromJS } from 'immutable';
import expect from 'expect';

import selectLocationSelector from 'selectors/selectLocationSelector';

describe('selectLocationSelector', () => {
  it('should select the route as a plain JS object', () => {
    const route = fromJS({
      locationBeforeTransitions: null,
    });
    const mockedState = fromJS({
      route,
    });
    expect(selectLocationSelector(mockedState)).toEqual(route.toJS());
  });
});
