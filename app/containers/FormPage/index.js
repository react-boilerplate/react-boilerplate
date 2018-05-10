import React, { Component } from 'react';

import BookForm from '../../components/BookForm';
import { FormWrapper } from './styled';

class FormPage extends Component {
  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(evt.target.title.value);
  }

  render() {
    return (
      <FormWrapper>
        <BookForm handleSubmit={this.handleSubmit} />
      </FormWrapper>
    );
  }
}

export default FormPage;
