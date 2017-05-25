import createMemoryHistory from 'history/createMemoryHistory';

import configureStore from 'store';

import NotFoundPage from '../index';
import loader from '../loader';

describe('NotFoundPage loader', () => {
  const store = configureStore({}, createMemoryHistory());

  it('loads NotFoundPage', () => {
    const loaded = new Promise((resolve) => (loader(store, resolve)));
    expect.assertions(1);
    return loaded.then((comp) => expect(comp.default).toEqual(NotFoundPage));
  });
});
