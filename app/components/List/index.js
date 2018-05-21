import React, { Component, PropTypes } from 'react';

import { ListContainer, ListItem, ListItemHeader, ListItemSubHeader, ListItemContent, SubHeaderContainer } from './styled';
import { Anchor, Link } from '../common';
import DeleteButton from '../common/DeleteButton';
import EditButton from '../common/EditButton';

class List extends Component {
  static propTypes = {
    listArr: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
  }

  state = { showButtons: '' };

  handleMouseOver = (title) => this.setState({ showButtons: title });

  handleMouseLeave = () => this.setState({ showButtons: '' });

  handleDelete = (evt, id) => {
    evt.preventDefault();
    this.props.handleDelete(id);
  }

  render() {
    return (
      !!this.props.listArr.length && <ListContainer>
        {this.props.listArr.map((item) => (
          <ListItem onMouseEnter={() => this.handleMouseOver(item.title)} onMouseLeave={this.handleMouseLeave} key={item.title}>
            {this.state.showButtons === item.title && <DeleteButton onClick={(evt) => this.handleDelete(evt, item._id)} />}
            {this.state.showButtons === item.title && <EditButton onClick={(evt) => this.handleDelete(evt, item._id)} />}
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
        <ListItem>
          <Link to="/articles">
            <ListItemHeader>Add Article</ListItemHeader>
          </Link>
        </ListItem>
      </ListContainer>
    );
  }
}

export default List;
