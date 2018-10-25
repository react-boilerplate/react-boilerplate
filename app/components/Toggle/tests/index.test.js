import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider, defineMessages } from 'react-intl';

import Toggle from '../index';

describe('<Toggle />', () => {
  it('should contain default text', () => {
    const defaultEnMessage = 'someContent';
    const defaultDeMessage = 'someOtherContent';
    const messages = defineMessages({
      en: {
        id: 'boilerplate.containers.LocaleToggle.en',
        defaultMessage: defaultEnMessage,
      },
      de: {
        id: 'boilerplate.containers.LocaleToggle.en',
        defaultMessage: defaultDeMessage,
      },
    });
    const renderedComponent = shallow(
      <IntlProvider locale="en">
        <Toggle values={['en', 'de']} messages={messages} />
      </IntlProvider>,
    );
    expect(
      renderedComponent.contains(
        <Toggle values={['en', 'de']} messages={messages} />,
      ),
    ).toBe(true);
    expect(renderedComponent.find('option')).toHaveLength(0);
  });
  it('should not have ToggleOptions if props.values is not defined', () => {
    const renderedComponent = shallow(<Toggle />);
    expect(renderedComponent.contains(<option>--</option>)).toBe(true);
    expect(renderedComponent.find('option')).toHaveLength(1);
  });
});
