"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _AccordionAccordion = _interopRequireDefault(require("./AccordionAccordion"));

var _AccordionContent = _interopRequireDefault(require("./AccordionContent"));

var _AccordionPanel = _interopRequireDefault(require("./AccordionPanel"));

var _AccordionTitle = _interopRequireDefault(require("./AccordionTitle"));

/**
 * An accordion allows users to toggle the display of sections of content.
 */
function Accordion(props) {
  var className = props.className,
      fluid = props.fluid,
      inverted = props.inverted,
      styled = props.styled;
  var classes = (0, _classnames.default)('ui', (0, _lib.useKeyOnly)(fluid, 'fluid'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(styled, 'styled'), className);
  var rest = (0, _lib.getUnhandledProps)(Accordion, props);
  return _react.default.createElement(_AccordionAccordion.default, (0, _extends2.default)({}, rest, {
    className: classes
  }));
}

Accordion.handledProps = ["className", "fluid", "inverted", "styled"];
Accordion.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Additional classes. */
  className: _propTypes.default.string,

  /** Format to take up the width of its container. */
  fluid: _propTypes.default.bool,

  /** Format for dark backgrounds. */
  inverted: _propTypes.default.bool,

  /** Adds some basic styling to accordion panels. */
  styled: _propTypes.default.bool
} : {};
Accordion.Accordion = _AccordionAccordion.default;
Accordion.Content = _AccordionContent.default;
Accordion.Panel = _AccordionPanel.default;
Accordion.Title = _AccordionTitle.default;
var _default = Accordion;
exports.default = _default;