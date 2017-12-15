import { ErrorPage } from '../index';

describe('<ErrorPage />', () => {
  it('should throw Error', () => {
    expect(ErrorPage).toThrow(Error);
  });
});
