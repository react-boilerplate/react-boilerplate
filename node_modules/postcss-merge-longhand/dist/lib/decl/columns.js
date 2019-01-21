'use strict';

exports.__esModule = true;

var _postcss = require('postcss');

var _postcssValueParser = require('postcss-value-parser');

var _stylehacks = require('stylehacks');

var _genericMerge = require('../genericMerge');

var _getValue = require('../getValue');

var _getValue2 = _interopRequireDefault(_getValue);

var _insertCloned = require('../insertCloned');

var _insertCloned2 = _interopRequireDefault(_insertCloned);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = ['column-width', 'column-count'];
var auto = 'auto';

/**
 * Normalize a columns shorthand definition. Both of the longhand
 * properties' initial values are 'auto', and as per the spec,
 * omitted values are set to their initial values. Thus, we can
 * remove any 'auto' definition when there are two values.
 *
 * Specification link: https://www.w3.org/TR/css3-multicol/
 */

function normalize(values) {
    if (values[0] === auto) {
        return values[1];
    }
    if (values[1] === auto) {
        return values[0];
    }
    return values.join(' ');
}

function explode(rule) {
    if (rule.nodes.some(_stylehacks.detect)) {
        return false;
    }
    rule.walkDecls('columns', function (decl) {
        var values = _postcss.list.space(decl.value);
        if (values.length === 1) {
            values.push(auto);
        }

        values.forEach(function (value, i) {
            var prop = properties[1];

            if (value === auto) {
                prop = properties[i];
            } else if ((0, _postcssValueParser.unit)(value).unit) {
                prop = properties[0];
            }

            (0, _insertCloned2.default)(rule, decl, {
                prop: prop,
                value: value
            });
        });
        decl.remove();
    });
}

var merge = (0, _genericMerge.genericMergeFactory)({
    prop: 'columns',
    properties: properties,
    value: function value(rules) {
        return normalize(rules.map(_getValue2.default));
    }
});

exports.default = {
    explode: explode,
    merge: merge
};
module.exports = exports['default'];