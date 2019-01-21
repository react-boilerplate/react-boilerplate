'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Prefixer = require('./prefixer');

var AtRule = function (_Prefixer) {
    _inherits(AtRule, _Prefixer);

    function AtRule() {
        _classCallCheck(this, AtRule);

        return _possibleConstructorReturn(this, _Prefixer.apply(this, arguments));
    }

    /**
     * Clone and add prefixes for at-rule
     */
    AtRule.prototype.add = function add(rule, prefix) {
        var prefixed = prefix + rule.name;

        var already = rule.parent.some(function (i) {
            return i.name === prefixed && i.params === rule.params;
        });
        if (already) {
            return undefined;
        }

        var cloned = this.clone(rule, { name: prefixed });
        return rule.parent.insertBefore(rule, cloned);
    };

    /**
     * Clone node with prefixes
     */


    AtRule.prototype.process = function process(node) {
        var parent = this.parentPrefix(node);

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

            if (!parent || parent === prefix) {
                this.add(node, prefix);
            }
        }
    };

    return AtRule;
}(Prefixer);

module.exports = AtRule;