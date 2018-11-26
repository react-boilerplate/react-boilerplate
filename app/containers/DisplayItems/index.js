/**
 *
 * DisplayItems
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDisplayItems from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

function DisplayItems() {
  return (
    <div>
      <Helmet>
        <title>DisplayItems</title>
        <meta name="description" content="Description of DisplayItems" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
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
