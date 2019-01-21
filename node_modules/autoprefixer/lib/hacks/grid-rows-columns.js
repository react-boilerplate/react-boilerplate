'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var _require = require('./grid-utils'),
    prefixTrackProp = _require.prefixTrackProp,
    prefixTrackValue = _require.prefixTrackValue;

var GridRowsColumns = function (_Declaration) {
    _inherits(GridRowsColumns, _Declaration);

    function GridRowsColumns() {
        _classCallCheck(this, GridRowsColumns);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Change property name for IE
     */
    GridRowsColumns.prototype.prefixed = function prefixed(prop, prefix) {
        if (prefix === '-ms-') {
            return prefixTrackProp({ prop: prop, prefix: prefix });
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    /**
     * Change IE property back
     */


    GridRowsColumns.prototype.normalize = function normalize(prop) {
        return prop.replace(/^grid-(rows|columns)/, 'grid-template-$1');
    };

    /**
     * Change repeating syntax for IE
     */


    GridRowsColumns.prototype.set = function set(decl, prefix) {
        if (prefix === '-ms-' && decl.value.indexOf('repeat(') !== -1) {
            decl.value = prefixTrackValue({ value: decl.value });
        }
        return _Declaration.prototype.set.call(this, decl, prefix);
    };

    return GridRowsColumns;
}(Declaration);

Object.defineProperty(GridRowsColumns, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-template-rows', 'grid-template-columns', 'grid-rows', 'grid-columns']
});


module.exports = GridRowsColumns;