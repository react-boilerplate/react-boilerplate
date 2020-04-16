import React from 'react';
import { FormLabel } from 'app/components/FormLabel';
import { Input } from './components/Input';
import styled from 'styled-components/macro';
import { RepoItem } from './RepoItem';
import { TextButton } from 'app/containers/GithubRepoForm/components/TextButton';

export function GithubRepoForm() {
  const handleShowMoreClick = (e: React.MouseEvent) => {
    console.log(e.target);
  };
  return (
    <Wrapper>
      <FormGroup>
        <FormLabel>Github Username</FormLabel>
        <Input />
      </FormGroup>
      <List>
        <RepoItem
          name="react-boilerplate-typescript"
          starCount={199}
          url="https://github.com/react-boilerplate/react-boilerplate-typescript"
        />
        <RepoItem
          name="react-boilerplate-typescript"
          starCount={199}
          url="https://github.com/react-boilerplate/react-boilerplate-typescript"
        />
        <RepoItem
          name="react-boilerplate-typescript"
          starCount={199}
          url="https://github.com/react-boilerplate/react-boilerplate-typescript"
        />
      </List>
      <TextButton onClick={handleShowMoreClick}>Show More</TextButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const FormGroup = styled.div`
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
