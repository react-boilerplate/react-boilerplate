import { Repo } from 'types/Repo';

/* --- STATE --- */
export interface HomePageState {
  readonly username: string;
  readonly loading: boolean;
  readonly error?: object | boolean;
  readonly repositories: Repo[];
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = HomePageState;
