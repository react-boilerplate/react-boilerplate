import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { getUnhandledProps, useKeyOnly } from '../../lib';
import AccordionAccordion from './AccordionAccordion';
import AccordionContent from './AccordionContent';
import AccordionPanel from './AccordionPanel';
import AccordionTitle from './AccordionTitle';
/**
 * An accordion allows users to toggle the display of sections of content.
 */

function Accordion(props) {
  var className = props.className,
      fluid = props.fluid,
      inverted = props.inverted,
      styled = props.styled;
  var classes = cx('ui', useKeyOnly(fluid, 'fluid'), useKeyOnly(inverted, 'inverted'), useKeyOnly(styled, 'styled'), className);
  var rest = getUnhandledProps(Accordion, props);
  return React.createElement(AccordionAccordion, _extends({}, rest, {
    className: classes
  }));
}

Accordion.handledProps = ["className", "fluid", "inverted", "styled"];
Accordion.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Additional classes. */
  className: PropTypes.string,

  /** Format to take up the width of its container. */
  fluid: PropTypes.bool,

  /** Format for dark backgrounds. */
  inverted: PropTypes.bool,

  /** Adds some basic styling to accordion panels. */
  styled: PropTypes.bool
} : {};
Accordion.Accordion = AccordionAccordion;
Accordion.Content = AccordionContent;
Accordion.Panel = AccordionPanel;
Accordion.Title = AccordionTitle;
export default Accordion;