'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var BorderRadius = function (_Declaration) {
    _inherits(BorderRadius, _Declaration);

    function BorderRadius() {
        _classCallCheck(this, BorderRadius);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Change syntax, when add Mozilla prefix
     */
    BorderRadius.prototype.prefixed = function prefixed(prop, prefix) {
        if (prefix === '-moz-') {
            return prefix + (BorderRadius.toMozilla[prop] || prop);
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    /**
     * Return unprefixed version of property
     */


    BorderRadius.prototype.normalize = function normalize(prop) {
        return BorderRadius.toNormal[prop] || prop;
    };

    return BorderRadius;
}(Declaration);

Object.defineProperty(BorderRadius, 'names', {
    enumerable: true,
    writable: true,
    value: ['border-radius']
});
Object.defineProperty(BorderRadius, 'toMozilla', {
    enumerable: true,
    writable: true,
    value: {}
});
Object.defineProperty(BorderRadius, 'toNormal', {
    enumerable: true,
    writable: true,
    value: {}
});
var _arr = ['top', 'bottom'];


for (var _i = 0; _i < _arr.length; _i++) {
    var ver = _arr[_i];var _arr2 = ['left', 'right'];

    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var hor = _arr2[_i2];
        var normal = 'border-' + ver + '-' + hor + '-radius';
        var mozilla = 'border-radius-' + ver + hor;

        BorderRadius.names.push(normal);
        BorderRadius.names.push(mozilla);

        BorderRadius.toMozilla[normal] = mozilla;
        BorderRadius.toNormal[mozilla] = normal;
    }
}

module.exports = BorderRadius;