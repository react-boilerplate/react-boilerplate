/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import reducer, { initialState } from './reducer';
import saga from './saga';

export function HomePage({ loading, error, repos, reduxDispatch }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * When initial state username is not null, load repos immediately
   */
  useEffect(() => {
    const username = state.get('username');
    if (username && username.trim().length > 0) {
      reduxDispatch(loadRepos(username));
    }
  }, []); // Empty array to ensures it runs on mount only

  function onChangeUsername(e) {
    dispatch(changeUsername(e.target.value));
  }

  function onSubmitForm(e) {
    e.preventDefault(); // Prevent page reload
    reduxDispatch(loadRepos(state.get('username')));
  }

  const reposListProps = {
    loading,
    error,
    repos,
  };
  return (
    <article>
      {/* <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet> */}
      <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.startProjectHeader} />
          </H2>
          <p>
            <FormattedMessage {...messages.startProjectMessage} />
          </p>
        </CenteredSection>
        <Section>
          <H2>
            <FormattedMessage {...messages.trymeHeader} />
          </H2>
          <Form onSubmit={onSubmitForm}>
            <label htmlFor="username">
              <FormattedMessage {...messages.trymeMessage} />
              <AtPrefix>
                <FormattedMessage {...messages.trymeAtPrefix} />
              </AtPrefix>
              <Input
                id="username"
                type="text"
                placeholder="mxstbr"
                value={state.get('username')}
                onChange={onChangeUsername}
              />
            </label>
          </Form>
          <ReposList {...reposListProps} />
        </Section>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  reduxDispatch: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    reduxDispatch: dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withSaga,
  withConnect,
)(HomePage);
