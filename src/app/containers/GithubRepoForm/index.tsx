import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { FormLabel } from 'app/components/FormLabel';
import { Input } from './components/Input';
import { RepoItem } from './RepoItem';
import { TextButton } from './components/TextButton';
import { sliceKey, reducer, actions } from './slice';
import { githubRepoFormSaga } from './saga';
import {
  selectUsername,
  selectRepos,
  selectLoading,
  selectError,
} from './selectors';
import AtPrefix from './components/AtPrefix';
import { LoadingIndicator } from 'app/components/LoadingIndicator';

export function GithubRepoForm() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: githubRepoFormSaga });

  const username = useSelector(selectUsername);
  const repos = useSelector(selectRepos);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const onChangeUsername = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.changeUsername(evt.currentTarget.value));
  };

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
  // const handleShowMoreClick = (e: React.MouseEvent) => {
  //   console.log(e.target);
  // };
  return (
    <Wrapper>
      <FormGroup onSubmit={onSubmitForm}>
        <FormLabel>
          Github Username
          <AtPrefix>@</AtPrefix>
          <Input
            type="text"
            placeholder="react-boilerplate"
            value={username}
            onChange={onChangeUsername}
          />
        </FormLabel>
      </FormGroup>
      {repos?.length > 0 ? (
        <List>
          {repos.map(repo => (
            <RepoItem
              name={repo.name}
              starCount={repo.stargazers_count}
              url={repo.html_url}
            />
          ))}
        </List>
      ) : isLoading ? (
        <LoadingIndicator />
      ) : error ? (
        <span>Error</span>
      ) : null}

      {/* <TextButton onClick={handleShowMoreClick}>Show More</TextButton> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  width: ${100 / 3}%;
  margin-bottom: 1rem;

  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
`;

const List = styled.div``;
