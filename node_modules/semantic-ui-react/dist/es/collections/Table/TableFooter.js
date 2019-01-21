import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { customPropTypes, getUnhandledProps } from '../../lib';
import TableHeader from './TableHeader';
/**
 * A table can have a footer.
 */

function TableFooter(props) {
  var as = props.as;
  var rest = getUnhandledProps(TableFooter, props);
  return React.createElement(TableHeader, _extends({}, rest, {
    as: as
  }));
}

TableFooter.handledProps = ["as"];
TableFooter.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as
} : {};
TableFooter.defaultProps = {
  as: 'tfoot'
};
export default TableFooter;