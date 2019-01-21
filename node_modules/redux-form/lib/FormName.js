'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var FormName = function FormName(_ref, _ref2) {
  var children = _ref.children;
  var _reduxForm = _ref2._reduxForm;
  return children({ form: _reduxForm && _reduxForm.form });
};
FormName.contextTypes = {
  _reduxForm: _propTypes2.default.shape({
    form: _propTypes2.default.string.isRequired
  }).isRequired
};

exports.default = FormName;