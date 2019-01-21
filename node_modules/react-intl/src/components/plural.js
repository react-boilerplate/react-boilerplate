/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {intlShape, pluralFormatPropTypes} from '../types';
import {invariantIntlContext, shouldIntlComponentUpdate} from '../utils';

export default class FormattedPlural extends Component {
  static displayName = 'FormattedPlural';

  static contextTypes = {
    intl: intlShape,
  };

  static propTypes = {
    ...pluralFormatPropTypes,
    value: PropTypes.any.isRequired,

    other: PropTypes.node.isRequired,
    zero: PropTypes.node,
    one: PropTypes.node,
    two: PropTypes.node,
    few: PropTypes.node,
    many: PropTypes.node,

    children: PropTypes.func,
  };

  static defaultProps = {
    style: 'cardinal',
  };

  constructor(props, context) {
    super(props, context);
    invariantIntlContext(context);
  }

  shouldComponentUpdate(...next) {
    return shouldIntlComponentUpdate(this, ...next);
  }

  render() {
    const {formatPlural, textComponent: Text} = this.context.intl;
    const {value, other, children} = this.props;

    let pluralCategory = formatPlural(value, this.props);
    let formattedPlural = this.props[pluralCategory] || other;

    if (typeof children === 'function') {
      return children(formattedPlural);
    }

    return <Text>{formattedPlural}</Text>;
  }
}
