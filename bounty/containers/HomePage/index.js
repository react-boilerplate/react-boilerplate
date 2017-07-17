/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
// import H2 from '../../components/H2';
// import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
// import CenteredSection from './CenteredSection';
import Form from './Form';
// import Input from './Input';
import {
  Article,
  // Section,
  // CenteredSection,
  TwoThirdSection,
  OneThirtSection,
  EmailLabel,
  Input,
  CheckButton,
} from './styles';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error, repos } = this.props;
    // const reposListProps = {
    //   loading,
    //   error,
    //   repos,
    // };

    return (
      <Article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        {/* <CenteredSection>
          <H2>
            <FormattedMessage {...messages.title} />
          </H2>
        </CenteredSection>
        <CenteredSection>
          <FormattedMessage {...messages.message} />
        </CenteredSection> */}
        {/* <Section> */}
        <TwoThirdSection>
          <Form onSubmit={this.props.onSubmitForm}>
            <EmailLabel htmlFor="email">
              {/* <FormattedMessage {...messages.trymeMessage} />
              <AtPrefix>
                <FormattedMessage {...messages.trymeAtPrefix} />
              </AtPrefix> */}
              <Input
                id="email"
                type="email"
                placeholder="your email"
                value={this.props.username}
                onChange={this.props.onChangeUsername}
                autoFocus
              />
              <CheckButton>check</CheckButton>
            </EmailLabel>
          </Form>
        </TwoThirdSection>
        <OneThirtSection>

        </OneThirtSection>
        {/* </Section> */}
      </Article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
