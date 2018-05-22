import React, { Component, PropTypes } from 'react';
import { reduxForm, reducer } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import keys from 'lodash/keys';

import injectReducer from 'utils/injectReducer';
import { FieldContainer, Label, Field, FieldTextArea, ButtonContainer } from '../common';
import Button from '../common/Button';
import { selectSelectedArticle } from '../../containers/App/selectors';
import { getOneArticle, createOrUpdateArticle } from '../../containers/App/actions';

class ArticleForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dispatchFetchArticle: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    selectedArticle: PropTypes.object.isRequired,
    id: PropTypes.string,
  }

  componentDidMount() {
    this.firstLoad = true;
    if (this.props.id) this.props.dispatchFetchArticle(this.props.id);
  }

  componentWillReceiveProps({ selectedArticle, dispatch, change }) {
    if (this.firstLoad) {
      const selectedArticleProps = keys(selectedArticle);
      for (let i = 0; i < selectedArticleProps.length; i += 1) {
        dispatch(change(selectedArticleProps[i], selectedArticle[selectedArticleProps[i]]));
      }
      this.firstLoad = false;
    }
  }

  render() {
    const { submitting, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <FieldContainer>
          <Label htmlFor="title">Title</Label>
          <Field name="title" component="input" type="text" />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="publication">Publication</Label>
          <Field name="publication" component="input" type="text" />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="date">Date of Publish</Label>
          <Field name="date" component="input" type="text" />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="excerpt">Excerpt</Label>
          <FieldTextArea name="excerpt" component="textarea" type="text" />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="url">Article URL</Label>
          <Field name="url" component="input" type="text" />
        </FieldContainer>
        <ButtonContainer>
          <Button type="submit" disabled={submitting}>Submit</Button>
        </ButtonContainer>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedArticle: selectSelectedArticle(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchArticle: (articleId) => dispatch(getOneArticle(articleId)),
  onSubmit: (articleValues) => dispatch(createOrUpdateArticle(articleValues)),
});

const withReducer = injectReducer({ key: 'form', reducer });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withForm = reduxForm({ form: 'article' });

export default compose(withReducer, withConnect, withForm)(ArticleForm);
