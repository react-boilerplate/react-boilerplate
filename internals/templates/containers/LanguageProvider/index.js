/*
 *
 * LanguageProvider
 *
 * This component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { useInjectSaga } from 'redux-injectors';

import saga from './saga';
import { makeSelectLocale, makeSelectMessages } from './selectors';

const stateSelector = createStructuredSelector({
  locale: makeSelectLocale(),
  messages: makeSelectMessages(),
});

const key = 'languageSaga';

export default function LanguageProvider(props) {
  useInjectSaga({ key, saga });
  const { locale, messages } = useSelector(stateSelector);
  return (
    <IntlProvider locale={locale} messages={messages}>
      {React.Children.only(props.children)}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
