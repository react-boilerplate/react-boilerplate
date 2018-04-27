import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectArticles } from '../App/selectors';
import Articles from '../../components/List';

const ArticlesPage = ({ articles }) => (
  <div>
    <Articles listArr={articles} />
  </div>
);

ArticlesPage.propTypes = {
  articles: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  articles: selectArticles(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(ArticlesPage);
