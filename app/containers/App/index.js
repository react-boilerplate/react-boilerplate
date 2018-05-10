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

import React, { Component, PropTypes } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import HomePage from 'containers/HomePage/Loadable';
import BookListPage from 'containers/BookListPage/Loadable';
import BookPage from 'containers/BookPage/Loadable';
import FormPage from 'containers/FormPage/Loadable';
import ArticlesPage from 'containers/ArticlesPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AboutPage from 'containers/AboutPage/Loadable';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './sagas';
import { getBooks, getAuthor, getArticles } from './actions';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

class App extends Component {
  static propTypes = {
    dispatchGetBooks: PropTypes.func.isRequired,
    dispatchGetAuthor: PropTypes.func.isRequired,
    dispatchGetArticles: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatchGetBooks();
    this.props.dispatchGetAuthor();
    this.props.dispatchGetArticles();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/books" component={BookListPage} />
          <Route exact path="/books/:isbn" component={BookPage} />
          <Route exact path="/books/:isbn/edit" component={FormPage} />
          <Route exact path="/articles" component={ArticlesPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchGetBooks: () => dispatch(getBooks()),
  dispatchGetAuthor: () => dispatch(getAuthor()),
  dispatchGetArticles: () => dispatch(getArticles()),
});

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });
const withConnect = connect(null, mapDispatchToProps);

export default withRouter(compose(
  withReducer,
  withSaga,
  withConnect,
)(App));
