/*
 * About
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import {
  AboutContainer,
  AboutText,
  HeadshotContainer,
  Headshot,
} from './styled';
import Richard from '../../images/richard.jpg';

export default class About extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <AboutContainer>
        <HeadshotContainer>
          <Headshot src={Richard} />
        </HeadshotContainer>
        <AboutText>
          <FormattedMessage {...messages.p1} />
        </AboutText>
        <AboutText>
          <FormattedMessage {...messages.p2} />
        </AboutText>
        <AboutText>
          <FormattedMessage {...messages.p3} />
        </AboutText>
        <AboutText>
          <FormattedMessage {...messages.p4} />
        </AboutText>
        <AboutText>
          <FormattedMessage {...messages.p5} />
        </AboutText>
      </AboutContainer>
    );
  }
}
