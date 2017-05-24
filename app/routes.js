// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business

import React from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AsyncRoute from 'routing/AsyncRoute';
import { makeSelectLocation } from 'containers/App/selectors';

import createHomePageLoader from 'containers/HomePage/loader';
import createFeaturePageLoader from 'containers/FeaturePage/loader';
import createNotFoundPageLoader from 'containers/NotFoundPage/loader';

class Routes extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static contextTypes = {
    store: React.PropTypes.object,
  };

  static propTypes = {
    location: React.PropTypes.object,
  };

  render() {
    const store = this.context.store;
    return (
      <Switch location={this.props.location}>
        <AsyncRoute
          exact path="/" load={createHomePageLoader(store)}
        />
        <AsyncRoute
          exact path="/features" load={createFeaturePageLoader(store)}
        />
        <AsyncRoute
          path="" load={createNotFoundPageLoader(store)}
        />
      </Switch>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

export default connect(mapStateToProps)(Routes);
