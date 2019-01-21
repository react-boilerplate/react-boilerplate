'use strict';

exports.__esModule = true;
exports.default = insertCloned;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _clone = require('./clone');

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function insertCloned(rule, decl, props) {
    var newNode = (0, _objectAssign2.default)((0, _clone2.default)(decl), props);
    rule.insertAfter(decl, newNode);
    return newNode;
};
module.exports = exports['default'];