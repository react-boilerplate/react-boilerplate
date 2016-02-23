import React from 'react';

import styles from './styles.css';

class List extends React.Component {
  render() {
    const ComponentToRender = this.props.component;
    let content = (<div></div>);
    // If we have items, render them
    if (this.props.items) {
      content = this.props.items.map((item, index) => (
        <ComponentToRender key={'item-' + index } item={item} />
      ));
    } else {
      // Otherwise render a single component
      content = (<ComponentToRender />);
    }

    return (
      <div className={ styles.listWrapper }>
        <ul className={ styles.list }>
          { content }
        </ul>
      </div>
    );
  }
}

export default List;
