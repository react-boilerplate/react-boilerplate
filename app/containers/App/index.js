/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import SiteHeader from 'components/SiteHeader';
import Footer from 'components/Footer';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { ManufacturerContainer } from 'containers/ManufacturerContainer';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(100% - 3%);
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - Manin" defaultTitle="Manin">
        <meta
          name="description"
          content="Manin: Inventory and Accounting application"
        />
      </Helmet>
      <SiteHeader />
      <div style={{ flex: 1, marginTop: '5em' }}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/features" component={FeaturePage} />
          <Route path="/manufacturer" component={ManufacturerContainer} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}
