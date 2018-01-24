/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

export class RepoListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const item = this.props.item;
    // Put together the content of the repository
    const content = (
      <Wrapper>
        {item.name}
      </Wrapper>
    );

    // Render the content into a list item
    return content;
  }
}

RepoListItem.propTypes = {
  item: PropTypes.object,
};

export default RepoListItem;
