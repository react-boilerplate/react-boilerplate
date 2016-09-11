/**
 * A link to a certain page, an anchor tag
 */

import React, { PropTypes } from 'react';

import styles from './styles.css';

function A({ ...props }) {
  const { className, children, href, target, ...rest } = props;
  return (
    <a
      href={href}
      target={target}
      className={className || styles.link}
      {...rest}
    >
      { children }
    </a>
  );
}

A.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  target: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default A;
