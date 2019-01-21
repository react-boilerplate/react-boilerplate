'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var GridColumnAlign = function (_Declaration) {
    _inherits(GridColumnAlign, _Declaration);

    function GridColumnAlign() {
        _classCallCheck(this, GridColumnAlign);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Do not prefix flexbox values
     */
    GridColumnAlign.prototype.check = function check(decl) {
        return decl.value.indexOf('flex-') === -1 && decl.value !== 'baseline';
    };

    /**
     * Change property name for IE
     */


    GridColumnAlign.prototype.prefixed = function prefixed(prop, prefix) {
        return prefix + 'grid-column-align';
    };

    /**
     * Change IE property back
     */


    GridColumnAlign.prototype.normalize = function normalize() {
        return 'justify-self';
    };

    return GridColumnAlign;
}(Declaration);

Object.defineProperty(GridColumnAlign, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-column-align']
});


module.exports = GridColumnAlign;