import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import CreateManufacturerForm from '../create';
import ViewAllManufacturer from './ViewAll';

/* eslint-disable react/prefer-stateless-function */
export default class ViewManufacturer extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <Switch>
          <Route
            exact
            path={`${match.url}/`}
            render={() => <ViewAllManufacturer />}
          />
          <Route
            path={`${match.url}/:id`}
            render={() => <CreateManufacturerForm isEditMode />}
          />
        </Switch>
      </div>
    );
  }
}

ViewManufacturer.propTypes = {
  match: PropTypes.object,
};
