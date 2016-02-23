/**
 * A link to a certain page, an anchor tag
 */

import React, { PropTypes } from 'react';

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

A.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  target: PropTypes.string
};

export default A;
