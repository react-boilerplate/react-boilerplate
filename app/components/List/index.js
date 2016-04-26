import React from 'react';

import styles from './styles.css';

function List(props) {
  const ComponentToRender = props.component;
  let content = (<div></div>);

  // If we have items, render them
  if (props.items) {
    content = props.items.map((item, index) => (
      <ComponentToRender key={'item-' + index} item={item} />
    ));
  } else {
    // Otherwise render a single component
    content = (<ComponentToRender />);
  }

  return (
    <div className={styles.listWrapper}>
      <ul className={styles.list}>
        {content}
      </ul>
    </div>
  );
}

export default List;
