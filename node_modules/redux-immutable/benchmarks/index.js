var Benchmark;

Benchmark = require('benchmark');
Immutable = require('immutable');

global.require = require;

new Benchmark.Suite()
        .add('rootReducer iteration', {
            fn: () => {
                rootReducer(initialState, {
                    type: 'TEST'
                });
            },
            setup: () => {
                var combineReducers,
                    initialState,
                    rootReducer;

                initialState = Immutable.fromJS({
                    foo: {
                        test: 1
                    },
                    bar: {
                        test: 2
                    },
                    baz: {
                        test: 3
                    }
                });

                combineReducers = require('./../dist/combineReducers');
                // combineReducers = require('redux-immutablejs').combineReducers;

                rootReducer = combineReducers({
                    foo (state, action) {
                        return state;
                    },
                    bar (state) {
                        return state;
                    },
                    baz (state) {
                        return state;
                    }
                });
            }
        })
        .on('start', (event) => {
            console.log('starting', event.target.name);
        })
        .on('cycle', (event) => {
            console.log('target', String(event.target));
        })
        .on('error', (event) => {
            console.log('error', String(event.target.error));
        })
        .run();
