import React from 'react';

import styles from './styles.css';

class List extends React.Component {
  render() {
    return (
      <div className={ styles.listWrapper }>
        <ul className={ styles.list }>
          {this.props.items.map((item, index) => {
            return (
              <this.props.render key={'item-' + index } item={item} />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default List;
