import { FORM_SUBMITTED } from './constants';
import { authenticationSuccessful, authenticationFailed } from 'App/actions';
import { take, call, put } from 'redux-saga';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

function sendLoginRequest(username, password) {
  return fetch('https://api.github.com/user',
    {
      headers: {
        Authorization: 'Basic ' + new Buffer(username + ':' + password, 'utf8').toString('base64')
      }
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      return { data };
    }).catch((err) => {
      return { err };
    });
}

export function* loginSaga(getState) {
  while (yield take(FORM_SUBMITTED)) {
    const state = getState();
    const username = state.getIn(['form', 'username']);
    const password = state.getIn(['form', 'password']);
    const { data, err } = yield call(sendLoginRequest, username, password);
    if (err) {
      let errorMsg = 'Oops, something went wrong. Please try again!';
      if (err.status === 401) {
        errorMsg = 'Wrong username or password.';
      } else if (err.status === 403) {
        errorMsg = 'Maximum number of login attempts exceeded. Please try again later.';
      }
      yield put(authenticationFailed(errorMsg));
    } else {
      yield put(authenticationSuccessful(data));
    }
  }
}
