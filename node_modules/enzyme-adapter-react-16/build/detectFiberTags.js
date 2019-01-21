'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getFiber(element) {
  var container = global.document.createElement('div');
  var inst = null;

  var Tester = function (_React$Component) {
    _inherits(Tester, _React$Component);

    function Tester() {
      _classCallCheck(this, Tester);

      return _possibleConstructorReturn(this, (Tester.__proto__ || Object.getPrototypeOf(Tester)).apply(this, arguments));
    }

    _createClass(Tester, [{
      key: 'render',
      value: function () {
        function render() {
          inst = this;
          return element;
        }

        return render;
      }()
    }]);

    return Tester;
  }(_react2['default'].Component);

  _reactDom2['default'].render(_react2['default'].createElement(Tester), container);
  return inst._reactInternalFiber.child;
}

module.exports = function () {
  function detectFiberTags() {
    var supportsMode = typeof _react2['default'].StrictMode !== 'undefined';
    var supportsContext = typeof _react2['default'].createContext !== 'undefined';
    var supportsForwardRef = typeof _react2['default'].forwardRef !== 'undefined';

    function Fn() {
      return null;
    }
    // eslint-disable-next-line react/prefer-stateless-function

    var Cls = function (_React$Component2) {
      _inherits(Cls, _React$Component2);

      function Cls() {
        _classCallCheck(this, Cls);

        return _possibleConstructorReturn(this, (Cls.__proto__ || Object.getPrototypeOf(Cls)).apply(this, arguments));
      }

      _createClass(Cls, [{
        key: 'render',
        value: function () {
          function render() {
            return null;
          }

          return render;
        }()
      }]);

      return Cls;
    }(_react2['default'].Component);

    var Ctx = null;
    var FwdRef = null;
    if (supportsContext) {
      Ctx = _react2['default'].createContext();
    }
    if (supportsForwardRef) {
      // React will warn if we don't have both arguments.
      // eslint-disable-next-line no-unused-vars
      FwdRef = _react2['default'].forwardRef(function (props, ref) {
        return null;
      });
    }

    return {
      HostRoot: getFiber('test')['return']['return'].tag, // Go two levels above to find the root
      ClassComponent: getFiber(_react2['default'].createElement(Cls)).tag,
      Fragment: getFiber([['nested']]).tag,
      FunctionalComponent: getFiber(_react2['default'].createElement(Fn)).tag,
      HostPortal: getFiber(_reactDom2['default'].createPortal(null, global.document.createElement('div'))).tag,
      HostComponent: getFiber(_react2['default'].createElement('span')).tag,
      HostText: getFiber('text').tag,
      Mode: supportsMode ? getFiber(_react2['default'].createElement(_react2['default'].StrictMode)).tag : -1,
      ContextConsumer: supportsContext ? getFiber(_react2['default'].createElement(Ctx.Consumer, null, function () {
        return null;
      })).tag : -1,
      ContextProvider: supportsContext ? getFiber(_react2['default'].createElement(Ctx.Provider, { value: null })).tag : -1,
      ForwardRef: supportsForwardRef ? getFiber(_react2['default'].createElement(FwdRef)).tag : -1
    };
  }

  return detectFiberTags;
}();