import { history } from '../history';

describe('history', () => {
  it('get browser history', () => {
    expect(history).toEqual(
      expect.objectContaining({
        action: expect.any(String),
        location: expect.any(Object),
        push: expect.any(Function),
        replace: expect.any(Function),
      }),
    );
  });
});
