/*
 * HomePage
 * This is the first thing users see of our App
 */

import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { createSelector } from 'reselect';
import usernameSelector from 'usernameSelector';
import reposSelector from 'reposSelector';

import {
  changeUsername,
  loadRepos
} from 'App/actions';

import Button from 'Button';
import H1 from 'H1';
import H2 from 'H2';
import List from 'List';
import RepoListItem from 'RepoListItem';

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
              {(this.props.repos === false) ? (
                <form onSubmit={ this.props.onSubmitForm }>
                  <label className={ styles.label }>Show repositories of
                    <span className={ styles.atPrefix }>@</span>
                    <input
                      className={ styles.input }
                      type="text"
                      placeholder="mxstbr"
                      value={ this.props.username }
                      onChange={ this.props.onChangeUsername }
                    />
                  </label>
                </form>
              ) : (
                <div>
                  <H2>{ this.props.username }</H2>
                  <List items={this.props.repos} render={RepoListItem} />
                </div>
              )}
          </section>
          <Button handleRoute = { this.changeRouteToReadme }>Features</Button>
        </div>
      </article>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      evt.preventDefault();
      dispatch(loadRepos());
    },
    dispatch
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  reposSelector,
  usernameSelector,
  (repos, username) => ({ repos, username })
), mapDispatchToProps)(HomePage);
