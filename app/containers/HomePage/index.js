/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { /* makeSelectRepos, */ makeSelectLoading, makeSelectError } from '../../containers/App/selectors';
// import H2 from '../../components/H2';
// import ReposList from 'components/ReposList';
// import AtPrefix from './AtPrefix';
// import CenteredSection from './CenteredSection';
// import Form from './Form';
// import Input from './Input';
import Message from '../../components/Message';
import {
  Article,
  // Section,
  // CenteredSection,
  TwoThirdSection,
  OneThirtSection,
  EmailLabel,
  Input,
  CheckButton,
  Form,
} from './styles';
import messages from './messages';
import { loadBounty } from '../../containers/App/actions';
import {
  changeUserEmail,
} from './actions';
import {
  makeSelectUserEmail,
} from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  // componentDidMount() {
  //   if (this.props.useremail && this.props.useremail.trim().length > 0) {
  //     this.props.onSubmitForm();
  //   }
  // }

  render() {
    // const { loading, error } = this.props;
    console.log('HomePage::props:', this.props);
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
          <Form id="email-form" onSubmit={this.props.onSubmitForm}>
            <EmailLabel htmlFor="email">
              {/* <FormattedMessage {...messages.trymeMessage} />
              <AtPrefix>
                <FormattedMessage {...messages.trymeAtPrefix} />
              </AtPrefix> */}
              <Input
                id="email-input"
                type="email"
                placeholder="your email"
                value={this.props.useremail}
                onChange={this.props.onChangeUserEmail}
                disabled={this.props.loading}
                autoFocus
              />
              <CheckButton
                id="check-button"
                value="check"
                type="submit"
                disabled={this.props.loading}
              />
            </EmailLabel>
          </Form>
        </TwoThirdSection>
        <OneThirtSection>
          {/* <FormattedMessage {...messages.initial_message} /> */}
          <Message messageId={messages.initial_message.id} />
        </OneThirtSection>
        {/* </Section> */}
      </Article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  // error: React.PropTypes.oneOfType([
  //   React.PropTypes.object,
  //   React.PropTypes.bool,
  // ]),
  // repos: React.PropTypes.oneOfType([
  //   React.PropTypes.array,
  //   React.PropTypes.bool,
  // ]),
  onSubmitForm: React.PropTypes.func,
  useremail: React.PropTypes.string,
  onChangeUserEmail: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUserEmail: (evt) => dispatch(changeUserEmail(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadBounty());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  useremail: makeSelectUserEmail(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
