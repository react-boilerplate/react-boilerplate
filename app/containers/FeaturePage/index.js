/*
 * FeaturePage
 *
 * List all the features
 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Button from 'components/Button';
import H1 from 'components/H1';

import styles from './styles.css';
import { FormattedMessage } from 'react-intl';

export class FeaturePage extends React.Component {
  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  /**
   * Changed route to '/'
   */
  openHomePage = () => {
    this.openRoute('/');
  };

  render() {
    return (
      <div>
        <H1>
          <FormattedMessage
            id="boilerplate.containers.FeaturePage.features.header"
            defaultMessage={'Features'}
          />
        </H1>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.scaffolding.header"
                defaultMessage={`
                  Quick scaffolding
                `}
              />
            </p>
            <p>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.scaffolding.message"
                defaultMessage={`
                  Automate the creation of components, containers, routes, selectors
                and sagas - and their tests - right from the CLI!
                `}
              />
            </p>
          </li>

          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.feedback.header"
                defaultMessage={`
                  Instant feedback
                `}
              />
            </p>
            <p>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.feedback.message"
                defaultMessage={`
                  Enjoy the best DX and code your app at the speed of thought! Your
                saved changes to the CSS and JS are reflected instantaneously
                without refreshing the page. Preserve application state even when
                you update something in the underlying code!
                `}
              />
            </p>
          </li>

          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.state_management.header"
                defaultMessage={`
                  Predictable state management
                `}
              />
            </p>
            <p>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.state_management.message"
                defaultMessage={`
                  Unidirectional data flow allows for change logging and time travel
                debugging.
                `}
              />
            </p>
          </li>

          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.javascript.header"
                defaultMessage={`
                  Next generation JavaScript
                `}
              />
            </p>
            <p>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.javascript.message"
                defaultMessage={`
                  Use template strings, object destructuring, arrow functions, JSX
                syntax and more, today.
                `}
              />
            </p>
          </li>

          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.css.header"
                defaultMessage={`
                  Next generation CSS
                `}
              />
            </p>
            <p>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.css.message"
                defaultMessage={`
                  Write composable CSS that's co-located with your components for
                complete modularity. Unique generated class names keep the
                specificity low while eliminating style clashes. Ship only the
                styles that are on the page for the best performance.
                `}
              />
            </p>
          </li>

          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.routing.header"
                defaultMessage={`
                  Industry-standard routing
                `}
              />
            </p>
            <p>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.routing.message"
                defaultMessage={`
                  It's natural to want to add pages (e.g. '/about') to your
                application, and routing makes this possible.
                `}
              />
            </p>
          </li>

          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.network.header"
                defaultMessage={`
                  Offline-first
                `}
              />
            </p>
            <p>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.network.message"
                defaultMessage={`
                  The next frontier in performant web apps: availability without a
                  network connection from the instant your users load the app.
                `}
              />
            </p>
          </li>

          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.internationalization.header"
                defaultMessage={`
                  Complete i18n Standard Internationalization & Pluralization
                `}
              />
            </p>
            <p>
              <FormattedMessage
                id="boilerplate.containers.FeaturePage.internationalization.message"
                defaultMessage={`
                  The web is global. Multilanguage and pluralization support is critical for web apps to scale.
                `}
              />
            </p>
          </li>
        </ul>
        <Button handleRoute={this.openHomePage}>
          <FormattedMessage
            id="boilerplate.containers.FeaturePage.home"
            defaultMessage={'Home'}
          />
        </Button>
      </div>
    );
  }
}
FeaturePage.propTypes = {
  changeRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(FeaturePage);
