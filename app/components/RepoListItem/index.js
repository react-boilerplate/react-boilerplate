import React from 'react';

import ListItem from 'ListItem';
import styles from './styles.css';

class RepoListItem extends React.Component {
  render() {
    const item = this.props.item;

    return (
      <ListItem key={'repo-list-item-' + item.full_name }>
        <a href={ item.html_url }>{ item.full_name }</a>
        <div className={ styles.listItemContent }>
          <a
            className={ styles.listItemContentLink }
            href={ item.html_url + '/issues' }
          >
            { item.open_issues_count }
          </a>
        </div>
      </ListItem>
    );
  }
}

export default RepoListItem;
