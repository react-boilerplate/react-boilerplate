import React from 'react';

import styles from './styles.css';

function ListItem(props) {
  return (
    <li className={props.className || styles.item}>
      <div className={styles.itemContent}>
        {props.content}
      </div>
    </li>
  );
}

ListItem.propTypes = {
  className: React.PropTypes.string,
  content: React.PropTypes.any,
};

export default ListItem;
