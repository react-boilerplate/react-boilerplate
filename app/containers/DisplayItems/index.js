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
import Heading from '../../components/UI/Heading';

class DisplayItems extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  renderItems(data, i) {
    return <Heading key={i}>{data.item}</Heading>;
  }

  render() {
    const { success, error, items } = this.props;
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
          {!success && <Heading background="#4caf50">Loading 📊...</Heading>}
          {error && (
            <Heading background="#ff0000">Error while loading items 📛</Heading>
          )}
          {success && items.map(this.renderItems)}
        </Wrapper>
      </Fragment>
    );
  }
}

DisplayItems.propTypes = {
  dispatch: PropTypes.func,
  success: PropTypes.bool,
  error: PropTypes.bool,
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
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
