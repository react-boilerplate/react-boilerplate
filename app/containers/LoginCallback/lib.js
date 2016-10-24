import Auth0Lock from 'auth0-lock';
import { call } from 'redux-saga/effects';
import { popSecret, storeToken, getToken } from 'containers/Viewer/lib';

let lock;

export function* loginCallback() {
  lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);
  const { idToken, state } = yield call(onAuthenticated);
  const { secret, nextPathname } = JSON.parse(state);
  checkSecret(secret);
  storeToken(idToken);
  return { idToken, nextPathname };
}

function onAuthenticated() {
  return new Promise((resolve) => lock.on('authenticated', resolve));
}

function checkSecret(actual) {
  if (actual !== popSecret()) {
    throw new Error('Unexpected auth secret');
  }
}

export function* getProfile() {
  return yield call(onProfile);
}

function onProfile() {
  return new Promise((resolve, reject) => {
    lock.getProfile(getToken(), (error, profile) => (error ? reject(error) : resolve(profile)));
  });
}
