import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  SUI,
  useKeyOnly,
  useKeyOrValueAndKey,
  useValueAndKey,
  useWidthProp,
} from '../../lib'
import Button from './Button'

/**
 * Buttons can be grouped.
 */
function ButtonGroup(props) {
  const {
    attached,
    basic,
    buttons,
    children,
    className,
    color,
    compact,
    content,
    floated,
    fluid,
    icon,
    inverted,
    labeled,
    negative,
    positive,
    primary,
    secondary,
    size,
    toggle,
    vertical,
    widths,
  } = props

  const classes = cx(
    'ui',
    color,
    size,
    useKeyOnly(basic, 'basic'),
    useKeyOnly(compact, 'compact'),
    useKeyOnly(fluid, 'fluid'),
    useKeyOnly(icon, 'icon'),
    useKeyOnly(inverted, 'inverted'),
    useKeyOnly(labeled, 'labeled'),
    useKeyOnly(negative, 'negative'),
    useKeyOnly(positive, 'positive'),
    useKeyOnly(primary, 'primary'),
    useKeyOnly(secondary, 'secondary'),
    useKeyOnly(toggle, 'toggle'),
    useKeyOnly(vertical, 'vertical'),
    useKeyOrValueAndKey(attached, 'attached'),
    useValueAndKey(floated, 'floated'),
    useWidthProp(widths),
    'buttons',
    className,
  )
  const rest = getUnhandledProps(ButtonGroup, props)
  const ElementType = getElementType(ButtonGroup, props)

  if (_.isNil(buttons)) {
    return (
      <ElementType {...rest} className={classes}>
        {childrenUtils.isNil(children) ? content : children}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes}>
      {_.map(buttons, button => Button.create(button))}
    </ElementType>
  )
}

ButtonGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Groups can be attached to other content. */
  attached: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  ]),

  /** Groups can be less pronounced. */
  basic: PropTypes.bool,

  /** Array of shorthand Button values. */
  buttons: customPropTypes.collectionShorthand,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Groups can have a shared color. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Groups can reduce their padding to fit into tighter spaces. */
  compact: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Groups can be aligned to the left or right of its container. */
  floated: PropTypes.oneOf(SUI.FLOATS),

  /** Groups can take the width of their container. */
  fluid: PropTypes.bool,

  /** Groups can be formatted as icons. */
  icon: PropTypes.bool,

  /** Groups can be formatted to appear on dark backgrounds. */
  inverted: PropTypes.bool,

  /** Groups can be formatted as labeled icon buttons. */
  labeled: PropTypes.bool,

  /** Groups can hint towards a negative consequence. */
  negative: PropTypes.bool,

  /** Groups can hint towards a positive consequence. */
  positive: PropTypes.bool,

  /** Groups can be formatted to show different levels of emphasis. */
  primary: PropTypes.bool,

  /** Groups can be formatted to show different levels of emphasis. */
  secondary: PropTypes.bool,

  /** Groups can have different sizes. */
  size: PropTypes.oneOf(SUI.SIZES),

  /** Groups can be formatted to toggle on and off. */
  toggle: PropTypes.bool,

  /** Groups can be formatted to appear vertically. */
  vertical: PropTypes.bool,

  /** Groups can have their widths divided evenly. */
  widths: PropTypes.oneOf(SUI.WIDTHS),
}

export default ButtonGroup
