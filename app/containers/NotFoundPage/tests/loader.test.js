import createMemoryHistory from 'history/createMemoryHistory';

import configureStore from 'store';

import NotFoundPage from '../index';
import createLoader from '../loader';

describe('NotFoundPage loader', () => {
  const store = configureStore({}, createMemoryHistory());

  const loader = createLoader(store);

  it('loads NotFoundPage', () => {
    const loaded = new Promise((resolve) => (loader(resolve)));
    expect.assertions(1);
    return loaded.then((comp) => expect(comp.default).toEqual(NotFoundPage));
  });
});
