import { CHANGE_USERNAME, LOAD_REPOS, LOAD_REPOS_SUCCESS } from './constants';

export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name
  };
}

export function loadRepos() {
  return {
    type: LOAD_REPOS
  };
}

export function reposLoaded(repos) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos
  };
}
