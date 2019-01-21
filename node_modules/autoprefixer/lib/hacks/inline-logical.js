'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var InlineLogical = function (_Declaration) {
    _inherits(InlineLogical, _Declaration);

    function InlineLogical() {
        _classCallCheck(this, InlineLogical);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Use old syntax for -moz- and -webkit-
     */
    InlineLogical.prototype.prefixed = function prefixed(prop, prefix) {
        return prefix + prop.replace('-inline', '');
    };

    /**
     * Return property name by spec
     */


    InlineLogical.prototype.normalize = function normalize(prop) {
        return prop.replace(/(margin|padding|border)-(start|end)/, '$1-inline-$2');
    };

    return InlineLogical;
}(Declaration);

Object.defineProperty(InlineLogical, 'names', {
    enumerable: true,
    writable: true,
    value: ['border-inline-start', 'border-inline-end', 'margin-inline-start', 'margin-inline-end', 'padding-inline-start', 'padding-inline-end', 'border-start', 'border-end', 'margin-start', 'margin-end', 'padding-start', 'padding-end']
});


module.exports = InlineLogical;