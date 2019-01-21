'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var Declaration = require('../declaration');

var FlexWrap = function (_Declaration) {
    _inherits(FlexWrap, _Declaration);

    function FlexWrap() {
        _classCallCheck(this, FlexWrap);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Don't add prefix for 2009 spec
     */
    FlexWrap.prototype.set = function set(decl, prefix) {
        var spec = flexSpec(prefix)[0];
        if (spec !== 2009) {
            return _Declaration.prototype.set.call(this, decl, prefix);
        }
        return undefined;
    };

    return FlexWrap;
}(Declaration);

Object.defineProperty(FlexWrap, 'names', {
    enumerable: true,
    writable: true,
    value: ['flex-wrap']
});


module.exports = FlexWrap;