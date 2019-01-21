import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import {
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  SUI,
  useKeyOnly,
  useKeyOrValueAndKey,
  useValueAndKey,
} from '../../lib'
import IconGroup from './IconGroup'

/**
 * An icon is a glyph used to represent something else.
 * @see Image
 */
class Icon extends PureComponent {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Formatted to appear bordered. */
    bordered: PropTypes.bool,

    /** Icon can formatted to appear circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** Color of the icon. */
    color: PropTypes.oneOf(SUI.COLORS),

    /** Icons can display a smaller corner icon. */
    corner: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['top left', 'top right', 'bottom left', 'bottom right']),
    ]),

    /** Show that the icon is inactive. */
    disabled: PropTypes.bool,

    /** Fitted, without space to left or right of Icon. */
    fitted: PropTypes.bool,

    /** Icon can flipped. */
    flipped: PropTypes.oneOf(['horizontally', 'vertically']),

    /** Formatted to have its colors inverted for contrast. */
    inverted: PropTypes.bool,

    /** Icon can be formatted as a link. */
    link: PropTypes.bool,

    /** Icon can be used as a simple loader. */
    loading: PropTypes.bool,

    /** Name of the icon. */
    name: customPropTypes.suggest(SUI.ALL_ICONS_IN_ALL_CONTEXTS),

    /** Icon can rotated. */
    rotated: PropTypes.oneOf(['clockwise', 'counterclockwise']),

    /** Size of the icon. */
    size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),

    /** Icon can have an aria label. */
    'aria-hidden': PropTypes.string,

    /** Icon can have an aria label. */
    'aria-label': PropTypes.string,
  }

  static defaultProps = {
    as: 'i',
  }

  static Group = IconGroup

  getIconAriaOptions() {
    const ariaOptions = {}
    const { 'aria-label': ariaLabel, 'aria-hidden': ariaHidden } = this.props

    if (_.isNil(ariaLabel)) {
      ariaOptions['aria-hidden'] = 'true'
    } else {
      ariaOptions['aria-label'] = ariaLabel
    }

    if (!_.isNil(ariaHidden)) {
      ariaOptions['aria-hidden'] = ariaHidden
    }

    return ariaOptions
  }

  render() {
    const {
      bordered,
      circular,
      className,
      color,
      corner,
      disabled,
      fitted,
      flipped,
      inverted,
      link,
      loading,
      name,
      rotated,
      size,
    } = this.props

    const classes = cx(
      color,
      name,
      size,
      useKeyOnly(bordered, 'bordered'),
      useKeyOnly(circular, 'circular'),
      useKeyOnly(disabled, 'disabled'),
      useKeyOnly(fitted, 'fitted'),
      useKeyOnly(inverted, 'inverted'),
      useKeyOnly(link, 'link'),
      useKeyOnly(loading, 'loading'),
      useKeyOrValueAndKey(corner, 'corner'),
      useValueAndKey(flipped, 'flipped'),
      useValueAndKey(rotated, 'rotated'),
      'icon',
      className,
    )
    const rest = getUnhandledProps(Icon, this.props)
    const ElementType = getElementType(Icon, this.props)
    const ariaOptions = this.getIconAriaOptions()

    return <ElementType {...rest} {...ariaOptions} className={classes} />
  }
}

Icon.create = createShorthandFactory(Icon, value => ({ name: value }))

export default Icon
