import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// required components
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Form from '../../components/Form';
import Wrapper from '../../components/UI/Wrapper';
import Input from '../../components/Input';
import Button from '../../components/UI/Button';
import Heading from '../../components/UI/Heading';

import { itemSelector, successSelector, errorSelector } from './selectors';
import { addItem } from './actions';
import reducer from './reducer';
import saga from './saga';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const item = this.state.input;
    if (item) {
      this.props.addItem(item);
      this.setState({ input: '' });
    }
  }

  onChange(e) {
    const input = e.target.value;
    this.setState({ input });
  }

  render() {
    return (
      <Fragment>
        <Wrapper>
          <Form onSubmit={e => this.onSubmit(e)}>
            <Input
              inputType="text"
              label="Add item"
              labelColor="grey"
              onChange={this.onChange}
              value={this.state.input}
            />
            <Button type="submit" onClick={this.onSubmit}>
              Submit
            </Button>
          </Form>
        </Wrapper>
        <Wrapper>
          {this.props.success && <Heading>Post successful ✅!</Heading>}
          {this.props.error && (
            <Heading background="#ff0000">Error when posting 📛</Heading>
          )}
        </Wrapper>
      </Fragment>
    );
  }
}

AddItem.propTypes = {
  addItem: PropTypes.func,
  success: PropTypes.bool,
  error: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  item: itemSelector(),
  success: successSelector(),
  error: errorSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    addItem: item => dispatch(addItem(item)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addItem', reducer });
const withSaga = injectSaga({ key: 'addItem', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddItem);
