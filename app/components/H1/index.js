import React from 'react';

import styles from './styles.css';

class H1 extends React.Component {
  render() {
    return (
      <h1 className={ styles.heading1 }>{ this.props.children }</h1>
    );
  }
}

export default H1;
