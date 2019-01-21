'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _rule = require('postcss/lib/rule');

var _rule2 = _interopRequireDefault(_rule);

var _lessStringify = require('./less-stringify');

var _lessStringify2 = _interopRequireDefault(_lessStringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rule = function (_PostCssRule) {
  _inherits(Rule, _PostCssRule);

  function Rule() {
    _classCallCheck(this, Rule);

    return _possibleConstructorReturn(this, (Rule.__proto__ || Object.getPrototypeOf(Rule)).apply(this, arguments));
  }

  _createClass(Rule, [{
    key: 'toString',
    value: function toString(stringifier) {
      if (!stringifier) {
        stringifier = {
          stringify: _lessStringify2.default
        };
      }

      return _get(Rule.prototype.__proto__ || Object.getPrototypeOf(Rule.prototype), 'toString', this).call(this, stringifier);
    }
  }]);

  return Rule;
}(_rule2.default);

exports.default = Rule;
module.exports = exports['default'];