import React from 'react';

import Formsy from 'formsy-react';
	
import TextField from 'formsy-material-ui/lib/FormsyText';

var MyInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue: function (event) {
    console.log(this)
    this.setValue(event.currentTarget.value);
  },
  render: function () {
    return (
      <TextField name="asdf" 
      hintText="Your name here" 
      floatingLabelText="Floating Label Text"
      type="text" onChange={this.changeValue} value={this.getValue()}/>
    );
  }
});
 
export default MyInput;
