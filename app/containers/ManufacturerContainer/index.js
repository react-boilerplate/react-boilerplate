/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
export class ManufacturerContainer extends React.PureComponent {
  render() {
    const { match } = this.props;

    return (
      <article>
        <Helmet>
          <title>Create Manufacturer</title>
          <meta
            name="description"
            content="Create Manufacturer for the products"
          />
        </Helmet>
        <div>
          <h4>Data Topic</h4>

          <Switch>
            <Route
              path={`${match.url}/view`}
              render={() => <span>Viewing Now</span>}
            />
            <Route
              path={`${match.url}/create`}
              render={() => <span>Creating Now</span>}
            />
          </Switch>
        </div>
      </article>
    );
  }
}

ManufacturerContainer.propTypes = {
  match: PropTypes.object,
};

export default ManufacturerContainer;
