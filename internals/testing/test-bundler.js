// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import 'babel-polyfill';

// Include all .js files under `app`, except app.js, reducers.js, routes.js and
// store.js. This is for isparta code coverage
const context = require.context('../../app', true, /^^((?!(app|reducers|routes|store)).)*\.js$/);
context.keys().forEach(context);
