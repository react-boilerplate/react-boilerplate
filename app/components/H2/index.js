import React from 'react';

import styles from './styles.css';

class H2 extends React.Component {
  render() {
    return (
      <h2 className={ styles.heading2 }>{ this.props.children }</h2>
    );
  }
}

export default H2;
