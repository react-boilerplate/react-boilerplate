import monitorSagas from '../monitorSagas';

describe('monitoring sagas', () => {
  let store;
  let runSaga;

  function makeTask(success) {
    return {
      done: success ? Promise.resolve(1) : Promise.reject('err'),
    };
  }

  beforeEach(() => {
    runSaga = jest.fn(() => makeTask(true));
    store = {
      runSaga,
    };
  });

  it('should call the original `runSagas`', () => {
    monitorSagas(store);
    store.runSaga(111);
    expect(runSaga).toHaveBeenCalledWith(111);
  });

  it('should return a function returning a promise', () => {
    const fn = monitorSagas(store);
    expect(typeof fn).toBe('function');
    const p = fn();
    expect(typeof p.then).toBe('function');
  });

  describe('all tasks done promise', () => {
    describe('when tasks succeed', () => {
      let allTasksDone;

      beforeEach(() => {
        runSaga.mockImplementation(() => makeTask(true));
        allTasksDone = monitorSagas(store);
        store.runSaga(1);
        store.runSaga(1);
      });

      it('should succeed', async () => {
        const res = await allTasksDone();
        expect(res).toBeDefined();
      });
    });

    describe('when tasks fail', () => {
      let allTasksDone;

      beforeEach(() => {
        runSaga.mockImplementation(() => makeTask(false));
        allTasksDone = monitorSagas(store);
        store.runSaga(1);
        store.runSaga(1);
      });

      it('should fail', async () => {
        let err;
        try {
          await allTasksDone();
        } catch (e) {
          err = e;
        }
        expect(err).toBeDefined();
      });
    });
  });
});
