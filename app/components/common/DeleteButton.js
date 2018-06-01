import React, { PropTypes } from 'react';

import IconButton from './IconButton';
import X from '../../images/ic_highlight_off_white_24px.svg';

const DeleteButton = ({ onClick }) => (
  <IconButton src={X} onClick={onClick} backgroundColor="#e90f0f" />
);

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
