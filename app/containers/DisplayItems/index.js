import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { itemsSelector, successSelector, errorSelector } from './selectors';
import { getItems } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Wrapper from '../../components/UI/Wrapper';

class DisplayItems extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  renderItems(data) {
    return <p>{data.item}</p>;
  }

  render() {
    return (
      <Fragment>
        <Wrapper>
          <Helmet>
            <title>Display Items</title>
            <meta name="Items Display View" content="Items stored in the db" />
          </Helmet>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
        </Wrapper>
        <Wrapper flexDirection="column">
          {!this.props.success && <h1>Loading 📊...</h1>}
          {this.props.success && this.props.items.map(this.renderItems)}
          {this.props.error && <h1>Error while loading items 📛</h1>}
        </Wrapper>
      </Fragment>
    );
  }
}

DisplayItems.propTypes = {
  dispatch: PropTypes.func,
  items: PropTypes.array,
  success: PropTypes.bool,
  error: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  items: itemsSelector(),
  success: successSelector(),
  error: errorSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getItems: () => dispatch(getItems()),
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
