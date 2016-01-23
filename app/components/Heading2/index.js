import React from 'react';

import styles from './styles.css';

class Heading2 extends React.Component {
  render() {
    return (
      <h2 className={ styles.heading2 }>{ this.props.children }</h2>
    );
  }
}

export default Heading2;
