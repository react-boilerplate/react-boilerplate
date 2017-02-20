/**
 * Test the indirect function
 */

import { indirect } from '../indirect';

describe('indirect', () => {
  describe('call', () => {
    it('should run the first argument as a function', () => {
      const stub = jest.fn();
      const arg1 = 1;
      const arg2 = 2;
      indirect.call(stub, arg1, arg2);
      expect(stub).toHaveBeenCalledWith(arg1, arg2);
    });
  });
});
