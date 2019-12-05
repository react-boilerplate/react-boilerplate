import React from 'react';
import { render } from '@testing-library/react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Provider } from 'react-redux';

import LanguageProvider from '../index';
import configureStore from '../../../configureStore';

import { translationMessages } from '../../../i18n';

const messages = defineMessages({
  someMessage: {
    id: 'boilerplate.containers.LanguageProvider.index.test',
    defaultMessage: 'This is some default message',
  },
});

describe('<LanguageProvider />', () => {
  let store;

  beforeEach(() => {
    // The language store must be defined with an `undefined`` locale otherwise the DEFAULT_LOCALE
    // will be set to 'en' from `app/locales.js` which "breaks" the testing for `defaultMessage``
    store = configureStore({ language: { locale: undefined } });
  });

  it('should render its children', () => {
    const text = 'Test';
    const children = <h1>{text}</h1>;
    const { queryByText } = render(
      <Provider store={store}>
        <LanguageProvider messages={messages}>{children}</LanguageProvider>
      </Provider>,
    );
    expect(queryByText(text)).toBeInTheDocument();
  });

  it('should render the default language messages', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <FormattedMessage {...messages.someMessage} />
        </LanguageProvider>
      </Provider>,
    );
    expect(
      queryByText(messages.someMessage.defaultMessage),
    ).toBeInTheDocument();
  });

  it.each(Object.keys(translationMessages))(
    'should render the specified "%s" language messages',
    locale => {
      const languageState = { locale };
      const mockedState = {
        language: languageState,
      };
      const { queryByText } = render(
        <Provider store={configureStore(mockedState)}>
          <LanguageProvider messages={translationMessages}>
            <FormattedMessage {...messages.someMessage} />
          </LanguageProvider>
        </Provider>,
      );
      if (
        locale === 'en' ||
        translationMessages[locale][messages.someMessage.id]
      ) {
        expect(
          queryByText(translationMessages[locale][messages.someMessage.id]),
        ).toBeInTheDocument();
      } else {
        expect(
          queryByText(messages.someMessage.defaultMessage),
        ).toBeInTheDocument();
      }
    },
  );
});
