'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');
var utils = require('../utils');

var Appearance = function (_Declaration) {
    _inherits(Appearance, _Declaration);

    function Appearance(name, prefixes, all) {
        _classCallCheck(this, Appearance);

        var _this = _possibleConstructorReturn(this, _Declaration.call(this, name, prefixes, all));

        if (_this.prefixes) {
            _this.prefixes = utils.uniq(_this.prefixes.map(function (i) {
                if (i === '-ms-') {
                    return '-webkit-';
                } else {
                    return i;
                }
            }));
        }
        return _this;
    }

    return Appearance;
}(Declaration);

Object.defineProperty(Appearance, 'names', {
    enumerable: true,
    writable: true,
    value: ['appearance']
});


module.exports = Appearance;