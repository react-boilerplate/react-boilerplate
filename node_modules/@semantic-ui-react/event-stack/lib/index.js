
'use strict';

var stack;

if (process.env.NODE_ENV === 'production') {
  stack = require('./cjs/event-stack.production.js');
} else {
  stack = require('./cjs/event-stack.development.js');
}

module.exports = stack.default;
module.exports.instance = stack.instance;
