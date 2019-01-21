import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { customPropTypes, getUnhandledProps, useValueAndKey } from '../../lib';
import TableCell from './TableCell';
/**
 * A table can have a header cell.
 */

function TableHeaderCell(props) {
  var as = props.as,
      className = props.className,
      sorted = props.sorted;
  var classes = cx(useValueAndKey(sorted, 'sorted'), className);
  var rest = getUnhandledProps(TableHeaderCell, props);
  return React.createElement(TableCell, _extends({}, rest, {
    as: as,
    className: classes
  }));
}

TableHeaderCell.handledProps = ["as", "className", "sorted"];
TableHeaderCell.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Additional classes. */
  className: PropTypes.string,

  /** A header cell can be sorted in ascending or descending order. */
  sorted: PropTypes.oneOf(['ascending', 'descending'])
} : {};
TableHeaderCell.defaultProps = {
  as: 'th'
};
export default TableHeaderCell;