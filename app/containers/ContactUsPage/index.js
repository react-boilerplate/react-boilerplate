/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';


import injectTapEventPlugin from 'react-tap-event-plugin';

import H1 from 'components/H1';
import messages from './messages'; 
import Form from './form'
import Input from './input'

import Formsy from 'formsy-react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';


 

export default class ContactUsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  
    mixins: [Formsy.Mixin]

  constructor(props) {
    super(props);
  injectTapEventPlugin();
    this.state = {
      user: {name:''},
    };
  }
  submit = () => {
    console.log('i am inside submit')
    console.log(this.state)
   
  };

  changeValue(event) {
    console.log(this)
    this.setValue(event.target.value);
  }

  getValue() {
    return 'hi value'
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

  <MuiThemeProvider>
    <div>
       <Formsy.Form >
          
      <Form name="testform"
      /> 
        </Formsy.Form>

    <RaisedButton label="Submit" secondary={true} onTouchTap={this.submit} />
    </div>
  </MuiThemeProvider>
 
      </div>
    );
  }
}
