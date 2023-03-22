/*
 * AddStringPage
 *
 * This is the first thing users see of our App, at the '/AddStringPage' route
 */

// /Use dev tool from https://fb.me/react-devtools
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectNewString,
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import StringList from 'components/StringList';
import CenteredSection from './CenteredSection';
import Input from './Input';
import Button from './Button';
import Section from './Section';
import { addNewString, changeNewString } from '../App/actions';

export function AddStringPage({
  newstr,
  loading,
  error,
  repos,
  onAddNewString,
  onChangeNewString,
}) {
  const reposListProps = {
    loading,
    error,
    repos,
  };

  return (
    <article>
      <Helmet>
        <title>Add String Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <CenteredSection>
          <H2 />
          <p />
        </CenteredSection>
        <Section>
          <b>Add New String</b>
          <p />

          <label htmlFor="newstring">
            Enter new string:
            <Input
              id="newstring"
              type="text"
              placeholder=""
              value={newstr}
              onChange={onChangeNewString}
            />
          </label>
          <p />
          {newstr.trim().length > 0 && (
            <Button type="button" onClick={onAddNewString}>
              Add New String
            </Button>
          )}
          <p />
          <StringList {...reposListProps} />
        </Section>
      </div>
    </article>
  );
}

AddStringPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onAddNewString: PropTypes.func,
  newstr: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  newstr: makeSelectNewString(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeNewString: evt => dispatch(changeNewString(evt.target.value)),

    onAddNewString: evt => dispatch(addNewString()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddStringPage);
