import React from 'react';
import styles from './styles.css';

export default class UserBadge extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    picture: React.PropTypes.string.isRequired,
  };

  render() {
    return <img alt="avatar" src={this.props.picture} className={styles.UserBadge} />;
  }
}
