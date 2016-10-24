import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { removeToken, loggedIn, loggedOut } from 'containers/Viewer/lib';
import { logout } from 'containers/Viewer/actions';
import { selectGivenName, selectPicture } from 'containers/Viewer/selectors';
import UserBadge from 'components/UserBadge';
import styles from './styles.css';
import buttonStyles from 'components/Button/styles.css';

class ViewerWidget extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    givenName: React.PropTypes.string,
    picture: React.PropTypes.string,
    logout: React.PropTypes.func,
  };

  render() {
    const {
      givenName,
      picture,
    } = this.props;

    return (
      <div>
        {picture && <UserBadge picture={picture} />}
        {givenName && <span className={styles.UserName}>{givenName}</span>}
        {loggedOut() && <Link to="/login" className={`${buttonStyles.button} ${styles.loginButton}`}>
          Log In
        </Link>}
        {loggedIn() && <div className={styles.dropDown}>
          <button className={styles.dropDownButton}>&#9660;</button>
          <div className={styles.dropDownContent}>
            <Link to="/" onClick={this.props.logout}>
              Log Out
            </Link>
          </div>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  givenName: selectGivenName(),
  picture: selectPicture(),
});

function mapDispatchToProps(dispatch) {
  return {
    logout() {
      removeToken();
      dispatch(logout());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewerWidget);
