import React, { Component, PropTypes } from 'react';
import { reduxForm, reducer } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import { FieldContainer, Label, Field, FieldTextArea, ButtonContainer } from './styled';
import Button from '../common/Button';
import { selectFormDataField } from '../../containers/FormPage/selectors';

/*
  title: { type: String, required: true },
  subtitle: String,
  imgSrc: { type: String, required: true },
  isbn: Number,
  description: String,
  publisher: String,
  url: String,
  praise: [
    { quote: String, quoteBy: String },
  ],
*/

class BookForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    book: PropTypes.object.isRequired,
  }

  componentDidMount() {
    // fetch book
  }

  addPraise = () => {

  }

  render() {
    const { handleSubmit, submitting, book } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <FieldContainer>
          <Label htmlFor="title">Title</Label>
          <Field name="title" component="input" type="text" />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Field name="subtitle" component="input" type="text" />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="imgSrc">Image URL</Label>
          <Field name="imgSrc" component="input" type="text" />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="description">Description</Label>
          <FieldTextArea name="description" component="textarea" type="text" />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="publisher">Publisher</Label>
          <Field name="publisher" component="input" type="text" />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="url">Publisher URL</Label>
          <Field name="url" component="input" type="text" />
        </FieldContainer>
        {book.praise.map((singlePraise, index) => (
          <div>
            <FieldContainer>
              <Label htmlFor={`quote${index}`}>{`Quote ${index + 1}`}</Label>
              <FieldTextArea name={`quote${index}`} component="textarea" type="text" />
            </FieldContainer>
            <FieldContainer>
              <Label htmlFor={`quoteBy${index}`}>{`Quote ${index + 1} By`}</Label>
              <Field name={`quoteBy${index}`} component="input" type="text" />
            </FieldContainer>
          </div>
        ))}
        <ButtonContainer>
          <Button type="submit" disabled={submitting}>Submit</Button>
        </ButtonContainer>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  title: selectFormDataField('books', 'title'),
  subtitle: selectFormDataField('books', 'subtitle'),
  imgSrc: selectFormDataField('books', 'imgSrc'),
  description: selectFormDataField('books', 'description'),
  publisher: selectFormDataField('books', 'publisher'),
  url: selectFormDataField('books', 'url'),
});

const withReducer = injectReducer({ key: 'form', reducer });

const withConnect = connect(mapStateToProps);

const withForm = reduxForm({ form: 'book' });

export default compose(withReducer, withConnect, withForm)(BookForm);
