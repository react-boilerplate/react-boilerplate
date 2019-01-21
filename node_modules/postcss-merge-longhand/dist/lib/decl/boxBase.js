'use strict';

exports.__esModule = true;

var _stylehacks = require('stylehacks');

var _genericMerge = require('../genericMerge');

var _minifyTrbl = require('../minifyTrbl');

var _minifyTrbl2 = _interopRequireDefault(_minifyTrbl);

var _parseTrbl = require('../parseTrbl');

var _parseTrbl2 = _interopRequireDefault(_parseTrbl);

var _insertCloned = require('../insertCloned');

var _insertCloned2 = _interopRequireDefault(_insertCloned);

var _mergeValues = require('../mergeValues');

var _mergeValues2 = _interopRequireDefault(_mergeValues);

var _trbl = require('../trbl');

var _trbl2 = _interopRequireDefault(_trbl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (prop) {
    var properties = _trbl2.default.map(function (direction) {
        return prop + '-' + direction;
    });

    var processor = {
        explode: function explode(rule) {
            if (rule.nodes.some(_stylehacks.detect)) {
                return false;
            }
            rule.walkDecls(prop, function (decl) {
                if (~decl.value.indexOf('inherit')) {
                    return;
                }
                var values = (0, _parseTrbl2.default)(decl.value);
                _trbl2.default.forEach(function (direction, index) {
                    (0, _insertCloned2.default)(rule, decl, {
                        prop: properties[index],
                        value: values[index]
                    });
                });
                decl.remove();
            });
        },
        merge: (0, _genericMerge.genericMergeFactory)({
            prop: prop,
            properties: properties,
            value: function value(rules) {
                return (0, _minifyTrbl2.default)(_mergeValues2.default.apply(undefined, rules));
            }
        })
    };

    return processor;
};

module.exports = exports['default'];