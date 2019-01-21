'use strict';

exports.__esModule = true;

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unicode(range) {
    var values = range.slice(2).split('-');
    if (values.length < 2) {
        return range;
    }
    var left = values[0].split('');
    var right = values[1].split('');

    if (left.length !== right.length) {
        return range;
    }

    var questionCounter = 0;

    var merged = left.reduce(function (group, value, index) {
        if (group === false) {
            return false;
        }
        if (value === right[index] && !questionCounter) {
            return group + value;
        }
        if (value === '0' && right[index] === 'f') {
            questionCounter++;
            return group + '?';
        }
        return false;
    }, 'u+');

    /*
     * The maximum number of wildcard characters (?) for ranges is 5.
     */

    if (merged && questionCounter < 6) {
        return merged;
    }

    return range;
}

exports.default = _postcss2.default.plugin('cssnano-normalize-unicode', function () {
    return function (css) {
        css.walkDecls(/^unicode-range$/i, function (node) {
            node.prop = 'unicode-range';
            node.value = (0, _postcssValueParser2.default)(node.value).walk(function (child) {
                if (child.type === 'word') {
                    child.value = unicode(child.value.toLowerCase());
                }
                return false;
            }).toString();
        });
    };
});
module.exports = exports['default'];