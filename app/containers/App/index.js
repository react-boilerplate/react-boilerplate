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
      loadedRoutes: [this.props.location.pathname],
    };
  }

  componentDidMount() {
    // Store a reference to the listener.
    this.unsubscribeHistory = this.props.router.listen(() => {
      const { loadedRoutes } = this.state;
      const { pathname } = this.props.location;

      // Do not show progress bar for already loaded routes
      if (!loadedRoutes.includes(pathname)) {
        this.setState({ progress: 0 });
      }
    });
  }

  componentWillUpdate(newProps) {
    // Complete progress when route changes
    if (newProps.location.pathname !== this.props.location.pathname && this.state.progress !== 100) {
      // console.log('called', this.state.loadedRoutes);
      this.setState({
        progress: 100,
        loadedRoutes: this.state.loadedRoutes.concat([newProps.location.pathname]),
      });
    }
  }

  componentWillUnmount() {
    // Prevent memory leak since listeners won't be garbage collected.
    this.unsubscribeHistory = undefined;
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
        <ProgressBar percent={this.state.progress} />
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
