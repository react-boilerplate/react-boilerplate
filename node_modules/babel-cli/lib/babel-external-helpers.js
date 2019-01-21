"use strict";

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _babelCore = require("babel-core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.option("-l, --whitelist [whitelist]", "Whitelist of helpers to ONLY include", _babelCore.util.list);
_commander2.default.option("-t, --output-type [type]", "Type of output (global|umd|var)", "global");

_commander2.default.usage("[options]");
_commander2.default.parse(process.argv);

console.log((0, _babelCore.buildExternalHelpers)(_commander2.default.whitelist, _commander2.default.outputType));