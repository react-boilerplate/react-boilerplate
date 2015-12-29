/**
 *
 * Img.react.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';

function Img(props) {
  return (
    <img className={props.className} src={props.src} alt={props.alt} />
  );
}

// We require the use of src and alt, only enforced by react in dev mode
Img.propTypes = {
  src: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string.isRequired,
  className: React.PropTypes.string
}

export default Img;
