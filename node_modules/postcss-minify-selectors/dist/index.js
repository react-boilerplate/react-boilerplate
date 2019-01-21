'use strict';

exports.__esModule = true;

var _postcss = require('postcss');

var _alphanumSort = require('alphanum-sort');

var _alphanumSort2 = _interopRequireDefault(_alphanumSort);

var _has = require('has');

var _has2 = _interopRequireDefault(_has);

var _postcssSelectorParser = require('postcss-selector-parser');

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

var _unquote = require('./lib/unquote');

var _unquote2 = _interopRequireDefault(_unquote);

var _canUnquote = require('./lib/canUnquote');

var _canUnquote2 = _interopRequireDefault(_canUnquote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pseudoElements = ['::before', '::after', '::first-letter', '::first-line'];

function getParsed(selectors, callback) {
    return (0, _postcssSelectorParser2.default)(callback).process(selectors).result;
}

function attribute(selector) {
    if (selector.value) {
        // Join selectors that are split over new lines
        selector.value = selector.value.replace(/\\\n/g, '').trim();
        if ((0, _canUnquote2.default)(selector.value)) {
            selector.value = (0, _unquote2.default)(selector.value);
        }
        selector.operator = selector.operator.trim();
    }
    if (selector.raws && selector.raws.insensitive) {
        selector.raws.insensitive = '';
    }
    selector.attribute = selector.attribute.trim();
}

function combinator(selector) {
    var value = selector.value.trim();
    selector.value = value.length ? value : ' ';
}

var pseudoReplacements = {
    ':nth-child': ':first-child',
    ':nth-of-type': ':first-of-type',
    ':nth-last-child': ':last-child',
    ':nth-last-of-type': ':last-of-type'
};

function pseudo(selector) {
    if (selector.nodes.length === 1 && pseudoReplacements[selector.value]) {
        var first = selector.at(0);
        var one = first.at(0);
        if (first.length === 1) {
            if (one.value === '1') {
                selector.replaceWith(_postcssSelectorParser2.default.pseudo({
                    value: pseudoReplacements[selector.value]
                }));
            }
            if (one.value === 'even') {
                one.value = '2n';
            }
        }
        if (first.length === 3) {
            var two = first.at(1);
            var three = first.at(2);
            if (one.value === '2n' && two.value === '+' && three.value === '1') {
                one.value = 'odd';
                two.remove();
                three.remove();
            }
        }

        return;
    }
    var uniques = [];
    selector.walk(function (child) {
        if (child.type === 'selector') {
            var childStr = String(child);
            if (!~uniques.indexOf(childStr)) {
                uniques.push(childStr);
            } else {
                child.remove();
            }
        }
    });
    if (~pseudoElements.indexOf(selector.value)) {
        selector.value = selector.value.slice(1);
    }
}

var tagReplacements = {
    from: '0%',
    '100%': 'to'
};

function tag(selector) {
    var value = selector.value;

    if ((0, _has2.default)(tagReplacements, value)) {
        selector.value = tagReplacements[value];
    }
}

function universal(selector) {
    var next = selector.next();
    if (next && next.type !== 'combinator') {
        selector.remove();
    }
}

var reducers = {
    attribute: attribute,
    combinator: combinator,
    pseudo: pseudo,
    tag: tag,
    universal: universal
};

function optimise(rule) {
    var selector = rule.raws.selector && rule.raws.selector.value === rule.selector ? rule.raws.selector.raw : rule.selector;
    // If the selector ends with a ':' it is likely a part of a custom mixin,
    // so just pass through.
    if (selector[selector.length - 1] === ':') {
        return;
    }
    rule.selector = getParsed(selector, function (selectors) {
        selectors.nodes = (0, _alphanumSort2.default)(selectors.nodes, { insensitive: true });
        var uniqueSelectors = [];
        selectors.walk(function (sel) {
            var type = sel.type;
            // Trim whitespace around the value

            sel.spaces.before = sel.spaces.after = '';
            if ((0, _has2.default)(reducers, type)) {
                reducers[type](sel);
                return;
            }
            var toString = String(sel);
            if (type === 'selector' && sel.parent.type !== 'pseudo') {
                if (!~uniqueSelectors.indexOf(toString)) {
                    uniqueSelectors.push(toString);
                } else {
                    sel.remove();
                }
            }
        });
    });
}

exports.default = (0, _postcss.plugin)('postcss-minify-selectors', function () {
    return function (css) {
        return css.walkRules(optimise);
    };
});
module.exports = exports['default'];