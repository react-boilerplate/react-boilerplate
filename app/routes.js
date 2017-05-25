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

import loadHomePage from 'containers/HomePage/loader';
import loadFeaturePage from 'containers/FeaturePage/loader';
import loadNotFoundPage from 'containers/NotFoundPage/loader';

function Routes({ location }) {
  return (
    <Switch location={location}>
      <AsyncRoute
        exact path="/" load={loadHomePage}
      />
      <AsyncRoute
        exact path="/features" load={loadFeaturePage}
      />
      <AsyncRoute
        path="" load={loadNotFoundPage}
      />
    </Switch>
  );
}

Routes.propTypes = {
  location: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

export default connect(mapStateToProps)(Routes);
