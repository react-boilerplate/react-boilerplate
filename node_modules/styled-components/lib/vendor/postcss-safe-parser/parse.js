'use strict';

exports.__esModule = true;
exports.default = safeParse;

var _input = require('../postcss/input');

var _input2 = _interopRequireDefault(_input);

var _safeParser = require('./safe-parser');

var _safeParser2 = _interopRequireDefault(_safeParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function safeParse(css, opts) {
    var input = new _input2.default(css, opts);

    var parser = new _safeParser2.default(input);
    parser.tokenize();
    parser.loop();

    return parser.root;
}
module.exports = exports['default'];