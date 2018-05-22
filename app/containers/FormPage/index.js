import React, { PropTypes } from 'react';

import BookForm from '../../components/BookForm';
import ArticleForm from '../../components/ArticleForm';
import { FormWrapper } from './styled';

const FormPage = (props) => (
  <FormWrapper>
    {props.location.pathname.includes('books') ? <BookForm id={props.match.params.id} /> : <ArticleForm id={props.match.params.id} />}
  </FormWrapper>
);

FormPage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default FormPage;
