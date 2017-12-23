/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import { createStructuredSelector } from 'reselect';
import makeSelectThemePicker from 'containers/ThemePicker/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
  color: ${(props) => props.theme.main};
`;

export class App extends React.PureComponent {
  render() {
    return (
      <ThemeProvider theme={this.props.themepicker}>
        <AppWrapper>
          <Helmet
            titleTemplate="%s - React.js Boilerplate"
            defaultTitle="React.js Boilerplate"
          >
            <meta name="description" content="A React.js Boilerplate application" />
          </Helmet>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/features" component={FeaturePage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
          <Footer />
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  themepicker: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  themepicker: makeSelectThemePicker(),
});

export function mapDispatchToProps() {
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(compose(
  withConnect,
)(App));
