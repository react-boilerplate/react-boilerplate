import { AppContainer } from '../index';

import { shallow } from 'enzyme';
import React from 'react';
import configureStore from '../../../store';

describe('<AppContainer />', () => {
  it('uses redux Provider', () => {
    const store = configureStore({});
    const messages = {};

    const renderedComponent = shallow(
      <AppContainer store={store} messages={messages}>
        <div>a child</div>
      </AppContainer>
    );

    expect(renderedComponent.find('Provider').length).toEqual(1);
  });
});
