'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.hasMagic = hasMagic;
exports.getSource = getSource;
exports.interpolateString = interpolateString;
exports.isAbsoluteURL = isAbsoluteURL;
exports.functionToString = functionToString;
exports.arrowFnToNormalFn = arrowFnToNormalFn;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _minimatch = require('minimatch');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var isAbsolutePath = _path2['default'].isAbsolute;

// Based on https://github.com/isaacs/node-glob/blob/master/glob.js#L83
// (glob.hasMagic)

function hasMagic(pattern, options) {
  // Support RegExp as well as glob
  if (pattern instanceof RegExp) {
    return {
      match: function match(str) {
        return pattern.test(str);
      }
    };
  }

  var minimatch = new _minimatch.Minimatch(pattern, options);
  var set = minimatch.set;

  if (set.length > 1) {
    return minimatch;
  }

  for (var j = 0; j < set[0].length; j++) {
    if (typeof set[0][j] !== 'string') {
      return minimatch;
    }
  }

  return false;
}

function getSource(_source) {
  return {
    source: function source() {
      return _source;
    },
    size: function size() {
      return Buffer.byteLength(_source, 'utf8');
    }
  };
}

function interpolateString(string, data) {
  var hasOwnProperty = ({}).hasOwnProperty;

  return (string + '').replace(/\[(\w+?)\]/g, function (match, key) {
    if (hasOwnProperty.call(data, key)) {
      return data[key];
    }

    return '';
  });
}

function isAbsoluteURL(url) {
  return (/^(?:\w+:)?\/\//.test(url)
  );
}

function functionToString(fn) {
  if (typeof fn !== 'function') {
    return '(void 0)';
  }

  var string = (fn + '').trim();

  var match = string.match(/^\s*function\s*(?:[a-zA-Z$_\d]+)?\s*\(([\s\S]*?)\)\s*\{([\s\S]*?)\}\s*$/);

  if (match) {
    return 'function (' + match[1].trim() + ') {' + match[2] + '}';
  }

  return arrowFnToNormalFn(string);
}

// Migrate to separate npm-package with full tests

function arrowFnToNormalFn(string) {
  var match = string.match(/^([\s\S]+?)=\>(\s*{)?([\s\S]*?)(}\s*)?$/);

  if (!match) {
    return string;
  }

  var args = match[1];
  var body = match[3];

  var needsReturn = !(match[2] && match[4]);

  args = args.replace(/^(\s*\(\s*)([\s\S]*?)(\s*\)\s*)$/, '$2');

  if (needsReturn) {
    body = 'return ' + body;
  }

  return 'function(' + args + ') {' + body + '}';
}

exports.isAbsolutePath = isAbsolutePath;