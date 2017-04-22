import createMemoryHistory from 'history/createMemoryHistory';

import configureStore from 'store';

import HomePage from '../index';
import createLoader from '../loader';

describe('HomePage loader', () => {
  const store = configureStore({}, createMemoryHistory());

  const loader = createLoader(store);

  it('loads HomePage', () => {
    const loaded = new Promise((resolve) => (loader(resolve)));
    expect.assertions(1);
    return loaded.then((comp) => expect(comp.default).toEqual(HomePage));
  });
});
