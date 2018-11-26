/**
 *
 * DisplayItems
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDisplayItems from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Wrapper from '../../components/UI/Wrapper';

function DisplayItems() {
  return (
    <Wrapper>
      <Helmet>
        <title>Display Items</title>
        <meta name="Items Display View" content="Items stored in the db" />
      </Helmet>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    </Wrapper>
  );
}

DisplayItems.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  displayItems: makeSelectDisplayItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'displayItems', reducer });
const withSaga = injectSaga({ key: 'displayItems', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DisplayItems);
