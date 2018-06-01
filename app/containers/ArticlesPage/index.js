import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectArticles } from '../App/selectors';
import Articles from '../../components/List';
import { deleteArticle } from '../App/actions';

const ArticlesPage = ({ articles, handleDeleteClick }) => (
  <div>
    <Articles listArr={articles} handleDelete={handleDeleteClick} />
  </div>
);

ArticlesPage.propTypes = {
  articles: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  articles: selectArticles(),
});

const mapDispatchToProps = (dispatch) => ({
  handleDeleteClick: (id) => dispatch(deleteArticle(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(ArticlesPage);
