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
import ErrorBoundary from 'react-error-boundary';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ErrorFallback from 'components/ErrorFallback';
import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';

import { handleError } from './actions';
import saga from './saga';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export const App = ({ handleError: errorHandler }) => (
  <AppWrapper>
    <Helmet
      titleTemplate="%s - React.js Boilerplate"
      defaultTitle="React.js Boilerplate"
    >
      <meta
        name="description"
        content="A React.js Boilerplate application"
      />
    </Helmet>
    <ErrorBoundary
      onError={errorHandler}
      FallbackComponent={<ErrorFallback />}
    >
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
    </ErrorBoundary>
  </AppWrapper>
);

App.propTypes = {
  handleError: PropTypes.func,
};

export default App;
// export function mapDispatchToProps(dispatch) {
//   return {
//     handleError: (err) => dispatch(handleError(err)),
//   };
// }
//
// export default compose(
//   injectSaga({ key: 'appError', saga, mode: DAEMON }), // spawn watcher
//   connect(null, mapDispatchToProps) // connect to store, bind action creator
// )(App);
