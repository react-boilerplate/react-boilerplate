import React from 'react';

import styles from './styles.css';

class ListItem extends React.Component {
  render() {
    return (
      <li className={ this.props.className || styles.item }>
        <span className={ styles.itemContent }>
          { this.props.children }
        </span>
      </li>
    );
  }
}

export default ListItem;
