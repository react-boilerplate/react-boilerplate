import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import currentUserSelector from 'currentUserSelector';

import ListItem from 'ListItem';
import IssueIcon from 'IssueIcon';
import A from 'A';

import styles from './styles.css';

class RepoListItem extends React.Component {
  render() {
    const item = this.props.item;
    let nameprefix = '';

    if (item.owner.login !== this.props.currentUser) {
      nameprefix = item.owner.login + '/';
    }

    return (
      <ListItem key={'repo-list-item-' + item.full_name }>
        <A
          className={ styles.linkRepo }
          href={ item.html_url }
        >
          { nameprefix + item.name }
        </A>
        <A
          className={ styles.linkIssues }
          href={ item.html_url + '/issues' }
        >
          <IssueIcon className={ styles.issueIcon } />
          { item.open_issues_count }
        </A>
      </ListItem>
    );
  }
}

export default connect(createSelector(
  currentUserSelector,
  (currentUser) => ({ currentUser })
))(RepoListItem);
