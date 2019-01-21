'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var OldValue = require('../old-value');
var Value = require('../value');

var DisplayFlex = function (_Value) {
    _inherits(DisplayFlex, _Value);

    function DisplayFlex(name, prefixes) {
        _classCallCheck(this, DisplayFlex);

        var _this = _possibleConstructorReturn(this, _Value.call(this, name, prefixes));

        if (name === 'display-flex') {
            _this.name = 'flex';
        }
        return _this;
    }

    /**
     * Faster check for flex value
     */


    DisplayFlex.prototype.check = function check(decl) {
        return decl.prop === 'display' && decl.value === this.name;
    };

    /**
     * Return value by spec
     */


    DisplayFlex.prototype.prefixed = function prefixed(prefix) {
        var spec = void 0,
            value = void 0;

        var _flexSpec = flexSpec(prefix);

        spec = _flexSpec[0];
        prefix = _flexSpec[1];


        if (spec === 2009) {
            if (this.name === 'flex') {
                value = 'box';
            } else {
                value = 'inline-box';
            }
        } else if (spec === 2012) {
            if (this.name === 'flex') {
                value = 'flexbox';
            } else {
                value = 'inline-flexbox';
            }
        } else if (spec === 'final') {
            value = this.name;
        }

        return prefix + value;
    };

    /**
     * Add prefix to value depend on flebox spec version
     */


    DisplayFlex.prototype.replace = function replace(string, prefix) {
        return this.prefixed(prefix);
    };

    /**
     * Change value for old specs
     */


    DisplayFlex.prototype.old = function old(prefix) {
        var prefixed = this.prefixed(prefix);
        if (!prefixed) return undefined;
        return new OldValue(this.name, prefixed);
    };

    return DisplayFlex;
}(Value);

Object.defineProperty(DisplayFlex, 'names', {
    enumerable: true,
    writable: true,
    value: ['display-flex', 'inline-flex']
});


module.exports = DisplayFlex;