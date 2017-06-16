import React from 'react';
import { withRouter } from 'react-router-dom';
import ProgressBar from './ProgressBar';

// For testing with custom router.
export function withProgressBar(WrappedComponent) {
  class AppWithProgressBar extends React.Component {
    static childContextTypes = {
      registerLoadingComponent: React.PropTypes.func,
      unregisterLoadingComponent: React.PropTypes.func,
    };

    state = {
      progress: -1,
    };

    getChildContext = () => ({
      registerLoadingComponent: this.registerLoadingComponent,
      unregisterLoadingComponent: this.unregisterLoadingComponent,
    });

    componentWillMount() {
      if (this.props.history) {
        // Bind listener to the current instance of component
        /* istanbul ignore next */
        const listen = this.props.history.listen.bind(this);

        // Store a reference to the listener.
        /* istanbul ignore next */
        this.unlisten = listen(() => {
          this.clean();
        });
      }
    }

    componentWillUnmount() {
      this.unlisten();
      // Unset unlisten since it won't be garbage-collected.
      this.unlisten = undefined;
    }

    registeredComponents = [];

    areRegisteredComponentsEmpty = () => this.registeredComponents.length === 0;
    isComponentRegistered = (component) => this.registeredComponents.indexOf(component) !== -1;
    isOneComponentLeft = () => this.registeredComponents.length === 1;

    removeComponent = (component) => this.registeredComponents.splice(this.registeredComponents.indexOf(component), 1);

    clean = () => {
      this.registeredComponents = [];
      this.updateProgress(-1);
      clearTimeout(this.completedProgressTimeoutId);
    };

    registerLoadingComponent = (component) => {
      if (this.areRegisteredComponentsEmpty()) {
        this.updateProgress(0);
      }
      if (!this.isComponentRegistered(component)) {
        this.registeredComponents.push(component);
      }
    };

    unregisterLoadingComponent = (component) => {
      if (this.isComponentRegistered(component)) {
        if (this.isOneComponentLeft()) {
          this.completedProgressTimeoutId = setTimeout(() => {
            // If it's still the case, i.e. no additional async children have registered themselves, otherwise do not update ProgressBar to be 100%
            if (this.isOneComponentLeft()) {
              const { progress } = this.state;
              if (progress !== -1 && progress < 100) {
                this.updateProgress(100);
              }
            }
            this.removeComponent(component);
          }, 50);
        } else {
          this.removeComponent(component);
        }
      }
    };

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
    history: React.PropTypes.object,
  };

  return AppWithProgressBar;
}

export default function (wrappedComponent) {
  return withRouter(withProgressBar(wrappedComponent));
}
