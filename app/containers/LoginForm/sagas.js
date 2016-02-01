import { FORM_SUBMITTED } from './constants';
import {
  authenticationSuccessful,
  authenticationFailed,
  repositoriesLoaded
} from 'App/actions';
import { take, call, put } from 'redux-saga';
import {
  hasTwoFactorEnabled
} from './actions';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  console.log(response);
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function request(url, options) {
  return fetch(url, options)
    .then(parseJSON)
    .then(checkStatus)
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}

export function* loginSaga(getState) {
  while (yield take(FORM_SUBMITTED)) {
    const state = getState();
    const username = state.getIn(['form', 'username']);
    const password = state.getIn(['form', 'password']);
    const requestOptions = {
      headers: {
        Authorization: 'Basic ' + new Buffer(username + ':' + password, 'utf8').toString('base64'),
        Accept: 'application/vnd.github.v3+json'
      }
    };
    const login = yield call(request, 'https://api.github.com/user', requestOptions);
    const loginErr = yield login.err.response;
    if (loginErr !== null && loginErr !== undefined) {
      let errorMsg = 'Oops, something went wrong. Please try again!';
      if (loginErr.status === 401) {
        errorMsg = 'Wrong username or password.';
      } else if (loginErr.status === 403) {
        errorMsg = 'Maximum number of login attempts exceeded. Please try again later.';
      } else if (loginErr.message === 'Must specify two-factor authentication OTP code.') {
        yield put(hasTwoFactorEnabled());
        return;
      }
      yield put(authenticationFailed(errorMsg));
      return;
    }
    const loginData = yield login.data;
    yield put(authenticationSuccessful(loginData));
    const repos = yield call(request, 'https://api.github.com/user/repos', requestOptions);
    yield put(repositoriesLoaded(repos.data));
  }
}
