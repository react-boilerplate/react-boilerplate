import React from 'react';
import { createAndShow, LOCK_CONTAINER_ID } from './lib';
import styles from './styles.css';

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    location: React.PropTypes.shape({
      state: React.PropTypes.shape({
        nextPathname: React.PropTypes.string.isRequired,
      }),
    }).isRequired,
  };

  componentDidMount() {
    const nextPathname = this.props.location.state && this.props.location.state.nextPathname;
    createAndShow(nextPathname || '/');
  }

  render() {
    return <div id={LOCK_CONTAINER_ID} className={styles.container} />;
  }
}

export default Login;
