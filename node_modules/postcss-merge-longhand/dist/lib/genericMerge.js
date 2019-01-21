'use strict';

exports.__esModule = true;
exports.default = genericMerge;
exports.genericMergeFactory = genericMergeFactory;

var _canMerge = require('./canMerge');

var _canMerge2 = _interopRequireDefault(_canMerge);

var _getDecls = require('./getDecls');

var _getDecls2 = _interopRequireDefault(_getDecls);

var _getRules = require('./getRules');

var _getRules2 = _interopRequireDefault(_getRules);

var _hasAllProps = require('./hasAllProps');

var _hasAllProps2 = _interopRequireDefault(_hasAllProps);

var _insertCloned = require('./insertCloned');

var _insertCloned2 = _interopRequireDefault(_insertCloned);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function genericMerge(_ref) {
    var rule = _ref.rule;
    var properties = _ref.properties;
    var prop = _ref.prop;
    var value = _ref.value;
    var _ref$sanitize = _ref.sanitize;
    var sanitize = _ref$sanitize === undefined ? true : _ref$sanitize;

    var decls = (0, _getDecls2.default)(rule, properties);

    var _loop = function _loop() {
        var lastNode = decls[decls.length - 1];
        var props = decls.filter(function (node) {
            return node.important === lastNode.important;
        });
        var mergeable = sanitize ? _canMerge2.default.apply(undefined, props) : true;
        if (_hasAllProps2.default.apply(undefined, [props].concat(properties)) && mergeable) {
            (0, _insertCloned2.default)(rule, lastNode, {
                prop: prop,
                value: value((0, _getRules2.default)(props, properties))
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

function genericMergeFactory(_ref2) {
    var properties = _ref2.properties;
    var prop = _ref2.prop;
    var value = _ref2.value;

    return function merge(rule) {
        return genericMerge({
            rule: rule,
            properties: properties,
            prop: prop,
            value: value
        });
    };
}