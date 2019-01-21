'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var ImageRendering = function (_Declaration) {
    _inherits(ImageRendering, _Declaration);

    function ImageRendering() {
        _classCallCheck(this, ImageRendering);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Add hack only for crisp-edges
     */
    ImageRendering.prototype.check = function check(decl) {
        return decl.value === 'pixelated';
    };

    /**
     * Change property name for IE
     */


    ImageRendering.prototype.prefixed = function prefixed(prop, prefix) {
        if (prefix === '-ms-') {
            return '-ms-interpolation-mode';
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    /**
     * Change property and value for IE
     */


    ImageRendering.prototype.set = function set(decl, prefix) {
        if (prefix !== '-ms-') return _Declaration.prototype.set.call(this, decl, prefix);
        decl.prop = '-ms-interpolation-mode';
        decl.value = 'nearest-neighbor';
        return decl;
    };

    /**
     * Return property name by spec
     */


    ImageRendering.prototype.normalize = function normalize() {
        return 'image-rendering';
    };

    /**
     * Warn on old value
     */


    ImageRendering.prototype.process = function process(node, result) {
        return _Declaration.prototype.process.call(this, node, result);
    };

    return ImageRendering;
}(Declaration);

Object.defineProperty(ImageRendering, 'names', {
    enumerable: true,
    writable: true,
    value: ['image-rendering', 'interpolation-mode']
});


module.exports = ImageRendering;