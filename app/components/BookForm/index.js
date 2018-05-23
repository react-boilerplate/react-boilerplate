import React, { Component, PropTypes } from 'react';
import { reduxForm, reducer } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import keys from 'lodash/keys';

import injectReducer from 'utils/injectReducer';
import { FieldContainer, Label, Field, FieldTextArea, ButtonContainer } from '../common';
import Button from '../common/Button';
import { selectSelectedBook } from '../../containers/App/selectors';
import { getOneBook, createOrUpdateBook, addPraise, clearOneBook } from '../../containers/App/actions';

class BookForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dispatchFetchBook: PropTypes.func.isRequired,
    dispatchAddPraise: PropTypes.func.isRequired,
    dispatchClearBook: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    selectedBook: PropTypes.object.isRequired,
    id: PropTypes.string,
  }

  componentDidMount() {
    this.firstLoad = true;
    if (this.props.id) this.props.dispatchFetchBook(this.props.id);
  }

  componentWillReceiveProps({ selectedBook, dispatch, change }) {
    if (this.firstLoad) {
      const selectedBookProps = keys(selectedBook);
      for (let i = 0; i < selectedBookProps.length; i += 1) {
        dispatch(change(selectedBookProps[i], selectedBook[selectedBookProps[i]]));
      }
      selectedBook.praise.forEach((singlePraise, index) => {
        dispatch(change(`quote${index}`, singlePraise.quote));
        dispatch(change(`quoteBy${index}`, singlePraise.quoteBy));
      });
      this.firstLoad = false;
    }
  }

  componentWillUnmount() {
    this.props.dispatchClearBook();
  }

  addPraise = () => {
    this.props.dispatchAddPraise();
  }

  render() {
    const { submitting, selectedBook, handleSubmit } = this.props;
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
          <Button type="button" onClick={this.addPraise}>Add Praise</Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button type="submit" disabled={submitting}>Submit</Button>
        </ButtonContainer>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedBook: selectSelectedBook(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchBook: (bookId) => dispatch(getOneBook(bookId)),
  onSubmit: (bookValues) => dispatch(createOrUpdateBook(bookValues)),
  dispatchAddPraise: () => dispatch(addPraise()),
  dispatchClearBook: () => dispatch(clearOneBook()),
});

const withReducer = injectReducer({ key: 'form', reducer });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withForm = reduxForm({ form: 'book' });

export default compose(withReducer, withConnect, withForm)(BookForm);
