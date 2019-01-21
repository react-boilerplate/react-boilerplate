'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Prefixer = require('./prefixer');
var utils = require('./utils');

var n2f = require('num2fraction');

var regexp = /(min|max)-resolution\s*:\s*\d*\.?\d+(dppx|dpi)/gi;
var split = /(min|max)-resolution(\s*:\s*)(\d*\.?\d+)(dppx|dpi)/i;

var Resolution = function (_Prefixer) {
    _inherits(Resolution, _Prefixer);

    function Resolution() {
        _classCallCheck(this, Resolution);

        return _possibleConstructorReturn(this, _Prefixer.apply(this, arguments));
    }

    /**
     * Return prefixed query name
     */
    Resolution.prototype.prefixName = function prefixName(prefix, name) {
        var newName = prefix === '-moz-' ? name + '--moz-device-pixel-ratio' : prefix + name + '-device-pixel-ratio';
        return newName;
    };

    /**
     * Return prefixed query
     */


    Resolution.prototype.prefixQuery = function prefixQuery(prefix, name, colon, value, units) {
        if (units === 'dpi') {
            value = Number(value / 96);
        }
        if (prefix === '-o-') {
            value = n2f(value);
        }
        return this.prefixName(prefix, name) + colon + value;
    };

    /**
     * Remove prefixed queries
     */


    Resolution.prototype.clean = function clean(rule) {
        var _this2 = this;

        if (!this.bad) {
            this.bad = [];
            for (var _iterator = this.prefixes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var prefix = _ref;

                this.bad.push(this.prefixName(prefix, 'min'));
                this.bad.push(this.prefixName(prefix, 'max'));
            }
        }

        rule.params = utils.editList(rule.params, function (queries) {
            return queries.filter(function (query) {
                return _this2.bad.every(function (i) {
                    return query.indexOf(i) === -1;
                });
            });
        });
    };

    /**
     * Add prefixed queries
     */


    Resolution.prototype.process = function process(rule) {
        var _this3 = this;

        var parent = this.parentPrefix(rule);
        var prefixes = parent ? [parent] : this.prefixes;

        rule.params = utils.editList(rule.params, function (origin, prefixed) {
            for (var _iterator2 = origin, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var query = _ref2;

                if (query.indexOf('min-resolution') === -1 && query.indexOf('max-resolution') === -1) {
                    prefixed.push(query);
                    continue;
                }

                var _loop = function _loop(prefix) {
                    var processed = query.replace(regexp, function (str) {
                        var parts = str.match(split);
                        return _this3.prefixQuery(prefix, parts[1], parts[2], parts[3], parts[4]);
                    });
                    prefixed.push(processed);
                };

                for (var _iterator3 = prefixes, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                    var _ref3;

                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i3++];
                    } else {
                        _i3 = _iterator3.next();
                        if (_i3.done) break;
                        _ref3 = _i3.value;
                    }

                    var prefix = _ref3;

                    _loop(prefix);
                }
                prefixed.push(query);
            }

            return utils.uniq(prefixed);
        });
    };

    return Resolution;
}(Prefixer);

module.exports = Resolution;