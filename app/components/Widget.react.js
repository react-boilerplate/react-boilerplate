import React, { PropTypes, Component } from 'react';

const propTypes = {
  name: PropTypes.string.isRequired
};

class Widget extends Component {

  render() {
    return (
      <div>Widget</div>
    );
  }

}

Widget.propTypes = propTypes;

export default Widget;
