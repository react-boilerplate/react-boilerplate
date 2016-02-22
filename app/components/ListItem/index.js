import React from 'react';

import styles from './styles.css';

class ListItem extends React.Component {
  render() {
    return (
      <li className={ this.props.className || styles.item }>
        <div className={ styles.itemContent }>
          { this.props.content }
        </div>
      </li>
    );
  }
}

export default ListItem;
