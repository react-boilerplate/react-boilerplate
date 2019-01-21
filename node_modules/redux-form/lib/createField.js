'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ConnectedField = require('./ConnectedField');

var _ConnectedField2 = _interopRequireDefault(_ConnectedField);

var _shallowCompare = require('./util/shallowCompare');

var _shallowCompare2 = _interopRequireDefault(_shallowCompare);

var _prefixName = require('./util/prefixName');

var _prefixName2 = _interopRequireDefault(_prefixName);

var _plain = require('./structure/plain');

var _plain2 = _interopRequireDefault(_plain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createField = function createField(structure) {
  var ConnectedField = (0, _ConnectedField2.default)(structure);

  var setIn = structure.setIn;

  var Field = function (_Component) {
    _inherits(Field, _Component);

    function Field(props, context) {
      _classCallCheck(this, Field);

      var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props, context));

      _this.saveRef = function (ref) {
        return _this.ref = ref;
      };

      _this.normalize = function (name, value) {
        var normalize = _this.props.normalize;

        if (!normalize) {
          return value;
        }
        var previousValues = _this.context._reduxForm.getValues();
        var previousValue = _this.value;
        var nextValues = setIn(previousValues, name, value);
        return normalize(value, previousValue, nextValues, previousValues);
      };

      if (!context._reduxForm) {
        throw new Error('Field must be inside a component decorated with reduxForm()');
      }
      return _this;
    }

    _createClass(Field, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        this.context._reduxForm.register(this.name, 'Field', function () {
          return _this2.props.validate;
        }, function () {
          return _this2.props.warn;
        });
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        return (0, _shallowCompare2.default)(this, nextProps, nextState);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps, nextContext) {
        var oldName = (0, _prefixName2.default)(this.context, this.props.name);
        var newName = (0, _prefixName2.default)(nextContext, nextProps.name);

        if (oldName !== newName ||
        // use deepEqual here because they could be a function or an array of functions
        !_plain2.default.deepEqual(this.props.validate, nextProps.validate) || !_plain2.default.deepEqual(this.props.warn, nextProps.warn)) {
          // unregister old name
          this.context._reduxForm.unregister(oldName);
          // register new name
          this.context._reduxForm.register(newName, 'Field', function () {
            return nextProps.validate;
          }, function () {
            return nextProps.warn;
          });
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.context._reduxForm.unregister(this.name);
      }
    }, {
      key: 'getRenderedComponent',
      value: function getRenderedComponent() {
        (0, _invariant2.default)(this.props.withRef, 'If you want to access getRenderedComponent(), ' + 'you must specify a withRef prop to Field');
        return this.ref ? this.ref.getWrappedInstance().getRenderedComponent() : undefined;
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _react.createElement)(ConnectedField, _extends({}, this.props, {
          name: this.name,
          normalize: this.normalize,
          _reduxForm: this.context._reduxForm,
          ref: this.saveRef
        }));
      }
    }, {
      key: 'name',
      get: function get() {
        return (0, _prefixName2.default)(this.context, this.props.name);
      }
    }, {
      key: 'dirty',
      get: function get() {
        return !this.pristine;
      }
    }, {
      key: 'pristine',
      get: function get() {
        return !!(this.ref && this.ref.getWrappedInstance().isPristine());
      }
    }, {
      key: 'value',
      get: function get() {
        return this.ref && this.ref.getWrappedInstance().getValue();
      }
    }]);

    return Field;
  }(_react.Component);

  Field.propTypes = {
    name: _propTypes2.default.string.isRequired,
    component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string, _propTypes2.default.node]).isRequired,
    format: _propTypes2.default.func,
    normalize: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    onDragStart: _propTypes2.default.func,
    onDrop: _propTypes2.default.func,
    parse: _propTypes2.default.func,
    props: _propTypes2.default.object,
    validate: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.arrayOf(_propTypes2.default.func)]),
    warn: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.arrayOf(_propTypes2.default.func)]),
    withRef: _propTypes2.default.bool,
    immutableProps: _propTypes2.default.arrayOf(_propTypes2.default.string)
  };
  Field.contextTypes = {
    _reduxForm: _propTypes2.default.object
  };

  (0, _reactLifecyclesCompat.polyfill)(Field);
  return Field;
};

exports.default = createField;