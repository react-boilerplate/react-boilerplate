import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

import Button from 'components/Button';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import { FeaturePage } from '../index';
import H1 from 'components/H1';

describe('<FeaturePage />', () => {
  it('should render its heading', () => {
    const renderedComponent = shallow(
      <FeaturePage />
    );
    expect(renderedComponent.contains(
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    )).toEqual(true);
  });

  it('should link to "/"', (done) => {
    // Spy on the openRoute method of the FeaturePage
    const dispatch = (action) => {
      expect(action.payload.args).toEqual('/');
      done();
    };

    const renderedComponent = shallow(
      <FeaturePage dispatch={dispatch} />
    );
    const button = renderedComponent.find(Button);
    button.prop('handleRoute')();
  });
});
