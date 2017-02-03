export default function monitorSagas(store) {
  const allTasks = [];
  const saveRunSaga = store.runSaga;

  store.runSaga = function interceptRunSaga(saga) { // eslint-disable-line no-param-reassign
    const task = saveRunSaga.call(store, saga);
    allTasks.push(task);
    return task;
  };

  return function done() {
    return Promise.all(allTasks.map((t) => t.done));
  };
}
