// create the epics without using async loading at this stage

import { combineEpics } from 'redux-observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { getReposEpic } from 'containers/HomePage/epics';

export default function createRootEpic() {
  const epic$ = new BehaviorSubject(combineEpics(
    Object.assign(
      getReposEpic,
    )
  ));
  const rootEpic = (action$, store) =>
    epic$.mergeMap((epic) =>
      epic(action$, store)
    );
  return { rootEpic, epic$ };
}
