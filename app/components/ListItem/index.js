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

export default ListItem;
