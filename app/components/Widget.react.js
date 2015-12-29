import React, { PropTypes, Component } from 'react';

const propTypes = {
  name: PropTypes.string.isRequired
};

class Widget extends Component {
  render() {
    return (
      <div>widget is named {this.props.name}</div>
    );
  }
}

Widget.propTypes = propTypes;

export default Widget;
