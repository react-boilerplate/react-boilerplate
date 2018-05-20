import React, { PropTypes } from 'react';

import BookForm from '../../components/BookForm';
import { FormWrapper } from './styled';

const FormPage = (props) => (
  <FormWrapper>
    <BookForm id={props.match.params.id} />
  </FormWrapper>
);

FormPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default FormPage;
