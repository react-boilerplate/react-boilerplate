import React from 'react';
import App from './components/App.react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { defaultApp } from './reducers/reducers';

let store = createStore(defaultApp);

React.render(
	<Provider store={store}>
		{() => <App />}
	</Provider>,
	document.getElementById('app')
);