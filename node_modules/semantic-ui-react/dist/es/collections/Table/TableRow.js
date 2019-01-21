import _extends from "@babel/runtime/helpers/extends";
import _without from "lodash/without";
import _map from "lodash/map";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly, useTextAlignProp, useVerticalAlignProp } from '../../lib';
import TableCell from './TableCell';
/**
 * A table can have rows.
 */

function TableRow(props) {
  var active = props.active,
      cellAs = props.cellAs,
      cells = props.cells,
      children = props.children,
      className = props.className,
      disabled = props.disabled,
      error = props.error,
      negative = props.negative,
      positive = props.positive,
      textAlign = props.textAlign,
      verticalAlign = props.verticalAlign,
      warning = props.warning;
  var classes = cx(useKeyOnly(active, 'active'), useKeyOnly(disabled, 'disabled'), useKeyOnly(error, 'error'), useKeyOnly(negative, 'negative'), useKeyOnly(positive, 'positive'), useKeyOnly(warning, 'warning'), useTextAlignProp(textAlign), useVerticalAlignProp(verticalAlign), className);
  var rest = getUnhandledProps(TableRow, props);
  var ElementType = getElementType(TableRow, props);

  if (!childrenUtils.isNil(children)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), children);
  }

  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), _map(cells, function (cell) {
    return TableCell.create(cell, {
      defaultProps: {
        as: cellAs
      }
    });
  }));
}

TableRow.handledProps = ["active", "as", "cellAs", "cells", "children", "className", "disabled", "error", "negative", "positive", "textAlign", "verticalAlign", "warning"];
TableRow.defaultProps = {
  as: 'tr',
  cellAs: 'td'
};
TableRow.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A row can be active or selected by a user. */
  active: PropTypes.bool,

  /** An element type to render as (string or function). */
  cellAs: customPropTypes.as,

  /** Shorthand array of props for TableCell. */
  cells: customPropTypes.collectionShorthand,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A row can be disabled. */
  disabled: PropTypes.bool,

  /** A row may call attention to an error or a negative value. */
  error: PropTypes.bool,

  /** A row may let a user know whether a value is bad. */
  negative: PropTypes.bool,

  /** A row may let a user know whether a value is good. */
  positive: PropTypes.bool,

  /** A table row can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_without(SUI.TEXT_ALIGNMENTS, 'justified')),

  /** A table row can adjust its vertical alignment. */
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),

  /** A row may warn a user. */
  warning: PropTypes.bool
} : {};
TableRow.create = createShorthandFactory(TableRow, function (cells) {
  return {
    cells: cells
  };
});
export default TableRow;