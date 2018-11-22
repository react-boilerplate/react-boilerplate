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
import Button from '../../components/UI/Button';
import Input from '../../components/Input/StyledInput';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  handleClick() {
    console.log('Testing clicke');
  }

  render() {
    return (
      <Fragment>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <p>
          <FormattedMessage {...messages.body} />
        </p>
        Add item:
        <Input />
        <Button type="submit" onClick={this.handleClick}>
          Submit
        </Button>
      </Fragment>
    );
  }
}
