'use strict';

exports.__esModule = true;

var _postcss = require('postcss');

function noop() {}

function trimValue(value) {
    return value ? value.trim() : value;
}

function empty(node) {
    return !node.nodes.filter(function (child) {
        return child.type !== 'comment';
    }).length;
}

function equals(a, b) {
    if (a.type !== b.type) {
        return false;
    }

    if (a.important !== b.important) {
        return false;
    }

    if (a.raws && !b.raws || !a.raws && b.raws) {
        return false;
    }

    switch (a.type) {
        case 'rule':
            if (a.selector !== b.selector) {
                return false;
            }
            break;
        case 'atrule':
            if (a.name !== b.name || a.params !== b.params) {
                return false;
            }

            if (a.raws && trimValue(a.raws.before) !== trimValue(b.raws.before)) {
                return false;
            }

            if (a.raws && trimValue(a.raws.afterName) !== trimValue(b.raws.afterName)) {
                return false;
            }
            break;
        case 'decl':
            if (a.prop !== b.prop || a.value !== b.value) {
                return false;
            }

            if (a.raws && trimValue(a.raws.before) !== trimValue(b.raws.before)) {
                return false;
            }
            break;
    }

    if (a.nodes) {
        if (a.nodes.length !== b.nodes.length) {
            return false;
        }

        for (var i = 0; i < a.nodes.length; i++) {
            if (!equals(a.nodes[i], b.nodes[i])) {
                return false;
            }
        }
    }
    return true;
}

function dedupeRule(last, nodes) {
    var index = nodes.indexOf(last) - 1;

    var _loop = function _loop() {
        var node = nodes[index--];
        if (node && node.type === 'rule' && node.selector === last.selector) {
            last.each(function (child) {
                if (child.type === 'decl') {
                    dedupeNode(child, node.nodes);
                }
            });

            if (empty(node)) {
                node.remove();
            }
        }
    };

    while (index >= 0) {
        _loop();
    }
}

function dedupeNode(last, nodes) {
    var index = !!~nodes.indexOf(last) ? nodes.indexOf(last) - 1 : nodes.length - 1;

    while (index >= 0) {
        var _node = nodes[index--];
        if (_node && equals(_node, last)) {
            _node.remove();
        }
    }
}

var handlers = {
    rule: dedupeRule,
    atrule: dedupeNode,
    decl: dedupeNode,
    comment: noop
};

function dedupe(root) {
    var nodes = root.nodes;

    if (!nodes) {
        return;
    }

    var index = nodes.length - 1;
    while (index >= 0) {
        var last = nodes[index--];
        if (!last || !last.parent) {
            continue;
        }
        dedupe(last);
        handlers[last.type](last, nodes);
    }
}

exports.default = (0, _postcss.plugin)('postcss-discard-duplicates', function () {
    return dedupe;
});
module.exports = exports['default'];