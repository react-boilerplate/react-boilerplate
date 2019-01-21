'use strict';

exports.__esModule = true;
exports.default = normalizeTransition;

var _postcssValueParser = require('postcss-value-parser');

var _addSpace = require('../lib/addSpace');

var _addSpace2 = _interopRequireDefault(_addSpace);

var _getArguments = require('../lib/getArguments');

var _getArguments2 = _interopRequireDefault(_getArguments);

var _getValue = require('../lib/getValue');

var _getValue2 = _interopRequireDefault(_getValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// transition: [ none | <single-transition-property> ] || <time> || <single-transition-timing-function> || <time>

var timingFunctions = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'step-start', 'step-end'];

function normalizeTransition(decl, parsed) {
    var args = (0, _getArguments2.default)(parsed);

    var values = args.reduce(function (list, arg) {
        var state = {
            timingFunction: [],
            property: [],
            time1: [],
            time2: []
        };
        arg.forEach(function (node) {
            if (node.type === 'space') {
                return;
            }
            if (node.type === 'function' && ~['steps', 'cubic-bezier'].indexOf(node.value)) {
                state.timingFunction = [].concat(state.timingFunction, [node, (0, _addSpace2.default)()]);
            } else if ((0, _postcssValueParser.unit)(node.value)) {
                if (!state.time1.length) {
                    state.time1 = [].concat(state.time1, [node, (0, _addSpace2.default)()]);
                } else {
                    state.time2 = [].concat(state.time2, [node, (0, _addSpace2.default)()]);
                }
            } else if (~timingFunctions.indexOf(node.value)) {
                state.timingFunction = [].concat(state.timingFunction, [node, (0, _addSpace2.default)()]);
            } else {
                state.property = [].concat(state.property, [node, (0, _addSpace2.default)()]);
            }
        });
        return [].concat(list, [[].concat(state.property, state.time1, state.timingFunction, state.time2)]);
    }, []);

    decl.value = (0, _getValue2.default)(values);
}
module.exports = exports['default'];