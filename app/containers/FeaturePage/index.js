/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import messages from './messages';
import { FormattedMessage } from 'react-intl';
import Button from 'components/Button';
import H1 from 'components/H1';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';

export class FeaturePage extends React.Component {
  openHomePage = () => {
    this.props.dispatch(push('/'));
  };

  render() {
    return (
      <div>
        <Helmet
          title="Feature Page"
          meta={[
            { name: 'description', content: 'Feature page of React.js Boilerplate application' },
          ]}
        />
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <List>
          <ListItem>
            <ListItemTitle>
              <FormattedMessage {...messages.scaffoldingHeader} />
            </ListItemTitle>
            <p>
              <FormattedMessage {...messages.scaffoldingMessage} />
            </p>
          </ListItem>

          <ListItem>
            <ListItemTitle>
              <FormattedMessage {...messages.feedbackHeader} />
            </ListItemTitle>
            <p>
              <FormattedMessage {...messages.feedbackMessage} />
            </p>
          </ListItem>

          <ListItem>
            <ListItemTitle>
              <FormattedMessage {...messages.routingHeader} />
            </ListItemTitle>
            <p>
              <FormattedMessage {...messages.routingMessage} />
            </p>
          </ListItem>

          <ListItem>
            <ListItemTitle>
              <FormattedMessage {...messages.networkHeader} />
            </ListItemTitle>
            <p>
              <FormattedMessage {...messages.networkMessage} />
            </p>
          </ListItem>

          <ListItem>
            <ListItemTitle>
              <FormattedMessage {...messages.intlHeader} />
            </ListItemTitle>
            <p>
              <FormattedMessage {...messages.intlMessage} />
            </p>
          </ListItem>
        </List>
        <Button handleRoute={this.openHomePage}>
          <FormattedMessage {...messages.homeButton} />
        </Button>
      </div>
    );
  }
}

FeaturePage.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect()(FeaturePage);
