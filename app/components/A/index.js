/**
 * A link to a certain page, an anchor tag
 */

import React, { PropTypes } from 'react';

import styles from './styles.css';

function A(props) {
  return (
    <a
      className={
        props.className || styles.link
      }
      { ...props }
    >
      {props.children}
    </a>
  );
}

A.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  target: PropTypes.string,
};

export default A;
