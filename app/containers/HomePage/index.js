/*
 * HomePage
 * This is the first thing users see of our App
 */

import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';

import Button from 'Button';
import H1 from 'H1';

import selector from './selector';
import styles from './styles.css';

class HomePage extends React.Component {
  constructor() {
    super();
    this.onChangeRoute = this.onChangeRoute.bind(this);
    this.changeRouteToReadme = this.changeRouteToReadme.bind(this);
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  onChangeRoute(url) {
    this.props.dispatch(routeActions.push(url));
  }

  changeRouteToReadme() {
    this.onChangeRoute('/features');
  }

  render() {
    return (
      <article>
        <div>
          <section className={ styles.textSection }>
            <H1>React Boilerplate</H1>
            <p>Quick setup for new performance orientated, offline–first React.js applications featuring Redux, hot–reloading, PostCSS, react-router, ServiceWorker, AppCache, FontFaceObserver and Mocha.</p>
          </section>
          <section className={ styles.textSection }>
            {!this.props.authenticated ? (
              <div></div>
            ) : null}
          </section>
          <Button handleRoute = { this.changeRouteToReadme }>Features</Button>
        </div>
      </article>
    );
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(selector)(HomePage);
