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
import { createStructuredSelector } from 'reselect';
import Modal from 'react-modal';

import HomePage from 'containers/HomePage/Loadable';
import BookListPage from 'containers/BookListPage/Loadable';
import BookPage from 'containers/BookPage/Loadable';
import FormPage from 'containers/FormPage/Loadable';
import ArticlesPage from 'containers/ArticlesPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AboutPage from 'containers/AboutPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './sagas';
import { getBooks, getAuthor, getArticles, whoAmI, logout } from './actions';
import { selectUser, selectPostPutError } from './selectors';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { AppContainer, ModalText } from './styled';

const modalStyles = {
  overlay: {
    position: 'absolute',
    border: '1px solid rgb(204, 204, 204)',
    background: 'rgb(255, 255, 255)',
    overflow: 'auto',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    height: '200px',
    width: '50%',
    top: 'calc(50% - 100px)',
    left: 'calc(50% - 250px)',
  },
  content: {
    border: 'none',
  },
};

Modal.setAppElement('#app');

class App extends Component {
  static propTypes = {
    dispatchWhoAmI: PropTypes.func.isRequired,
    dispatchLogout: PropTypes.func.isRequired,
    dispatchGetBooks: PropTypes.func.isRequired,
    dispatchGetAuthor: PropTypes.func.isRequired,
    dispatchGetArticles: PropTypes.func.isRequired,
    user: PropTypes.bool.isRequired,
    postPutError: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.dispatchWhoAmI();
    this.props.dispatchGetBooks();
    this.props.dispatchGetAuthor();
    this.props.dispatchGetArticles();
  }

  render() {
    return (
      <AppContainer modalOpen={!!this.props.postPutError}>
        <Modal
          isOpen={!!this.props.postPutError}
          contentLabel="Error"
          style={modalStyles}
        >
          <div>
            <ModalText>{this.props.postPutError}</ModalText>
            <ModalText>Please refresh the page and try again</ModalText>
          </div>
        </Modal>
        <Navbar user={this.props.user} onLogout={this.props.dispatchLogout} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/books" component={BookListPage} />
          <Route exact path="/books/new" component={FormPage} />
          <Route exact path="/articles/new" component={FormPage} />
          <Route exact path="/books/:id" component={BookPage} />
          <Route exact path="/books/:id/edit" component={FormPage} />
          <Route exact path="/articles" component={ArticlesPage} />
          <Route exact path="/articles/:id/edit" component={FormPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </AppContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: selectUser(),
  postPutError: selectPostPutError(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetBooks: () => dispatch(getBooks()),
  dispatchGetAuthor: () => dispatch(getAuthor()),
  dispatchGetArticles: () => dispatch(getArticles()),
  dispatchWhoAmI: () => dispatch(whoAmI()),
  dispatchLogout: () => dispatch(logout()),
});

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(App);
