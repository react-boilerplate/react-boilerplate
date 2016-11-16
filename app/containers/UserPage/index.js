import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import ReposList from 'components/ReposList';

import { loadRepos as actionLoadRepos } from 'containers/App/actions';
import { selectRepos, selectLoading, selectError } from 'containers/App/selectors';

export class UserPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    username: PropTypes.string,
    loadRepos: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.any,
    repos: PropTypes.any,
  }

  componentWillMount() {
    const { username, loadRepos, repos, error } = this.props;
    if (repos === false && error === false) {
      loadRepos(username);
    }
  }

  render() {
    const { username, loading, error, repos } = this.props;
    return (
      <div>
        <Helmet
          title="User page"
        />
        <em>Try disabling JavaScript and refresh the page to see the Server Side Rendering working.</em>
        <h1>{username}&apos;s repositories:</h1>
        <ReposList loading={loading} error={error} repos={repos} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { params: { username } } = ownProps;
  return {
    username,
    repos: selectRepos()(state),
    loading: selectLoading()(state),
    error: selectError()(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadRepos: (username) => dispatch(actionLoadRepos(username)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
