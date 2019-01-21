import _mapValues from 'lodash-es/mapValues';
import _isEqual from 'lodash-es/isEqual';
import _isEmpty from 'lodash-es/isEmpty';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import prefixName from './util/prefixName';


var createValues = function createValues(_ref) {
  var getIn = _ref.getIn;
  return function (firstArg) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    // create a class that reads current form name and creates a selector
    // return
    return function (Component) {
      var FormValues = function (_React$Component) {
        _inherits(FormValues, _React$Component);

        function FormValues(props, context) {
          _classCallCheck(this, FormValues);

          var _this = _possibleConstructorReturn(this, (FormValues.__proto__ || Object.getPrototypeOf(FormValues)).call(this, props, context));

          if (!context._reduxForm) {
            throw new Error('formValues() must be used inside a React tree decorated with reduxForm()');
          }
          _this.updateComponent(props);
          return _this;
        }

        _createClass(FormValues, [{
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(props) {
            if (typeof firstArg === 'function') {
              this.updateComponent(props);
            }
          }
        }, {
          key: 'render',
          value: function render() {
            var Component = this.Component;

            return React.createElement(Component
            // so that the connected component updates props when sectionPrefix has changed
            , _extends({ sectionPrefix: this.context._reduxForm.sectionPrefix
            }, this.props));
          }
        }, {
          key: 'updateComponent',
          value: function updateComponent(props) {
            var valuesMap = void 0;
            var resolvedFirstArg = typeof firstArg === 'function' ? firstArg(props) : firstArg;
            if (typeof resolvedFirstArg === 'string') {
              valuesMap = rest.reduce(function (result, k) {
                result[k] = k;
                return result;
              }, _defineProperty({}, resolvedFirstArg, resolvedFirstArg));
            } else {
              valuesMap = resolvedFirstArg;
            }
            if (_isEmpty(valuesMap)) {
              // maybe that empty valuesMap is ok if firstArg is a function?
              // if this is the case, we probably should set this.Component = Component
              throw new Error('formValues(): You must specify values to get as formValues(name1, name2, ...) or formValues({propName1: propPath1, ...}) or formValues((props) => name) or formValues((props) => ({propName1: propPath1, ...}))');
            }
            if (_isEqual(valuesMap, this._valuesMap)) {
              // no change in valuesMap
              return;
            }
            this._valuesMap = valuesMap;
            this.setComponent();
          }
        }, {
          key: 'setComponent',
          value: function setComponent() {
            var _this2 = this;

            var formValuesSelector = function formValuesSelector(_, _ref2) {
              var sectionPrefix = _ref2.sectionPrefix;

              // Yes, we're only using connect() for listening to updates.
              // The second argument needs to be there so that connect calls
              // the selector when props change
              var getValues = _this2.context._reduxForm.getValues;

              var values = getValues();
              return _mapValues(_this2._valuesMap, function (path) {
                return getIn(values, prefixName(_this2.context, path));
              });
            };
            this.Component = connect(formValuesSelector, function () {
              return {};
            } // ignore dispatch
            )(function (_ref3) {
              var sectionPrefix = _ref3.sectionPrefix,
                  otherProps = _objectWithoutProperties(_ref3, ['sectionPrefix']);

              return React.createElement(Component, otherProps);
            });
          }
        }]);

        return FormValues;
      }(React.Component);

      FormValues.contextTypes = {
        _reduxForm: PropTypes.object
      };
      return FormValues;
    };
  };
};

export default createValues;