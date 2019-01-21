import PropTypes from 'prop-types';

var any = PropTypes.any,
    bool = PropTypes.bool,
    func = PropTypes.func,
    shape = PropTypes.shape,
    string = PropTypes.string,
    oneOfType = PropTypes.oneOfType,
    object = PropTypes.object,
    number = PropTypes.number;


export var formPropTypes = {
  // State:
  anyTouched: bool.isRequired, // true if any of the fields have been marked as touched
  asyncValidating: oneOfType([bool, string]).isRequired, // true if async validation is running, a string if a field triggered async validation
  dirty: bool.isRequired, // true if any values are different from initialValues
  error: any, // form-wide error from '_error' key in validation result
  form: string.isRequired, // the name of the form
  invalid: bool.isRequired, // true if there are any validation errors
  initialized: bool.isRequired, // true if the form has been initialized
  initialValues: object, // the initialValues object passed to reduxForm
  pristine: bool.isRequired, // true if the values are the same as initialValues
  pure: bool.isRequired, // if true, implements shouldComponentUpdate
  submitting: bool.isRequired, // true if the form is in the process of being submitted
  submitFailed: bool.isRequired, // true if the form was submitted and failed for any reason
  submitSucceeded: bool.isRequired, // true if the form was successfully submitted
  valid: bool.isRequired, // true if there are no validation errors
  warning: any, // form-wide warning from '_warning' key in validation result
  // Actions:
  array: shape({
    insert: func.isRequired, // function to insert a value into an array field
    move: func.isRequired, // function to move a value within an array field
    pop: func.isRequired, // function to pop a value off of an array field
    push: func.isRequired, // function to push a value onto an array field
    remove: func.isRequired, // function to remove a value from an array field
    removeAll: func.isRequired, // function to remove all the values from an array field
    shift: func.isRequired, // function to shift a value out of an array field
    splice: func.isRequired, // function to splice a value into an array field
    swap: func.isRequired, // function to swap values in an array field
    unshift: func.isRequired // function to unshift a value into an array field
  }),
  asyncValidate: func.isRequired, // function to trigger async validation
  autofill: func.isRequired, // action to set a value of a field and mark it as autofilled
  blur: func.isRequired, // action to mark a field as blurred
  change: func.isRequired, // action to change the value of a field
  clearAsyncError: func.isRequired, // action to clear the async error of a field
  clearFields: func.isRequired, // action to clean fields values for all fields
  clearSubmitErrors: func.isRequired, // action to remove submitErrors and error
  destroy: func.isRequired, // action to destroy the form's data in Redux
  dispatch: func.isRequired, // the Redux dispatch action
  handleSubmit: func.isRequired, // function to submit the form
  initialize: func.isRequired, // action to initialize form data
  reset: func.isRequired, // action to reset the form data to previously initialized values
  resetSection: func.isRequired, // action to reset the form sections data to previously initialized values
  touch: func.isRequired, // action to mark fields as touched
  submit: func.isRequired, // action to trigger a submission of the specified form
  untouch: func.isRequired, // action to mark fields as untouched

  // triggerSubmit
  triggerSubmit: bool, // if true, submits the form on componentWillReceiveProps
  clearSubmit: func.isRequired // called before a triggered submit, by default clears triggerSubmit
};

export var fieldInputPropTypes = {
  checked: bool,
  name: string.isRequired,
  onBlur: func.isRequired,
  onChange: func.isRequired,
  onDragStart: func.isRequired,
  onDrop: func.isRequired,
  onFocus: func.isRequired,
  value: any
};

export var fieldMetaPropTypes = {
  active: bool.isRequired,
  asyncValidating: bool.isRequired,
  autofilled: bool.isRequired,
  dirty: bool.isRequired,
  dispatch: func.isRequired,
  error: any,
  form: string.isRequired,
  invalid: bool.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  submitFailed: bool.isRequired,
  touched: bool.isRequired,
  valid: bool.isRequired,
  visited: bool.isRequired,
  warning: string
};

export var fieldArrayMetaPropTypes = {
  dirty: bool.isRequired,
  error: any,
  form: string.isRequired,
  invalid: bool.isRequired,
  pristine: bool.isRequired,
  submitFailed: bool,
  submitting: bool,
  valid: bool.isRequired,
  warning: string
};

export var fieldArrayFieldsPropTypes = {
  name: string.isRequired,
  forEach: func.isRequired,
  get: func.isRequired,
  getAll: func.isRequired,
  insert: func.isRequired,
  length: number.isRequired,
  map: func.isRequired,
  move: func.isRequired,
  pop: func.isRequired,
  push: func.isRequired,
  reduce: func.isRequired,
  remove: func.isRequired,
  removeAll: func.isRequired,
  shift: func.isRequired,
  swap: func.isRequired,
  unshift: func.isRequired
};

export var fieldPropTypes = {
  input: shape(fieldInputPropTypes).isRequired,
  meta: shape(fieldMetaPropTypes).isRequired
};

export var fieldArrayPropTypes = {
  fields: shape(fieldArrayFieldsPropTypes).isRequired,
  meta: shape(fieldArrayMetaPropTypes).isRequired
};

export default formPropTypes;