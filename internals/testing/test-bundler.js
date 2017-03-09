// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import 'babel-polyfill';
import { TestScheduler } from 'rxjs';
import { ActionsObservable } from 'redux-observable';

const expectEpic = (epic, { expected, action, response, callArgs, store }) => {
  const testScheduler = new TestScheduler((actual, expecte) => {
    expect(actual).toEqual(expecte); // TODO: Name this better
  });

  const action$ = new ActionsObservable(
    testScheduler.createHotObservable(...action)
  );
  const responseSubs = '^!';
  const response$ = testScheduler.createColdObservable(...response);
  const call = jest.fn().mockReturnValue(response$);

  const test$ = epic(action$, store, call);
  testScheduler.expectObservable(test$).toBe(...expected);
  testScheduler.flush();

  expect(call).toHaveBeenCalledTimes(1);
  expect(call).toBeCalledWith(...callArgs);

  testScheduler.expectSubscriptions(response$.subscriptions).toBe(responseSubs);
};

global.expectEpic = expectEpic;
