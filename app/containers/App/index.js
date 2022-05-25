/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

/** ---- Vault Vision added imports for auth ---- */
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import history from 'utils/history';

import { useInjectSaga } from 'utils/injectSaga';

import { makeSelectUser } from 'containers/App/selectors';

import DashboardPage from 'containers/Dashboard/Loadable';
import Profile from 'containers/Profile/Loadable';
import OidcCallback from 'containers/OidcCallback/Loadable';
import Auth from 'containers/Auth/Loadable';
/** ---- end block ----  */

import Header from 'components/Header';
import Footer from 'components/Footer';
import { loadUser } from './actions';
import saga from './saga';

/**
 * useAuth oidc-react hook gives us access to methods
 */

import GlobalStyle from '../../global-styles';
const key = 'app';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export function App({ user }) {
  /** ----  Vault Vision added code block ---- */
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();

  // This useEffect is to trigger an action that will reload a user from local session state
  // This is needed if a user is logged in and refreshes the page and the entire app reloads
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const isLoggedIn = () => {
    console.log(`user: ${user}`);
    if (user) {
      return true;
    }
    return false;
  };

  // This block sets up PrivateRoute feature that turns an route into an authentication required route
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() === true ? <Component {...props} /> : history.push('/auth')
      }
    />
  );
  /** ---- end block ----  */

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        {/** ----  Vault Vision added code block ---- */}
        {/** The /auth route is what will initiate a new login flow, and redirect the user to Vault Vision login page */}
        <Route path="/auth" component={Auth} />
        {/** gets all request to /dashboard and renders the dashboardPage, and requires auth */}
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        {/** gets all request to /profile and renders the profilePage, and requires auth */}
        <PrivateRoute path="/profile" component={Profile} />
        {/** The /oidc/callback route is what will receive the user returning from Vault Vision login page with a JWT */}
        <Route path="/oidc/callback" component={OidcCallback} />

        {/** ---- end block ---- */}
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}

/** ----  Vault Vision added code block ---- */
App.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(App);
/** ---- end block ----  */
