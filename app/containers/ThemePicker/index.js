/**
 *
 * ThemePicker
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ColorBox from 'components/ColorBox';

import makeSelectThemePicker from './selectors';

import Wrapper from './Wrapper';
import { changeTheme } from './actions';

export class ThemePicker extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        {['#FF8040', '#408040', '#40FFC0', '#8080C0', '#808040', '#A0A0A0', '#3CB371'].map((val) =>
          <ColorBox key={val} data-value={val} value={val} onClick={this.props.onChangeTheme}></ColorBox>
          )}
      </Wrapper>
    );
  }
}

ThemePicker.propTypes = {
  onChangeTheme: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  themepicker: makeSelectThemePicker(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeTheme: (evt) => dispatch(changeTheme(evt.target.dataset.value)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(ThemePicker);
