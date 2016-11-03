import ToggleOption from '../index';

import { shallow } from 'enzyme';
import { IntlProvider, defineMessages } from 'react-intl';
import React from 'react';

describe('<ToggleOption />', () => {
  it('should render default language messages', () => {
    const defaultEnMessage = 'someContent';
    const message = defineMessages({
      enMessage: {
        id: 'app.components.LocaleToggle.en',
        defaultMessage: defaultEnMessage,
      },
    });
    const renderedComponent = shallow(
      <IntlProvider locale="en">
        <ToggleOption value="en" message={message.enMessage} />
      </IntlProvider>
    );
    expect(renderedComponent.contains(<ToggleOption value="en" message={message.enMessage} />)).toBe(true);
  });
});
