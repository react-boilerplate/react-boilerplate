/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { withErrorBoundary } from 'react-error-boundary';

import ErrorFallback from 'containers/ErrorFallback';
// Async bundles (code split-points)
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import ErrorPage from 'containers/ErrorPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Dumb components
import Header from 'components/Header';
import Footer from 'components/Footer';

import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import { makeSelectLocation } from './selectors';
import saga from './saga';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export function App({ location }) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <Switch location={location}>
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="/error" component={ErrorPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
    </AppWrapper>
  );
}

App.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

export default compose(
  injectSaga({ key: 'appError', saga, mode: DAEMON }), // spawn watcher
  connect(mapStateToProps), // connect to store, bind action creator
  (wrappedComponent) => withErrorBoundary(wrappedComponent, ErrorFallback), // use ErrorBoundary
)(App);
