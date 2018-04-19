/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import BookListPage from 'containers/BookListPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import About from 'containers/About';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/books" component={BookListPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}
