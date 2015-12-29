/**
 *
 * Button.react.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React from 'react';
import { Link } from 'react-router';

import styles from './Button.css';

function Button(props) {
  const className = props.className ? props.className : styles.button;

  if (props.route) {
    return (
      <Link className={className} to={props.route}>{props.children}</Link>
    );
  }

  return (
    <a className={className} href={props.href} onClick={props.onClick}>{props.children}</a>
  );
}

Button.propTypes = {
  className: React.PropTypes.string,
  route: React.PropTypes.string,
  href: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export default Button;
