import { makeSelectLocation } from 'containers/App/selectors';

describe('makeSelectLocation', () => {
  it('should select the location', () => {
    const locationStateSelector = makeSelectLocation();
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState = {
      router,
    };
    expect(locationStateSelector(mockedState)).toEqual(router.location);
  });
});
