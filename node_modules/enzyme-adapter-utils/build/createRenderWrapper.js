'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports['default'] = createRenderWrapper;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createRenderWrapper(node, context, childContextTypes) {
  var ContextWrapper = function (_React$Component) {
    _inherits(ContextWrapper, _React$Component);

    function ContextWrapper() {
      _classCallCheck(this, ContextWrapper);

      return _possibleConstructorReturn(this, (ContextWrapper.__proto__ || Object.getPrototypeOf(ContextWrapper)).apply(this, arguments));
    }

    _createClass(ContextWrapper, [{
      key: 'getChildContext',
      value: function () {
        function getChildContext() {
          return context;
        }

        return getChildContext;
      }()
    }, {
      key: 'render',
      value: function () {
        function render() {
          return node;
        }

        return render;
      }()
    }]);

    return ContextWrapper;
  }(_react2['default'].Component);

  ContextWrapper.childContextTypes = childContextTypes;
  return ContextWrapper;
}