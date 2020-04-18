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
    dispatch(actions.loadRepos());
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

  return (
    <Wrapper>
      <FormGroup onSubmit={onSubmitForm}>
        <FormLabel>Github Username</FormLabel>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Type any Github username"
            value={username}
            onChange={onChangeUsername}
          />
          {isLoading && <LoadingIndicator small />}
        </InputWrapper>
      </FormGroup>
      {repos?.length > 0 ? (
        <List>
          {repos.map(repo => (
            <RepoItem
              key={repo.id}
              name={repo.name}
              starCount={repo.stargazers_count}
              url={repo.html_url}
            />
          ))}
        </List>
      ) : error ? (
        <ErrorText>Oops! An error has occurred</ErrorText>
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  ${Input} {
    width: ${100 / 3}%;
    margin-right: 0.5rem;
  }
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
`;

const List = styled.div``;
