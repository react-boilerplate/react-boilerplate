import { Repo } from 'types/Repo';

/* --- STATE --- */
export interface GithubRepoFormState {
  readonly username: string;
  readonly loading: boolean;
  readonly error?: boolean | string;
  readonly repositories: Repo[];
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = GithubRepoFormState;
