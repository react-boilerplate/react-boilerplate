// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import 'babel-polyfill';

// If we need to use Chai, we'll have already chaiEnzyme loaded
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());

// Include all .test.js files, this is for Istanbul code coverage
const context = require.context('../../app', true, /\.test\.js$/);
context.keys().forEach(context);
