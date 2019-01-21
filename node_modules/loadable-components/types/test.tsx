/* tslint-disable */
// TypeScript Version: 2.7

import * as React from 'react';
import loadableComponent, { loadComponents } from 'loadable-components';
import { DeferredState, getLoadableState } from 'loadable-components/server';

const App = loadableComponent(() => import('./TestComponent'));

App.load();

const app = (
  <App prop1={"1"} prop2={2}/>
);

getLoadableState(app).then((serverState) => {
// Load all components needed before starting rendering
  loadComponents().then((state) => {
    // $ExpectError
    const a1 = <App prop1={4} prop2="4"/>;

    // $ExpectError
    const a2 = <App/>;

    const a3 = <App prop1={"4"} prop2={4}/>;

    // $ExpectType ReactHTMLElement<HTMLScriptElement>
    const scriptElement = serverState.getScriptElement();
  });
});
