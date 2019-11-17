import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import LocaleToggle from '../index';
import * as actions from '../../LanguageProvider/actions';
import LanguageProvider from '../../LanguageProvider';

import configureStore from '../../../configureStore';
import { translationMessages } from '../../../i18n';

describe('<LocaleToggle />', () => {
  let store;

  beforeAll(() => {
    actions.changeLocale = jest.fn(() => ({ type: 'test' }));
    store = configureStore({});
  });

  it('should match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <LocaleToggle />
        </LanguageProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should present the default `en` english language option', () => {
    const { queryByDisplayValue } = render(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <LocaleToggle />
        </LanguageProvider>
      </Provider>,
    );
    expect(queryByDisplayValue('en')).toBeInTheDocument();
  });

  it('should dispatch changeLocale when user selects a new option', () => {
    const { container } = render(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <LocaleToggle />
        </LanguageProvider>
      </Provider>,
    );
    const newLocale = 'de';
    const select = container.querySelector('select');
    fireEvent.change(select, { target: { value: newLocale } });
    expect(actions.changeLocale).toHaveBeenCalledWith(newLocale);
  });
});
