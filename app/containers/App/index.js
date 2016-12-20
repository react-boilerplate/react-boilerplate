/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import ProgressBar from 'components/ProgressBar';
import Header from 'components/Header';
import Footer from 'components/Footer';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: -1,
      loadedRoutes: props.location && [props.location.pathname],
    };
    this.updateProgress = this.updateProgress.bind(this);
  }

  componentWillMount() {
    // Store a reference to the listener.
    this.unsubscribeHistory = this.props.router && this.props.router.listenBefore((location) => {
      // Do not show progress bar for already loaded routes
      if (this.state.loadedRoutes.indexOf(location.pathname) === -1) {
        this.updateProgress(0);
      }
    });
  }

  componentWillUpdate(newProps, newState) {
    // Complete progress when route changes
    const { loadedRoutes, progress } = this.state;
    const { pathname } = newProps.location;

    // Prevent state update while re-rendering
    if (loadedRoutes.indexOf(pathname) === -1 && progress !== -1 && newState.progress < 100) {
      this.updateProgress(100);
      this.setState({
        loadedRoutes: loadedRoutes.concat([pathname]),
      });
    }
  }

  componentWillUnmount() {
    // Prevent memory leak since listeners won't be garbage collected.
    this.unsubscribeHistory = undefined;
  }

  updateProgress(progress) {
    this.setState({ progress });
  }

  render() {
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application' },
          ]}
        />
        <ProgressBar percent={this.state.progress} updateProgress={this.updateProgress} />
        <Header />
        {React.Children.toArray(this.props.children)}
        <Footer />
      </AppWrapper>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default withRouter(App);
