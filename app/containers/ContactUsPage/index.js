/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';


import H1 from 'components/H1';
import messages from './messages'; 
import Form from './form'
import Input from './input'
export default class ContactUsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet
          title="Feature Page"
          meta={[
            { name: 'description', content: 'Feature page of React.js Boilerplate application' },
          ]}
        /> 
        <H1>
          <FormattedMessage {...messages.header} /> 
        </H1>
        <Form onSubmit={(data) => { console.log('fff:ff:',data) }}>
            <Input
                name="firstname"
                label="What is your first name?"
            />
        </Form>
      </div>
    );
  }
}
