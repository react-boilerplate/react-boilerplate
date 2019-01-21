'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Value = require('../value');
var list = require('postcss').list;

var CrossFade = function (_Value) {
    _inherits(CrossFade, _Value);

    function CrossFade() {
        _classCallCheck(this, CrossFade);

        return _possibleConstructorReturn(this, _Value.apply(this, arguments));
    }

    CrossFade.prototype.replace = function replace(string, prefix) {
        var _this2 = this;

        return list.space(string).map(function (value) {
            if (value.slice(0, +_this2.name.length + 1) !== _this2.name + '(') {
                return value;
            }

            var close = value.lastIndexOf(')');
            var after = value.slice(close + 1);
            var args = value.slice(_this2.name.length + 1, close);

            if (prefix === '-webkit-') {
                var match = args.match(/\d*.?\d+%?/);
                if (match) {
                    args = args.slice(match[0].length).trim();
                    args += ', ' + match[0];
                } else {
                    args += ', 0.5';
                }
            }
            return prefix + _this2.name + '(' + args + ')' + after;
        }).join(' ');
    };

    return CrossFade;
}(Value);

Object.defineProperty(CrossFade, 'names', {
    enumerable: true,
    writable: true,
    value: ['cross-fade']
});


module.exports = CrossFade;