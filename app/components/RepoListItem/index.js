import React from 'react';
import { connect } from 'react-redux';

import ListItem from 'ListItem';
import IssueIcon from 'IssueIcon';

import styles from './styles.css';

import selector from 'HomePage/selector';

class RepoListItem extends React.Component {
  render() {
    const item = this.props.item;
    let nameprefix = '';

    if (item.owner.login !== this.props.username) {
      nameprefix = item.owner.login + '/';
    }

    return (
      <ListItem key={'repo-list-item-' + item.full_name }>
        <a
          className={ styles.linkRepo }
          href={ item.html_url }

        >{ nameprefix + item.name }</a>
        <a
          className={ styles.linkIssues }
          href={ item.html_url + '/issues' }
        >
          <IssueIcon className={ styles.issueIcon } />
          { item.open_issues_count }
        </a>
      </ListItem>
    );
  }
}

export default connect(selector)(RepoListItem);
