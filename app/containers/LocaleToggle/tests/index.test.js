import LocaleToggle from '../index';
import LanguageProvider from '../../LanguageProvider';

import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from '../../../store';
import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

describe('<LocaleToggle />', () => {
  let store;

  before(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render the default language messages', () => {
    const renderedComponent = shallow(
      <Provider store={store}>
        <LanguageProvider>
          <LocaleToggle />
        </LanguageProvider>
      </Provider>
    );
    expect(renderedComponent.contains('en')).toEqual(true);
  });
});
