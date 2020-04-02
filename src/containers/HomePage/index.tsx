/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import AtPrefix from './components/AtPrefix';
import Form from './components/Form';
import Input from './components/Input';
import {
  selectLoading,
  selectError,
  selectRepos,
  selectUsername,
} from './selectors';
import { homepageActions, homepageReducer } from './slice';
import { homepageSaga } from './saga';

export default function HomePage() {
  useInjectReducer({ key: 'homepage', reducer: homepageReducer });
  useInjectSaga({ key: 'homepage', saga: homepageSaga });

  const username = useSelector(selectUsername);
  const repos = useSelector(selectRepos);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  // Not gonna declare event types here. No need. any is fine
  const onChangeUsername = (evt: any) =>
    dispatch(homepageActions.changeUsername(evt.target.value));

  const onSubmitForm = (evt?: any) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
    if (!username) {
      return;
    }
    dispatch(homepageActions.loadRepos());
  };

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) {
      onSubmitForm();
    }
  }, []);

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <Form onSubmit={onSubmitForm}>
          <label htmlFor="username">
            Try me
            <AtPrefix>@</AtPrefix>
            <Input
              id="username"
              type="text"
              placeholder="mxstbr"
              value={username}
              onChange={onChangeUsername}
            />
          </label>
        </Form>
      </div>
    </article>
  );
}
