/**
 * Gets the repositories of the user from Github
 */

import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';
import { makeSelectUsername } from 'containers/HomePage/selectors';
import { indirect } from 'utils/indirect';

/**
 * Select the username from the store
 */
const selectUsername = (store) => makeSelectUsername()(store.getState());

/**
 * The API endpoint for epic
 */
export const api = {
  fetchGithub: (id) => ajax.getJSON(`https://api.github.com/users/${id}/repos?type=all&sort=updated`),
};

/**
 * Github repos request/response handler
 */
const getReposEpic = (action$, store, call = indirect.call) =>
  action$.ofType(LOAD_REPOS)
    .mergeMap(() =>
      call(api.fetchGithub, selectUsername(store))
        .map((repos) => reposLoaded(repos, selectUsername(store)))
        .catch((err) => Observable.of(repoLoadingError(err)))
      );

export {
  getReposEpic,
};

