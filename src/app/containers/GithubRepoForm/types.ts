import { Repo } from 'types/Repo';

/* --- STATE --- */
export interface GithubRepoFormState {
  username: string;
  loading: boolean;
  error?: RepoErrorTypes | null;
  repositories: Repo[];
}

export enum RepoErrorTypes {
  RESPONSE_ERROR,
  USER_NOT_FOUND,
  USERNAME_EMPTY,
  USER_HAS_NO_REPO,
  GITHUB_RATE_LIMIT,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = GithubRepoFormState;
