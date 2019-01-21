'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var BlockLogical = function (_Declaration) {
    _inherits(BlockLogical, _Declaration);

    function BlockLogical() {
        _classCallCheck(this, BlockLogical);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Use old syntax for -moz- and -webkit-
     */
    BlockLogical.prototype.prefixed = function prefixed(prop, prefix) {
        return prefix + (prop.indexOf('-start') !== -1 ? prop.replace('-block-start', '-before') : prop.replace('-block-end', '-after'));
    };

    /**
     * Return property name by spec
     */


    BlockLogical.prototype.normalize = function normalize(prop) {
        if (prop.indexOf('-before') !== -1) {
            return prop.replace('-before', '-block-start');
        } else {
            return prop.replace('-after', '-block-end');
        }
    };

    return BlockLogical;
}(Declaration);

Object.defineProperty(BlockLogical, 'names', {
    enumerable: true,
    writable: true,
    value: ['border-block-start', 'border-block-end', 'margin-block-start', 'margin-block-end', 'padding-block-start', 'padding-block-end', 'border-before', 'border-after', 'margin-before', 'margin-after', 'padding-before', 'padding-after']
});


module.exports = BlockLogical;