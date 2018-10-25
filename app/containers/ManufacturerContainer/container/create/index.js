/*
 * Create Manufacturer Page
 *
 */

import React from 'react';
import styled from 'styled-components';
import { reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import BankAccountFormData from './BankAccountFormData';

const FormWrapper = styled.div`
  margin-left: 5em;
  margin-right: 5em;
`;

const CreateManufacturerFormData = props => {
  const { handleSubmit } = props;

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <BankAccountFormData />
      </Form>
    </FormWrapper>
  );
};

CreateManufacturerFormData.propTypes = {
  handleSubmit: PropTypes.func,
};

const CreateManufacturerForm = reduxForm({
  form: 'createManufacturerForm',
  enableReinitialize: true,
})(CreateManufacturerFormData);

export default CreateManufacturerForm;
