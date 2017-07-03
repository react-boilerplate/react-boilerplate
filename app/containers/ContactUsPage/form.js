import React from 'react';
 
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Input from './input';

var MyInput = React.createClass({
  	mixins: [Formsy.Mixin],

	getInitialState() {
	    return {
	      canSubmit: false,
	    };
	},

  	changeValue: function (event) {
    	console.log(this)
    	this.setValue(event.currentTarget.value);
  	},
  	render: function () {
    	return (
 
	      <Input
	      name="asdf"
	        hintText="Hint Text"
	                onChange={this.changeValue} 
	                value={this.getValue()}
	      />  
    );
  }
});
 
export default MyInput;
