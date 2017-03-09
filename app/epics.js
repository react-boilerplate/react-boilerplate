// create the epics without using async loading at this stage

import { combineEpics } from 'redux-observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import homePageEpics from 'containers/HomePage/epics'; // eslint-disable-line no-unused-vars
// TODO: Fix bug preventing asynchronous loading of epics

export default function createRootEpic() {
  const epic$ = new BehaviorSubject(combineEpics());
  const rootEpic = (action$, store) =>
    epic$.mergeMap((epic) =>
      epic(action$, store)
    );
  return { rootEpic, epic$ };
}
