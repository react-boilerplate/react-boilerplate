'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _postcss = require('postcss');

var _stylehacks = require('stylehacks');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _clone = require('../clone');

var _clone2 = _interopRequireDefault(_clone);

var _genericMerge = require('../genericMerge');

var _genericMerge2 = _interopRequireDefault(_genericMerge);

var _insertCloned = require('../insertCloned');

var _insertCloned2 = _interopRequireDefault(_insertCloned);

var _parseTrbl = require('../parseTrbl');

var _parseTrbl2 = _interopRequireDefault(_parseTrbl);

var _hasAllProps = require('../hasAllProps');

var _hasAllProps2 = _interopRequireDefault(_hasAllProps);

var _getLastNode = require('../getLastNode');

var _getLastNode2 = _interopRequireDefault(_getLastNode);

var _getDecls = require('../getDecls');

var _getDecls2 = _interopRequireDefault(_getDecls);

var _getRules = require('../getRules');

var _getRules2 = _interopRequireDefault(_getRules);

var _getValue = require('../getValue');

var _getValue2 = _interopRequireDefault(_getValue);

var _minifyTrbl = require('../minifyTrbl');

var _minifyTrbl2 = _interopRequireDefault(_minifyTrbl);

var _canMerge = require('../canMerge');

var _canMerge2 = _interopRequireDefault(_canMerge);

var _colorMerge = require('../colorMerge');

var _colorMerge2 = _interopRequireDefault(_colorMerge);

var _remove = require('../remove');

var _remove2 = _interopRequireDefault(_remove);

var _trbl = require('../trbl');

var _trbl2 = _interopRequireDefault(_trbl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wsc = ['width', 'style', 'color'];
var defaults = ['medium', 'none', 'currentColor'];

var borderProperty = function borderProperty(property) {
    return 'border-' + property;
};
var directions = _trbl2.default.map(borderProperty);
var properties = wsc.map(borderProperty);

function mergeRedundant(_ref) {
    var values = _ref.values;
    var nextValues = _ref.nextValues;
    var decl = _ref.decl;
    var nextDecl = _ref.nextDecl;
    var index = _ref.index;
    var position = _ref.position;
    var prop = _ref.prop;

    var props = (0, _parseTrbl2.default)(values[position]);
    props[index] = nextValues[position];
    values.splice(position, 1);
    var borderValue = values.join(' ');
    var propertyValue = (0, _minifyTrbl2.default)(props);

    var origLength = (decl.value + nextDecl.prop + nextDecl.value).length;
    var newLength = borderValue.length + 12 + propertyValue.length;

    if (newLength < origLength) {
        decl.value = borderValue;
        nextDecl.prop = prop;
        nextDecl.value = propertyValue;
    }
}

function isCloseEnough(mapped) {
    return mapped[0] === mapped[1] && mapped[1] === mapped[2] || mapped[1] === mapped[2] && mapped[2] === mapped[3] || mapped[2] === mapped[3] && mapped[3] === mapped[0] || mapped[3] === mapped[0] && mapped[0] === mapped[1];
}

function getDistinctShorthands(mapped) {
    return mapped.reduce(function (a, b) {
        a = Array.isArray(a) ? a : [a];
        if (!~a.indexOf(b)) {
            a.push(b);
        }
        return a;
    });
}

function explode(rule) {
    if (rule.nodes.some(_stylehacks.detect)) {
        return false;
    }
    rule.walkDecls(/^border/, function (decl) {
        // Don't explode inherit values as they cannot be merged together
        if (decl.value === 'inherit') {
            return;
        }
        var prop = decl.prop;
        // border -> border-trbl

        if (prop === 'border') {
            directions.forEach(function (direction) {
                (0, _insertCloned2.default)(rule, decl, { prop: direction });
            });
            return decl.remove();
        }
        // border-trbl -> border-trbl-wsc
        if (directions.some(function (direction) {
            return prop === direction;
        })) {
            var _ret = function () {
                var values = _postcss.list.space(decl.value);
                wsc.forEach(function (d, i) {
                    (0, _insertCloned2.default)(rule, decl, {
                        prop: prop + '-' + d,
                        value: values[i] || defaults[i]
                    });
                });
                return {
                    v: decl.remove()
                };
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
        // border-wsc -> border-trbl-wsc
        wsc.some(function (style) {
            if (prop !== 'border-' + style) {
                return false;
            }
            (0, _parseTrbl2.default)(decl.value).forEach(function (value, i) {
                (0, _insertCloned2.default)(rule, decl, {
                    prop: 'border-' + _trbl2.default[i] + '-' + style,
                    value: value
                });
            });
            return decl.remove();
        });
    });
}

var borderProperties = _trbl2.default.reduce(function (props, direction) {
    return [].concat(props, wsc.map(function (style) {
        return 'border-' + direction + '-' + style;
    }));
}, []);

function merge(rule) {
    // Lift all inherit values from the rule, so that they don't
    // interfere with the merging logic.
    var inheritValues = (0, _getDecls2.default)(rule, borderProperties).reduce(function (values, decl) {
        if (decl.value === 'inherit') {
            decl.remove();
            return [].concat(values, [decl]);
        }
        return values;
    }, []);
    // border-trbl-wsc -> border-trbl
    _trbl2.default.forEach(function (direction) {
        var prop = borderProperty(direction);
        (0, _genericMerge2.default)({
            rule: rule,
            prop: prop,
            properties: wsc.map(function (style) {
                return prop + '-' + style;
            }),
            value: function value(rules) {
                return rules.map(_getValue2.default).join(' ');
            }
        });
    });

    // border-trbl-wsc -> border-wsc
    wsc.forEach(function (style) {
        var prop = borderProperty(style);
        if (style === 'color') {
            return (0, _colorMerge2.default)({
                rule: rule,
                prop: prop,
                properties: _trbl2.default.map(function (direction) {
                    return 'border-' + direction + '-' + style;
                }),
                value: function value(rules) {
                    return (0, _minifyTrbl2.default)(rules.map(_getValue2.default).join(' '));
                }
            });
        }
        return (0, _genericMerge2.default)({
            rule: rule,
            prop: prop,
            properties: _trbl2.default.map(function (direction) {
                return 'border-' + direction + '-' + style;
            }),
            value: function value(rules) {
                return (0, _minifyTrbl2.default)(rules.map(_getValue2.default).join(' '));
            },
            sanitize: false
        });
    });

    // border-trbl -> border-wsc
    var decls = (0, _getDecls2.default)(rule, directions);

    var _loop = function _loop() {
        var lastNode = decls[decls.length - 1];
        var props = decls.filter(function (node) {
            return node.important === lastNode.important;
        });
        var rules = (0, _getRules2.default)(props, directions);
        if (_hasAllProps2.default.apply(undefined, [props].concat(directions))) {
            wsc.forEach(function (d, i) {
                (0, _insertCloned2.default)(rule, lastNode, {
                    prop: borderProperty(d),
                    value: (0, _minifyTrbl2.default)(rules.map(function (node) {
                        return _postcss.list.space(node.value)[i];
                    }))
                });
            });
            props.forEach(_remove2.default);
        }
        decls = decls.filter(function (node) {
            return !~rules.indexOf(node);
        });
    };

    while (decls.length) {
        _loop();
    }

    // border-wsc -> border
    // border-wsc -> border + border-color
    // border-wsc -> border + border-dir
    decls = (0, _getDecls2.default)(rule, properties);

    var _loop2 = function _loop2() {
        var lastNode = decls[decls.length - 1];
        var props = decls.filter(function (node) {
            return node.important === lastNode.important;
        });
        if (_hasAllProps2.default.apply(undefined, [props].concat(properties))) {
            (function () {
                var rules = properties.map(function (prop) {
                    return (0, _getLastNode2.default)(props, prop);
                });
                var width = rules[0];
                var style = rules[1];
                var color = rules[2];

                var values = rules.map(function (node) {
                    return (0, _parseTrbl2.default)(node.value);
                });
                var mapped = [0, 1, 2, 3].map(function (i) {
                    return [values[0][i], values[1][i], values[2][i]].join(' ');
                });
                var reduced = getDistinctShorthands(mapped);

                if (isCloseEnough(mapped) && _canMerge2.default.apply(undefined, rules)) {
                    var first = mapped.indexOf(reduced[0]) !== mapped.lastIndexOf(reduced[0]);

                    var border = (0, _insertCloned2.default)(rule, lastNode, {
                        prop: 'border',
                        value: first ? reduced[0] : reduced[1]
                    });

                    if (reduced[1]) {
                        var value = first ? reduced[1] : reduced[0];
                        var prop = 'border-' + _trbl2.default[mapped.indexOf(value)];

                        rule.insertAfter(border, (0, _objectAssign2.default)((0, _clone2.default)(lastNode), {
                            prop: prop,
                            value: value
                        }));
                    }
                    props.forEach(_remove2.default);
                } else if (reduced.length === 1) {
                    rule.insertBefore(color, (0, _objectAssign2.default)((0, _clone2.default)(lastNode), {
                        prop: 'border',
                        value: [width, style].map(_getValue2.default).join(' ')
                    }));
                    props.filter(function (node) {
                        return node.prop !== properties[2];
                    }).forEach(_remove2.default);
                }
            })();
        }
        decls = decls.filter(function (node) {
            return !~props.indexOf(node);
        });
    };

    while (decls.length) {
        _loop2();
    }

    // optimize border-trbl
    decls = (0, _getDecls2.default)(rule, directions);

    var _loop3 = function _loop3() {
        var lastNode = decls[decls.length - 1];
        wsc.forEach(function (d, i) {
            var names = directions.filter(function (name) {
                return name !== lastNode.prop;
            }).map(function (name) {
                return name + '-' + d;
            });
            var props = rule.nodes.filter(function (node) {
                return node.prop && ~names.indexOf(node.prop) && node.important === lastNode.important;
            });
            if (_hasAllProps2.default.apply(undefined, [props].concat(names))) {
                var values = directions.map(function (prop) {
                    return (0, _getLastNode2.default)(props, prop + '-' + d);
                }).map(function (node) {
                    return node ? node.value : null;
                });
                var filteredValues = values.filter(Boolean);
                var lastNodeValue = _postcss.list.space(lastNode.value)[i];
                values[directions.indexOf(lastNode.prop)] = lastNodeValue;
                var value = (0, _minifyTrbl2.default)(values.join(' '));
                if (filteredValues[0] === filteredValues[1] && filteredValues[1] === filteredValues[2]) {
                    value = filteredValues[0];
                }
                var refNode = props[props.length - 1];
                if (value === lastNodeValue) {
                    refNode = lastNode;
                    var valueArray = _postcss.list.space(lastNode.value);
                    valueArray.splice(i, 1);
                    lastNode.value = valueArray.join(' ');
                }
                (0, _insertCloned2.default)(rule, refNode, {
                    prop: 'border-' + d,
                    value: value
                });
                props.forEach(_remove2.default);
            }
        });
        decls = decls.filter(function (node) {
            return node !== lastNode;
        });
    };

    while (decls.length) {
        _loop3();
    }

    rule.walkDecls('border', function (decl) {
        var nextDecl = decl.next();
        if (!nextDecl || nextDecl.type !== 'decl') {
            return;
        }
        var index = directions.indexOf(nextDecl.prop);
        if (!~index) {
            return;
        }
        var values = _postcss.list.space(decl.value);
        var nextValues = _postcss.list.space(nextDecl.value);

        var config = {
            values: values,
            nextValues: nextValues,
            decl: decl,
            nextDecl: nextDecl,
            index: index
        };

        if (values[0] === nextValues[0] && values[2] === nextValues[2]) {
            return mergeRedundant(_extends({}, config, {
                position: 1,
                prop: 'border-style'
            }));
        }

        if (values[1] === nextValues[1] && values[2] === nextValues[2]) {
            return mergeRedundant(_extends({}, config, {
                position: 0,
                prop: 'border-width'
            }));
        }

        if (values[0] === nextValues[0] && values[1] === nextValues[1] && values[2] && nextValues[2]) {
            return mergeRedundant(_extends({}, config, {
                position: 2,
                prop: 'border-color'
            }));
        }
    });

    // clean-up values
    rule.walkDecls(/^border($|-(top|right|bottom|left))/, function (decl) {
        var value = [].concat(_postcss.list.space(decl.value), ['']).reduceRight(function (prev, cur, i) {
            if (prev === '' && cur === defaults[i]) {
                return prev;
            }
            return cur + ' ' + prev;
        }).trim() || defaults[0];
        decl.value = (0, _minifyTrbl2.default)(value);
    });

    // Restore inherited values
    inheritValues.forEach(function (decl) {
        return rule.append(decl);
    });
}

exports.default = {
    explode: explode,
    merge: merge
};
module.exports = exports['default'];