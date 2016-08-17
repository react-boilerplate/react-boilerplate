/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import messages from './messages';
import { FormattedMessage } from 'react-intl';
import Button from 'components/Button';
import H1 from 'components/H1';

export function NotFound(props) {
  return (
    <article>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
      <Button
        handleRoute={function redirect() {
          props.dispatch(push('/'));
        }}
      >
        <FormattedMessage {...messages.homeButton} />
      </Button>
    </article>
  );
}

NotFound.propTypes = {
  dispatch: React.PropTypes.func,
};

// Wrap the component to inject dispatch and state into it
export default connect()(NotFound);
