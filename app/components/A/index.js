import React from 'react';

import styles from './styles.css';

class A extends React.Component {
  render() {
    return (
      <a
        className={
          this.props.className || styles.link
        }
        href={ this.props.href }
        target={ this.props.target }
      >
        { this.props.children }
      </a>
    );
  }
}

export default A;
