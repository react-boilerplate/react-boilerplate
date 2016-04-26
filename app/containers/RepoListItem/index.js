/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import currentUserSelector from 'currentUserSelector';

import ListItem from 'ListItem';
import IssueIcon from 'IssueIcon';
import A from 'A';

import styles from './styles.css';

export class RepoListItem extends React.Component {
  render() {
    const item = this.props.item;
    let nameprefix = '';

    // If the repository is owned by a different person than we got the data for
    // it's a fork and we should show the name of the owner
    if (item.owner.login !== this.props.currentUser) {
      nameprefix = item.owner.login + '/';
    }

    // Put together the content of the repository
    const content = (
      <div className={styles.linkWrapper}>
        <A
          className={styles.linkRepo}
          href={item.html_url}
          target="_blank"
        >
          {nameprefix + item.name}
        </A>
        <A
          className={styles.linkIssues}
          href={item.html_url + '/issues'}
          target="_blank"
        >
          <IssueIcon className={styles.issueIcon} />
          {item.open_issues_count}
        </A>
      </div>
    );

    // Render the content into a list item
    return (
      <ListItem key={'repo-list-item-' + item.full_name} content={content} />
    );
  }
}

export default connect(createSelector(
  currentUserSelector(),
  (currentUser) => ({ currentUser })
))(RepoListItem);
