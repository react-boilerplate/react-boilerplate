import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJS from '../toJS';

const TestComponent = () => <div>{'Awesome Sauce'}</div>;

const TestComponentToJS = toJS(TestComponent);

describe('The toJS HOC', () => {
  it('should handle non-immutable props', () => {
    const component = shallow(<TestComponentToJS list={[1, 2, 3]} obj={{ party: true }} />);
    expect(component.props().list).toEqual([1, 2, 3]);
    expect(component.props().obj).toEqual({ party: true });
  });

  it('should handle immutable props', () => {
    const component = shallow(<TestComponentToJS list={fromJS([1, 2, 3])} obj={fromJS({ party: true })} />);
    expect(component.props().list).toEqual([1, 2, 3]);
    expect(component.props().obj).toEqual({ party: true });
  });
});
