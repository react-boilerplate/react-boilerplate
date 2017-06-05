import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectLoadedRoutes, makeSelectLocation } from 'containers/App/selectors';

import ProgressBar from './ProgressBar';

// For testing with custom router.
export function withProgressBar(WrappedComponent) {
  class AppWithProgressBar extends React.Component {

    state = {
      progress: -1,
    };

    componentWillMount() {
      this.handleProps(this.props);
    }

    componentWillReceiveProps(newProps) {
      this.handleProps(newProps);
    }

    handleProps(props) {
      const { loadedRoutes, location } = props;
      const { pathname } = location;
      const { progress } = this.state;

      if (!loadedRoutes[pathname]) {
        // Only show progress bar if route is not already loaded.
        this.updateProgress(0);
      }

      // Complete progress when route changes. But prevent state update while re-rendering.
      if (loadedRoutes[pathname] && progress !== -1 && progress < 100) {
        this.updateProgress(100);
      }
    }

    updateProgress = (progress) => {
      this.setState({ progress });
    };

    render() {
      return (
        <div>
          <ProgressBar percent={this.state.progress} updateProgress={this.updateProgress} />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }

  AppWithProgressBar.propTypes = {
    location: React.PropTypes.object,
    loadedRoutes: React.PropTypes.object,
  };

  return AppWithProgressBar;
}

const mapStateToProps = createStructuredSelector({
  loadedRoutes: makeSelectLoadedRoutes(),
  location: makeSelectLocation(),
});

export default function (wrappedComponent) {
  return connect(mapStateToProps)(withProgressBar(wrappedComponent));
}
