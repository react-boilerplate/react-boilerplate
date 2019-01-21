'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var OldValue = require('../old-value');
var Value = require('../value');

var Pixelated = function (_Value) {
    _inherits(Pixelated, _Value);

    function Pixelated() {
        _classCallCheck(this, Pixelated);

        return _possibleConstructorReturn(this, _Value.apply(this, arguments));
    }

    /**
     * Use non-standard name for WebKit and Firefox
     */
    Pixelated.prototype.replace = function replace(string, prefix) {
        if (prefix === '-webkit-') {
            return string.replace(this.regexp(), '$1-webkit-optimize-contrast');
        } else if (prefix === '-moz-') {
            return string.replace(this.regexp(), '$1-moz-crisp-edges');
        } else {
            return _Value.prototype.replace.call(this, string, prefix);
        }
    };

    /**
     * Different name for WebKit and Firefox
     */


    Pixelated.prototype.old = function old(prefix) {
        if (prefix === '-webkit-') {
            return new OldValue(this.name, '-webkit-optimize-contrast');
        } else if (prefix === '-moz-') {
            return new OldValue(this.name, '-moz-crisp-edges');
        } else {
            return _Value.prototype.old.call(this, prefix);
        }
    };

    return Pixelated;
}(Value);

Object.defineProperty(Pixelated, 'names', {
    enumerable: true,
    writable: true,
    value: ['pixelated']
});


module.exports = Pixelated;