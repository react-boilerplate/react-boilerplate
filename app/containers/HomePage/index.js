/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';

import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/ReposManager/selectors';
import { loadRepos } from 'containers/ReposManager/slice';

import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './components/AtPrefix';
import CenteredSection from './components/CenteredSection';
import Form from './components/Form';
import Input from './components/Input';
import Section from './components/Section';

import messages from './messages';
import { reducer, changeUsername } from './slice';
import { makeSelectUsername } from './selectors';

const stateSelector = createStructuredSelector({
  username: makeSelectUsername(),
  repos: makeSelectRepos(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export default function HomePage() {
  useInjectReducer({ key: 'home', reducer });

  const dispatch = useDispatch();
  const { repos, username, loading, error } = useSelector(stateSelector);

  const onChangeUsername = evt =>
    dispatch(changeUsername({ username: evt.target.value }));

  const onSubmitForm = evt => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    if (!username) return;
    dispatch(loadRepos());
  };

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const reposListProps = {
    loading,
    error,
    repos,
  };

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
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
                value={username}
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
