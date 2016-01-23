import React from 'react';

import styles from './styles.css';

class Anchor extends React.Component {
  render() {
    return (
      <a
        className={
          this.props.className || styles.link
        }
        href={ this.props.href }
      >
        { this.props.children }
      </a>
    );
  }
}

export default Anchor;
