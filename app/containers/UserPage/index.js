import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import ReposList from 'components/ReposList';
import H1 from 'components/H1';
import { FormattedMessage } from 'react-intl';

import { loadRepos as actionLoadRepos } from 'containers/App/actions';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';

import messages from './messages';

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
          meta={[
            { name: 'description', content: 'A React.js Boilerplate user page' },
          ]}
        />
        <em><FormattedMessage {...messages.ssrInfo} /></em>
        <H1>
          <FormattedMessage {...messages.header} values={{ username }} />
        </H1>
        <ReposList loading={loading} error={error} repos={repos} />
      </div>
    );
  }
}

export function mapStateToProps(state, ownProps) {
  const { params: { username } } = ownProps;
  return {
    username,
    repos: makeSelectRepos()(state),
    loading: makeSelectLoading()(state),
    error: makeSelectError()(state),
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    loadRepos: (username) => dispatch(actionLoadRepos(username)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
