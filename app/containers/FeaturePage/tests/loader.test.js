import createMemoryHistory from 'history/createMemoryHistory';

import configureStore from 'store';

import FeaturePage from '../index';
import createLoader from '../loader';

describe('FeaturePage loader', () => {
  const store = configureStore({}, createMemoryHistory());

  const loader = createLoader(store);

  it('loads FeaturePage', () => {
    const loaded = new Promise((resolve) => (loader(resolve)));
    expect.assertions(1);
    return loaded.then((comp) => expect(comp.default).toEqual(FeaturePage));
  });
});
