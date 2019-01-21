'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Prefixer = require('./prefixer');
var Browsers = require('./browsers');
var utils = require('./utils');

var Declaration = function (_Prefixer) {
    _inherits(Declaration, _Prefixer);

    function Declaration() {
        _classCallCheck(this, Declaration);

        return _possibleConstructorReturn(this, _Prefixer.apply(this, arguments));
    }

    /**
     * Always true, because we already get prefixer by property name
     */
    Declaration.prototype.check = function check() /* decl */{
        return true;
    };

    /**
     * Return prefixed version of property
     */


    Declaration.prototype.prefixed = function prefixed(prop, prefix) {
        return prefix + prop;
    };

    /**
     * Return unprefixed version of property
     */


    Declaration.prototype.normalize = function normalize(prop) {
        return prop;
    };

    /**
     * Check `value`, that it contain other prefixes, rather than `prefix`
     */


    Declaration.prototype.otherPrefixes = function otherPrefixes(value, prefix) {
        for (var _iterator = Browsers.prefixes(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var other = _ref;

            if (other === prefix) {
                continue;
            }
            if (value.indexOf(other) !== -1) {
                return true;
            }
        }
        return false;
    };

    /**
     * Set prefix to declaration
     */


    Declaration.prototype.set = function set(decl, prefix) {
        decl.prop = this.prefixed(decl.prop, prefix);
        return decl;
    };

    /**
     * Should we use visual cascade for prefixes
     */


    Declaration.prototype.needCascade = function needCascade(decl) {
        if (!decl._autoprefixerCascade) {
            decl._autoprefixerCascade = this.all.options.cascade !== false && decl.raw('before').indexOf('\n') !== -1;
        }
        return decl._autoprefixerCascade;
    };

    /**
     * Return maximum length of possible prefixed property
     */


    Declaration.prototype.maxPrefixed = function maxPrefixed(prefixes, decl) {
        if (decl._autoprefixerMax) {
            return decl._autoprefixerMax;
        }

        var max = 0;
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

            prefix = utils.removeNote(prefix);
            if (prefix.length > max) {
                max = prefix.length;
            }
        }
        decl._autoprefixerMax = max;

        return decl._autoprefixerMax;
    };

    /**
     * Calculate indentation to create visual cascade
     */


    Declaration.prototype.calcBefore = function calcBefore(prefixes, decl) {
        var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        var max = this.maxPrefixed(prefixes, decl);
        var diff = max - utils.removeNote(prefix).length;

        var before = decl.raw('before');
        if (diff > 0) {
            before += Array(diff).fill(' ').join('');
        }

        return before;
    };

    /**
     * Remove visual cascade
     */


    Declaration.prototype.restoreBefore = function restoreBefore(decl) {
        var lines = decl.raw('before').split('\n');
        var min = lines[lines.length - 1];

        this.all.group(decl).up(function (prefixed) {
            var array = prefixed.raw('before').split('\n');
            var last = array[array.length - 1];
            if (last.length < min.length) {
                min = last;
            }
        });

        lines[lines.length - 1] = min;
        decl.raws.before = lines.join('\n');
    };

    /**
     * Clone and insert new declaration
     */


    Declaration.prototype.insert = function insert(decl, prefix, prefixes) {
        var cloned = this.set(this.clone(decl), prefix);
        if (!cloned) return undefined;

        var already = decl.parent.some(function (i) {
            return i.prop === cloned.prop && i.value === cloned.value;
        });
        if (already) {
            return undefined;
        }

        if (this.needCascade(decl)) {
            cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
        }
        return decl.parent.insertBefore(decl, cloned);
    };

    /**
     * Did this declaration has this prefix above
     */


    Declaration.prototype.isAlready = function isAlready(decl, prefixed) {
        var already = this.all.group(decl).up(function (i) {
            return i.prop === prefixed;
        });
        if (!already) {
            already = this.all.group(decl).down(function (i) {
                return i.prop === prefixed;
            });
        }
        return already;
    };

    /**
     * Clone and add prefixes for declaration
     */


    Declaration.prototype.add = function add(decl, prefix, prefixes, result) {
        var prefixed = this.prefixed(decl.prop, prefix);
        if (this.isAlready(decl, prefixed) || this.otherPrefixes(decl.value, prefix)) {
            return undefined;
        }
        return this.insert(decl, prefix, prefixes, result);
    };

    /**
     * Add spaces for visual cascade
     */


    Declaration.prototype.process = function process(decl, result) {
        if (!this.needCascade(decl)) {
            _Prefixer.prototype.process.call(this, decl, result);
            return;
        }

        var prefixes = _Prefixer.prototype.process.call(this, decl, result);

        if (!prefixes || !prefixes.length) {
            return;
        }

        this.restoreBefore(decl);
        decl.raws.before = this.calcBefore(prefixes, decl);
    };

    /**
     * Return list of prefixed properties to clean old prefixes
     */


    Declaration.prototype.old = function old(prop, prefix) {
        return [this.prefixed(prop, prefix)];
    };

    return Declaration;
}(Prefixer);

module.exports = Declaration;