'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _changeCase = require('change-case');

var _changeCase2 = _interopRequireDefault(_changeCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	camelCase: _changeCase2.default.camel,
	snakeCase: _changeCase2.default.snake,
	dotCase: _changeCase2.default.dot,
	pathCase: _changeCase2.default.path,
	lowerCase: _changeCase2.default.lower,
	upperCase: _changeCase2.default.upper,
	sentenceCase: _changeCase2.default.sentence,
	constantCase: _changeCase2.default.constant,
	titleCase: _changeCase2.default.title,

	dashCase: _changeCase2.default.param,
	kabobCase: _changeCase2.default.param,
	kebabCase: _changeCase2.default.param,

	properCase: _changeCase2.default.pascal,
	pascalCase: _changeCase2.default.pascal
};