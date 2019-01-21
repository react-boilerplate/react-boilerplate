'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var GridStart = function (_Declaration) {
    _inherits(GridStart, _Declaration);

    function GridStart() {
        _classCallCheck(this, GridStart);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Do not add prefix for unsupported value in IE
     */
    GridStart.prototype.check = function check(decl) {
        var value = decl.value;
        return value.indexOf('/') === -1 || value.indexOf('span') !== -1;
    };

    /**
     * Return a final spec property
     */


    GridStart.prototype.normalize = function normalize(prop) {
        return prop.replace('-start', '');
    };

    /**
     * Change property name for IE
     */


    GridStart.prototype.prefixed = function prefixed(prop, prefix) {
        var result = _Declaration.prototype.prefixed.call(this, prop, prefix);
        if (prefix === '-ms-') {
            result = result.replace('-start', '');
        }
        return result;
    };

    return GridStart;
}(Declaration);

Object.defineProperty(GridStart, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-row-start', 'grid-column-start']
});


module.exports = GridStart;