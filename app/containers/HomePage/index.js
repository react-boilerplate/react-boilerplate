/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Navbar from '../../components/Navbar';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <Navbar />
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <p>
          <FormattedMessage {...messages.body} />
        </p>
      </Fragment>
    );
  }
}
