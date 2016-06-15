import Toggle from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import { IntlProvider, defineMessages } from 'react-intl';
import React from 'react';

describe('<Toggle />', () => {
  it('should contain default text', () => {
    const defaultEnMessage = 'someContent';
    const defaultDeMessage = 'someOtherContent';
    const messages = defineMessages({
      en: {
        id: 'app.components.LocaleToggle.en',
        defaultMessage: defaultEnMessage,
      },
      de: {
        id: 'app.components.LocaleToggle.en',
        defaultMessage: defaultDeMessage,
      },
    });
    const renderedComponent = shallow(
      <IntlProvider locale="en">
        <Toggle values={['en', 'de']} messages={messages} />
      </IntlProvider>
    );
    console.log('LOC', renderedComponent.find('en'));
    expect(renderedComponent.contains(<option value="en" />)).toEqual(true);
  });
});
