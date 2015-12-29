import React, { PropTypes, Component } from 'react';

const propTypes = {
  name: PropTypes.string.isRequired
};

// Normally you would use a function, as this is a stateless functional
// component, however for the purposes of demonstrating a proper Enzyme test, we
// make this a proper component.
class Widget extends Component {
  render() {
    return (
      <div>widget is named {this.props.name}</div>
    );
  }
}

Widget.propTypes = propTypes;

export default Widget;
