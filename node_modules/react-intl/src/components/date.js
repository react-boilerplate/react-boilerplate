/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {intlShape, dateTimeFormatPropTypes} from '../types';
import {invariantIntlContext, shouldIntlComponentUpdate} from '../utils';

export default class FormattedDate extends Component {
  static displayName = 'FormattedDate';

  static contextTypes = {
    intl: intlShape,
  };

  static propTypes = {
    ...dateTimeFormatPropTypes,
    value: PropTypes.any.isRequired,
    format: PropTypes.string,
    children: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    invariantIntlContext(context);
  }

  shouldComponentUpdate(...next) {
    return shouldIntlComponentUpdate(this, ...next);
  }

  render() {
    const {formatDate, textComponent: Text} = this.context.intl;
    const {value, children} = this.props;

    let formattedDate = formatDate(value, this.props);

    if (typeof children === 'function') {
      return children(formattedDate);
    }

    return <Text>{formattedDate}</Text>;
  }
}
