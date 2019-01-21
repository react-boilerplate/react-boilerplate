'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var BreakProps = function (_Declaration) {
    _inherits(BreakProps, _Declaration);

    function BreakProps() {
        _classCallCheck(this, BreakProps);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Change name for -webkit- and -moz- prefix
     */
    BreakProps.prototype.prefixed = function prefixed(prop, prefix) {
        return prefix + 'column-' + prop;
    };

    /**
     * Return property name by final spec
     */


    BreakProps.prototype.normalize = function normalize(prop) {
        if (prop.indexOf('inside') !== -1) {
            return 'break-inside';
        } else if (prop.indexOf('before') !== -1) {
            return 'break-before';
        } else {
            return 'break-after';
        }
    };

    /**
     * Change prefixed value for avoid-column and avoid-page
     */


    BreakProps.prototype.set = function set(decl, prefix) {
        if (decl.prop === 'break-inside' && decl.value === 'avoid-column' || decl.value === 'avoid-page') {
            decl.value = 'avoid';
        }
        return _Declaration.prototype.set.call(this, decl, prefix);
    };

    /**
     * Don’t prefix some values
     */


    BreakProps.prototype.insert = function insert(decl, prefix, prefixes) {
        if (decl.prop !== 'break-inside') {
            return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
        } else if (/region/i.test(decl.value) || /page/i.test(decl.value)) {
            return undefined;
        } else {
            return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
        }
    };

    return BreakProps;
}(Declaration);

Object.defineProperty(BreakProps, 'names', {
    enumerable: true,
    writable: true,
    value: ['break-inside', 'page-break-inside', 'column-break-inside', 'break-before', 'page-break-before', 'column-break-before', 'break-after', 'page-break-after', 'column-break-after']
});


module.exports = BreakProps;