'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var OverscrollBehavior = function (_Declaration) {
    _inherits(OverscrollBehavior, _Declaration);

    function OverscrollBehavior() {
        _classCallCheck(this, OverscrollBehavior);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Change property name for IE
     */
    OverscrollBehavior.prototype.prefixed = function prefixed(prop, prefix) {
        return prefix + 'scroll-chaining';
    };

    /**
     * Return property name by spec
     */


    OverscrollBehavior.prototype.normalize = function normalize() {
        return 'overscroll-behavior';
    };

    /**
     * Change value for IE
     */


    OverscrollBehavior.prototype.set = function set(decl, prefix) {
        if (decl.value === 'auto') {
            decl.value = 'chained';
        } else if (decl.value === 'none' || decl.value === 'contain') {
            decl.value = 'none';
        }
        return _Declaration.prototype.set.call(this, decl, prefix);
    };

    return OverscrollBehavior;
}(Declaration);

Object.defineProperty(OverscrollBehavior, 'names', {
    enumerable: true,
    writable: true,
    value: ['overscroll-behavior', 'scroll-chaining']
});


module.exports = OverscrollBehavior;