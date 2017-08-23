/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet  from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import AsyncRoute from 'routing/AsyncRoute';

import createHomePageLoader from 'containers/HomePage/loader';
import createFeaturePageLoader from 'containers/FeaturePage/loader';
import createNotFoundPageLoader from 'containers/NotFoundPage/loader';

import Header from 'components/Header';
import Footer from 'components/Footer';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App(props) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <Footer />

      <Switch>
        <AsyncRoute
          exact path="/" load={createHomePageLoader(props.store)}
        />
        <AsyncRoute
          exact path="/features" load={createFeaturePageLoader(props.store)}
        />
        <AsyncRoute
          path="*" load={createNotFoundPageLoader(props.store)}
        />
      </Switch>
    </AppWrapper>
  );
}

App.propTypes = {
  store: React.PropTypes.object,
};
