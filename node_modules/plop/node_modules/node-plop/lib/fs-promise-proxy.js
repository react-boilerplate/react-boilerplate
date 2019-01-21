'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileExists = exports.writeFile = exports.readFile = exports.readdir = exports.makeDir = undefined;

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _readFile = (0, _pify2.default)(_fs2.default.readFile);
const _writeFile = (0, _pify2.default)(_fs2.default.writeFile);
const _access = (0, _pify2.default)(_fs2.default.access);

const makeDir = exports.makeDir = (0, _pify2.default)(_mkdirp2.default);
const readdir = exports.readdir = (0, _pify2.default)(_fs2.default.readdir);
const readFile = exports.readFile = path => _readFile(path, 'utf8');
const writeFile = exports.writeFile = (path, data) => _writeFile(path, data, 'utf8');
const fileExists = exports.fileExists = path => _access(path).then(() => true, () => false);