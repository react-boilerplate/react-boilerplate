const validate = (values) => {
  const error = {};

  if (!values.displayName) {
    error.displayName = 'Cannot be null';
  }

  if (!values.legalName) {
    error.legalName = 'Please enter a valid Name';
  }

  return error;
};

export default validate;
