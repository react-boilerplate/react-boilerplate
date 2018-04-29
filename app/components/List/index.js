import React, { Component, PropTypes } from 'react';

import { ListContainer, ListItem, ListItemHeader, ListItemSubHeader, ListItemContent, SubHeaderContainer } from './styled';
import { Anchor } from '../common';
import DeleteButton from '../common/DeleteButton';

class List extends Component {
  static propTypes = {
    listArr: PropTypes.array.isRequired,
  }

  state = { showDelete: '' };

  handleMouseOver = (title) => this.setState({ showDelete: title });

  handleMouseLeave = () => this.setState({ showDelete: '' });

  handleDelete = (evt) => {
    evt.preventDefault();
    console.log('Delete!');
  }

  render() {
    return (
      !!this.props.listArr.length && <ListContainer>
        {this.props.listArr.map((item) => (
          <ListItem onMouseEnter={() => this.handleMouseOver(item.title)} onMouseLeave={this.handleMouseLeave} key={item.title}>
            {this.state.showDelete === item.title && <DeleteButton onDelete={() => console.log('Delete!')} />}
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
