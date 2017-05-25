import createMemoryHistory from 'history/createMemoryHistory';

import configureStore from 'store';

import HomePage from '../index';
import loader from '../loader';

describe('HomePage loader', () => {
  const store = configureStore({}, createMemoryHistory());

  it('loads HomePage', () => {
    const loaded = new Promise((resolve) => (loader(store, resolve)));
    expect.assertions(1);
    return loaded.then((comp) => expect(comp.default).toEqual(HomePage));
  });
});
