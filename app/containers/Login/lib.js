import Auth0Lock from 'auth0-lock';
import { storeSecret } from 'containers/Viewer/lib';
import { ORIGIN } from 'components/Window/constants';

export const LOCK_CONTAINER_ID = 'lock-container';

let lock;

export function createAndShow(nextPathname) {
  lock = createLock(nextPathname);
  lock.show();
}

function createLock(nextPathname) {
  const secret = createNonce();
  storeSecret(secret);
  return new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, {
    auth: {
      redirectUrl: `${ORIGIN}/login/callback`,
      responseType: 'token',
      params: {
        state: JSON.stringify({
          secret,
          nextPathname,
        }),
      },
    },
    container: LOCK_CONTAINER_ID,
    // other options see https://auth0.com/docs/libraries/lock/v10/customization
  });
}

function createNonce() {
  let text = '';
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < randomLength(); i += 1) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return text;
}

function randomLength() {
  const minLength = 30;
  const maxLength = 50;
  return Math.floor((Math.random() * maxLength) + minLength);
}
