'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Browsers = require('./browsers');
var utils = require('./utils');

var vendor = require('postcss').vendor;

/**
 * Recursivly clone objects
 */
function _clone(obj, parent) {
    var cloned = new obj.constructor();

    for (var _iterator = Object.keys(obj || {}), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var i = _ref;

        var value = obj[i];
        if (i === 'parent' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            if (parent) {
                cloned[i] = parent;
            }
        } else if (i === 'source' || i === null) {
            cloned[i] = value;
        } else if (value instanceof Array) {
            cloned[i] = value.map(function (x) {
                return _clone(x, cloned);
            });
        } else if (i !== '_autoprefixerPrefix' && i !== '_autoprefixerValues') {
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
                value = _clone(value, cloned);
            }
            cloned[i] = value;
        }
    }

    return cloned;
}

var Prefixer = function () {

    /**
     * Add hack to selected names
     */
    Prefixer.hack = function hack(klass) {
        var _this = this;

        if (!this.hacks) {
            this.hacks = {};
        }
        return klass.names.map(function (name) {
            _this.hacks[name] = klass;
            return _this.hacks[name];
        });
    };

    /**
     * Load hacks for some names
     */


    Prefixer.load = function load(name, prefixes, all) {
        var Klass = this.hacks && this.hacks[name];
        if (Klass) {
            return new Klass(name, prefixes, all);
        } else {
            return new this(name, prefixes, all);
        }
    };

    /**
     * Clone node and clean autprefixer custom caches
     */


    Prefixer.clone = function clone(node, overrides) {
        var cloned = _clone(node);
        for (var name in overrides) {
            cloned[name] = overrides[name];
        }
        return cloned;
    };

    function Prefixer(name, prefixes, all) {
        _classCallCheck(this, Prefixer);

        this.name = name;
        this.prefixes = prefixes;
        this.all = all;
    }

    /**
     * Find prefix in node parents
     */


    Prefixer.prototype.parentPrefix = function parentPrefix(node) {
        var prefix = void 0;

        if (typeof node._autoprefixerPrefix !== 'undefined') {
            prefix = node._autoprefixerPrefix;
        } else if (node.type === 'decl' && node.prop[0] === '-') {
            prefix = vendor.prefix(node.prop);
        } else if (node.type === 'root') {
            prefix = false;
        } else if (node.type === 'rule' && node.selector.indexOf(':-') !== -1 && /:(-\w+-)/.test(node.selector)) {
            prefix = node.selector.match(/:(-\w+-)/)[1];
        } else if (node.type === 'atrule' && node.name[0] === '-') {
            prefix = vendor.prefix(node.name);
        } else {
            prefix = this.parentPrefix(node.parent);
        }

        if (Browsers.prefixes().indexOf(prefix) === -1) {
            prefix = false;
        }

        node._autoprefixerPrefix = prefix;

        return node._autoprefixerPrefix;
    };

    /**
     * Clone node with prefixes
     */


    Prefixer.prototype.process = function process(node, result) {
        if (!this.check(node)) {
            return undefined;
        }

        var parent = this.parentPrefix(node);

        var prefixes = this.prefixes.filter(function (prefix) {
            return !parent || parent === utils.removeNote(prefix);
        });

        var added = [];
        for (var _iterator2 = prefixes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var prefix = _ref2;

            if (this.add(node, prefix, added.concat([prefix]), result)) {
                added.push(prefix);
            }
        }

        return added;
    };

    /**
     * Shortcut for Prefixer.clone
     */


    Prefixer.prototype.clone = function clone(node, overrides) {
        return Prefixer.clone(node, overrides);
    };

    return Prefixer;
}();

module.exports = Prefixer;