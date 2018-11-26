import { takeLatest } from 'redux-saga/effects';
import displayItemsSaga from '../saga';
import { fetchApi } from '../fetchApi';
import { GET_ITEMS } from '../constants';

const generator = displayItemsSaga();

describe('displayItemsSaga Saga', () => {
  beforeEach(() => {
    const results = generator.next().value;
    expect(results).toMatchSnapshot();
  });
});

describe('getItems Saga', () => {
  it('should start task to watch for GET_ITEMS action', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(GET_ITEMS, fetchApi));
  });
});
