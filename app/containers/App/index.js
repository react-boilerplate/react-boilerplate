/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import DisplayItems from 'containers/DisplayItems/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Navbar from '../../components/NavBar/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/all-items" component={DisplayItems} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
