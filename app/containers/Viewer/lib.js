const AUTH_SECRET = 'auth-secret';
const AUTH_TOKEN = 'auth-token';

export function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

export function loggedIn() {
  return !!getToken();
}

export function loggedOut() {
  return !getSecret() && !loggedIn();
}

export function storeSecret(secret) {
  sessionStorage.setItem(AUTH_SECRET, secret);
}

function getSecret() {
  return sessionStorage.getItem(AUTH_SECRET);
}

export function popSecret() {
  const secret = getSecret();
  sessionStorage.removeItem(AUTH_SECRET);
  return secret;
}

export function storeToken(token) {
  localStorage.setItem(AUTH_TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN);
}

export function removeToken() {
  localStorage.removeItem(AUTH_TOKEN);
}
