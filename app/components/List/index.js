import React, { Component, PropTypes } from 'react';

import { ListContainer, ListItem, ListItemHeader, ListItemSubHeader, ListItemContent, SubHeaderContainer } from './styled';
import { Anchor } from '../common';
import DeleteButton from '../common/DeleteButton';

class List extends Component {
  static propTypes = {
    listArr: PropTypes.array.isRequired,
  }

  state = {};

  render() {
    return (
      !!this.props.listArr.length && <ListContainer>
        {this.props.listArr.map((item) => (
          <ListItem key={item.title}>
            {<DeleteButton onDelete={() => console.log('Delete!')} />}
            <Anchor href={item.href} target="_blank">
              <ListItemHeader>{item.title}</ListItemHeader>
            </Anchor>
            <SubHeaderContainer>
              <ListItemSubHeader>{item.publication}</ListItemSubHeader>
              <ListItemSubHeader>{item.date}</ListItemSubHeader>
            </SubHeaderContainer>
            <ListItemContent>{item.excerpt}</ListItemContent>
          </ListItem>
        ))}
      </ListContainer>
    );
  }
}

export default List;
