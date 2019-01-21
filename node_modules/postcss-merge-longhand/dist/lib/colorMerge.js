'use strict';

exports.__esModule = true;
exports.default = colorMerge;

var _getDecls = require('./getDecls');

var _getDecls2 = _interopRequireDefault(_getDecls);

var _hasAllProps = require('./hasAllProps');

var _hasAllProps2 = _interopRequireDefault(_hasAllProps);

var _insertCloned = require('./insertCloned');

var _insertCloned2 = _interopRequireDefault(_insertCloned);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAllRules(props, properties) {
    return properties.reduce(function (list, property) {
        props.filter(function (n) {
            return n.prop && ~n.prop.indexOf(property);
        }).forEach(function (result, index) {
            if (!list[index]) {
                list.push([]);
            }
            list[index].push(result);
        });
        return list;
    }, [[]]);
}

function colorMerge(_ref) {
    var rule = _ref.rule;
    var properties = _ref.properties;
    var prop = _ref.prop;
    var value = _ref.value;

    var decls = (0, _getDecls2.default)(rule, properties);

    var _loop = function _loop() {
        var lastNode = decls[decls.length - 1];
        var props = decls.filter(function (node) {
            return node.important === lastNode.important;
        });
        if (_hasAllProps2.default.apply(undefined, [props].concat(properties))) {
            getAllRules(props, properties).reverse().forEach(function (group) {
                (0, _insertCloned2.default)(rule, lastNode, {
                    prop: prop,
                    value: value(group)
                });
            });
            props.forEach(_remove2.default);
        }
        decls = decls.filter(function (node) {
            return !~props.indexOf(node);
        });
    };

    while (decls.length) {
        _loop();
    }
}
module.exports = exports['default'];