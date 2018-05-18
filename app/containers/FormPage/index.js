import React, { Component, PropTypes } from 'react';

import BookForm from '../../components/BookForm';
import { FormWrapper } from './styled';

class FormPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(evt.target.title.value);
  }

  render() {
    return (
      <FormWrapper>
        <BookForm handleSubmit={this.handleSubmit} id={this.props.match.params.id} />
      </FormWrapper>
    );
  }
}

export default FormPage;
