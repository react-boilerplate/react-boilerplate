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
import { actions, reducer, sliceKey } from './slice';
import { homepageSaga } from './saga';

export default function HomePage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homepageSaga });

  const username = useSelector(selectUsername);
  const repos = useSelector(selectRepos);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const onChangeUsername = (evt: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(actions.changeUsername(evt.currentTarget.value));

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
    if (!username) {
      return;
    }
    dispatch(actions.loadRepos());
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) {
      onSubmitForm();
    }
  });

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
              placeholder="enter a github user"
              value={username}
              onChange={onChangeUsername}
            />
          </label>
        </Form>
      </div>
    </article>
  );
}
