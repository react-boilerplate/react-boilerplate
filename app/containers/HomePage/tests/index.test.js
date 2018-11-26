import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import HomePage from '../index';
import AddItem from '../../AddItem';
import messages from '../messages';

describe('<HomePage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<HomePage />);
    expect(
      renderedComponent.contains(<FormattedMessage {...messages.header} />),
    ).toEqual(true);
  });

  it('should render a Wrapper Component', () => {
    const renderedComponent = shallow(<HomePage />);
    expect(renderedComponent.find('Wrapper').length).toBe(1);
  });

  it('should render addItem component', () => {
    const renderedComponent = shallow(
      <HomePage location={{ pathname: '/' }} />,
    );
    expect(renderedComponent.contains(<AddItem />)).toEqual(true);
  });

  it('should match render of HomePage', () => {
    const renderedComponent = shallow(<HomePage />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should match render of addItem component', () => {
    const renderedComponent = shallow(<HomePage />);
    const addItemComponent = renderedComponent.find('AddItem');
    expect(addItemComponent).toMatchSnapshot();
  });
});
