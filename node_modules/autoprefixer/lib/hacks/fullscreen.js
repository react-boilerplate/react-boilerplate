'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Selector = require('../selector');

var Fullscreen = function (_Selector) {
    _inherits(Fullscreen, _Selector);

    function Fullscreen() {
        _classCallCheck(this, Fullscreen);

        return _possibleConstructorReturn(this, _Selector.apply(this, arguments));
    }

    /**
     * Return different selectors depend on prefix
     */
    Fullscreen.prototype.prefixed = function prefixed(prefix) {
        if (prefix === '-webkit-') {
            return ':-webkit-full-screen';
        } else if (prefix === '-moz-') {
            return ':-moz-full-screen';
        } else {
            return ':' + prefix + 'fullscreen';
        }
    };

    return Fullscreen;
}(Selector);

Object.defineProperty(Fullscreen, 'names', {
    enumerable: true,
    writable: true,
    value: [':fullscreen']
});


module.exports = Fullscreen;