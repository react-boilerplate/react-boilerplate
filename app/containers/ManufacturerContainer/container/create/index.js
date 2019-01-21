/*
 * Create Manufacturer Page
 *
 */

import React from 'react';
import styled from 'styled-components';
import {reduxForm, initialize, FormSection} from 'redux-form';
import {Checkbox, Divider, Form} from 'semantic-ui-react';
import connect from 'react-redux/es/connect/connect';
import {compose} from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import PropTypes from 'prop-types';
import BankAccountFormData from './BankAccountFormData';
import AddressDetails from './AddressDetails';
import CoreDetails from './CoreDetails';
import {createManufacturer} from '../../actions';
import reducer from '../../reducer';
import saga from '../../saga';

const FormWrapper = styled.div`
  margin-left: 30em;
  margin-right: 30em;
`;

const FormDataWrapper = styled.div`
  margin-top: 3em;
  margin-bottom: 3em;
`;

/* eslint-disable react/prefer-stateless-function */
export class CreateManufacturerForm extends React.Component {
  state = { shippingSameAsBilling: false };

  toggleShippingAddress = () =>
    this.setState({ shippingSameAsBilling: !this.state.shippingSameAsBilling });

  handleSubmit = () => this.props.onSubmitForm();

  render() {
    return (
      <FormWrapper>
        <Form onSubmit={this.handleSubmit}>
          <FormDataWrapper>
            <Divider horizontal>
              <h3> Core Details </h3>
            </Divider>
            <CoreDetails />
          </FormDataWrapper>

          <FormDataWrapper>
            <Divider horizontal>
              <h3> Bank Account Details </h3>
            </Divider>
            <FormSection name="bankAccount">
              <BankAccountFormData />
            </FormSection>
          </FormDataWrapper>

          <FormDataWrapper>
            <Divider horizontal>
              <h3> Billing Address Details </h3>
            </Divider>
            <FormSection name="billingAddress">
              <AddressDetails />
            </FormSection>
          </FormDataWrapper>

          <FormDataWrapper>
            <Divider horizontal>
              <h3> Shipping Address Details </h3>
            </Divider>
            <Checkbox
              name="shippingSameAsBilling"
              label="Same as Billing Address"
              onChange={this.toggleShippingAddress}
              checked={this.state.shippingSameAsBilling}
            />
          </FormDataWrapper>

          {!this.state.shippingSameAsBilling && (
            <FormDataWrapper>
              <FormSection name="shippingAddress">
                <AddressDetails />
              </FormSection>
            </FormDataWrapper>
          )}

          <Form.Button content="Create Manufacturer" />
        </Form>
      </FormWrapper>
    );
  }
}

CreateManufacturerForm.propTypes = {
  onSubmitForm: PropTypes.func,
  isEditMode: PropTypes.bool
};


const mapStateToProps = (state, props) => {
  let id = props.match && props.match.params;
  console.log('value is', id, props)
  let list = state.get('manufacturer').get('manufacturersList', []);
  let initialValues = list.filter( m => m.id === props.id).reduce((a,i) => i, undefined)

  return {
    initialValues: props.isEditMode? initialValues : undefined
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: () => dispatch(createManufacturer())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'manufacturer', reducer });
const withSaga = injectSaga({ key: 'manufacturer', saga });

const withReduxForm = reduxForm({
  form:'createManufacturerForm',
  enableReinitialize: true,
  updateUnregisteredFields:true
}, mapStateToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withReduxForm,
)(CreateManufacturerForm);
