import React from 'react';
import ProgressBar from './ProgressBar';

function withProgressBar(WrappedComponent) {
  class AppWithProgressBar extends React.Component {
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
      /* istanbul ignore next */
      this.unsubscribeHistory = this.props.router && this.props.router.listenBefore((location) => {
        // Do not show progress bar for already loaded routes.
        if (this.state.loadedRoutes.indexOf(location.pathname) === -1) {
          this.updateProgress(0);
        }
      });
    }

    componentWillUpdate(newProps, newState) {
      const { loadedRoutes, progress } = this.state;
      const { pathname } = newProps.location;

      // Complete progress when route changes. But prevent state update while re-rendering.
      if (loadedRoutes.indexOf(pathname) === -1 && progress !== -1 && newState.progress < 100) {
        this.updateProgress(100);
        this.setState({
          loadedRoutes: loadedRoutes.concat([pathname]),
        });
      }
    }

    componentWillUnmount() {
      // Unset unsubscribeHistory since it won't be garbage-collected.
      this.unsubscribeHistory = undefined;
    }

    updateProgress(progress) {
      this.setState({ progress });
    }

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
    router: React.PropTypes.object,
  };

  return AppWithProgressBar;
}

export default withProgressBar;
