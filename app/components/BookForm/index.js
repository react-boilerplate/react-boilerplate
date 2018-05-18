import React, { Component, PropTypes } from 'react';
import { reduxForm, reducer } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import keys from 'lodash/keys';

import injectReducer from 'utils/injectReducer';
import { FieldContainer, Label, Field, FieldTextArea, ButtonContainer } from './styled';
import Button from '../common/Button';
import { selectFormDataField } from '../../containers/FormPage/selectors';
import { selectSelectedBook } from '../../containers/App/selectors';
import { getOneBook } from '../../containers/App/actions';

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
    fetchBook: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    selectedBook: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.props.fetchBook(this.props.id);
  }

  componentWillReceiveProps({ selectedBook, dispatch, change }) {
    const selectedBookProps = keys(selectedBook);
    for (let i = 0; i < selectedBookProps.length; i += 1) {
      dispatch(change(selectedBookProps[i], selectedBook[selectedBookProps[i]]));
    }
    selectedBook.praise.forEach((singlePraise, index) => {
      dispatch(change(`quote${index}`, singlePraise.quote));
      dispatch(change(`quoteBy${index}`, singlePraise.quoteBy));
    });
  }

  addPraise = () => {

  }

  render() {
    const { handleSubmit, submitting, selectedBook } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <FieldContainer>
          <Label htmlFor="title">Title</Label>
          <Field name="title" component="input" type="text" value={selectedBook.title} />
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
        {!!selectedBook.praise.length && selectedBook.praise.map((singlePraise, index) => (
          <div key={singlePraise._id}>
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
  title: selectFormDataField('book', 'title'),
  subtitle: selectFormDataField('book', 'subtitle'),
  imgSrc: selectFormDataField('book', 'imgSrc'),
  description: selectFormDataField('book', 'description'),
  publisher: selectFormDataField('book', 'publisher'),
  url: selectFormDataField('book', 'url'),
  selectedBook: selectSelectedBook(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchBook: (bookId) => dispatch(getOneBook(bookId)),
});

const withReducer = injectReducer({ key: 'form', reducer });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withForm = reduxForm({ form: 'book' });

export default compose(withReducer, withConnect, withForm)(BookForm);
