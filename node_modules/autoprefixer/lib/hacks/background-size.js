'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var BackgroundSize = function (_Declaration) {
    _inherits(BackgroundSize, _Declaration);

    function BackgroundSize() {
        _classCallCheck(this, BackgroundSize);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Duplication parameter for -webkit- browsers
     */
    BackgroundSize.prototype.set = function set(decl, prefix) {
        var value = decl.value.toLowerCase();
        if (prefix === '-webkit-' && value.indexOf(' ') === -1 && value !== 'contain' && value !== 'cover') {
            decl.value = decl.value + ' ' + decl.value;
        }
        return _Declaration.prototype.set.call(this, decl, prefix);
    };

    return BackgroundSize;
}(Declaration);

Object.defineProperty(BackgroundSize, 'names', {
    enumerable: true,
    writable: true,
    value: ['background-size']
});


module.exports = BackgroundSize;