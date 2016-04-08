/**
 * Test the repo selector
 */

import reposSelector from '../reposSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

const selector = reposSelector();

describe('reposSelector', () => {
  it('should select the repos', () => {
    const repositories = fromJS([]);
    const mockedState = fromJS({
      global: {
        userData: {
          repositories,
        },
      },
    });
    expect(selector(mockedState)).toEqual(repositories);
  });
});
