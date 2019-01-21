'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var OldValue = require('../old-value');
var Value = require('../value');

function _regexp(name) {
    return new RegExp('(^|[\\s,(])(' + name + '($|[\\s),]))', 'gi');
}

var Intrinsic = function (_Value) {
    _inherits(Intrinsic, _Value);

    function Intrinsic() {
        _classCallCheck(this, Intrinsic);

        return _possibleConstructorReturn(this, _Value.apply(this, arguments));
    }

    Intrinsic.prototype.regexp = function regexp() {
        if (!this.regexpCache) this.regexpCache = _regexp(this.name);
        return this.regexpCache;
    };

    Intrinsic.prototype.isStretch = function isStretch() {
        return this.name === 'stretch' || this.name === 'fill' || this.name === 'fill-available';
    };

    Intrinsic.prototype.replace = function replace(string, prefix) {
        if (prefix === '-moz-' && this.isStretch()) {
            return string.replace(this.regexp(), '$1-moz-available$3');
        } else if (prefix === '-webkit-' && this.isStretch()) {
            return string.replace(this.regexp(), '$1-webkit-fill-available$3');
        } else {
            return _Value.prototype.replace.call(this, string, prefix);
        }
    };

    Intrinsic.prototype.old = function old(prefix) {
        var prefixed = prefix + this.name;
        if (this.isStretch()) {
            if (prefix === '-moz-') {
                prefixed = '-moz-available';
            } else if (prefix === '-webkit-') {
                prefixed = '-webkit-fill-available';
            }
        }
        return new OldValue(this.name, prefixed, prefixed, _regexp(prefixed));
    };

    Intrinsic.prototype.add = function add(decl, prefix) {
        if (decl.prop.indexOf('grid') !== -1 && prefix !== '-webkit-') {
            return undefined;
        }
        return _Value.prototype.add.call(this, decl, prefix);
    };

    return Intrinsic;
}(Value);

Object.defineProperty(Intrinsic, 'names', {
    enumerable: true,
    writable: true,
    value: ['max-content', 'min-content', 'fit-content', 'fill', 'fill-available', 'stretch']
});


module.exports = Intrinsic;