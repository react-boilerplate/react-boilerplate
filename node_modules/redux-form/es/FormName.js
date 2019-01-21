import * as React from 'react';
import PropTypes from 'prop-types';


var FormName = function FormName(_ref, _ref2) {
  var children = _ref.children;
  var _reduxForm = _ref2._reduxForm;
  return children({ form: _reduxForm && _reduxForm.form });
};
FormName.contextTypes = {
  _reduxForm: PropTypes.shape({
    form: PropTypes.string.isRequired
  }).isRequired
};

export default FormName;