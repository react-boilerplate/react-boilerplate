'use strict';

exports.__esModule = true;
exports.default = getRules;

var _getLastNode = require('./getLastNode');

var _getLastNode2 = _interopRequireDefault(_getLastNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRules(props, properties) {
    return properties.map(function (property) {
        return (0, _getLastNode2.default)(props, property);
    }).filter(Boolean);
}
module.exports = exports['default'];