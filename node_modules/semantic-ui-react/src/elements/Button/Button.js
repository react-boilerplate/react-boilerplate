import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  childrenUtils,
  customPropTypes,
  createShorthandFactory,
  getElementType,
  getUnhandledProps,
  SUI,
  useKeyOnly,
  useKeyOrValueAndKey,
  useValueAndKey,
} from '../../lib'
import Icon from '../Icon/Icon'
import Label from '../Label/Label'
import ButtonContent from './ButtonContent'
import ButtonGroup from './ButtonGroup'
import ButtonOr from './ButtonOr'

/**
 * A Button indicates a possible user action.
 * @see Form
 * @see Icon
 * @see Label
 */
class Button extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** A button can show it is currently the active user selection. */
    active: PropTypes.bool,

    /** A button can animate to show hidden content. */
    animated: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['fade', 'vertical'])]),

    /** A button can be attached to other content. */
    attached: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    ]),

    /** A basic button is less pronounced. */
    basic: PropTypes.bool,

    /** Primary content. */
    children: customPropTypes.every([
      PropTypes.node,
      customPropTypes.disallow(['label']),
      customPropTypes.givenProps(
        {
          icon: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.object.isRequired,
            PropTypes.element.isRequired,
          ]),
        },
        customPropTypes.disallow(['icon']),
      ),
    ]),

    /** A button can be circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** A button can have different colors */
    color: PropTypes.oneOf([
      ...SUI.COLORS,
      'facebook',
      'google plus',
      'instagram',
      'linkedin',
      'twitter',
      'vk',
      'youtube',
    ]),

    /** A button can reduce its padding to fit into tighter spaces. */
    compact: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A button can show it is currently unable to be interacted with. */
    disabled: PropTypes.bool,

    /** A button can be aligned to the left or right of its container. */
    floated: PropTypes.oneOf(SUI.FLOATS),

    /** A button can take the width of its container. */
    fluid: PropTypes.bool,

    /** Add an Icon by name, props object, or pass an <Icon />. */
    icon: customPropTypes.some([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.object,
      PropTypes.element,
    ]),

    /** A button can be formatted to appear on dark backgrounds. */
    inverted: PropTypes.bool,

    /** Add a Label by text, props object, or pass a <Label />. */
    label: customPropTypes.some([PropTypes.string, PropTypes.object, PropTypes.element]),

    /** A labeled button can format a Label or Icon to appear on the left or right. */
    labelPosition: PropTypes.oneOf(['right', 'left']),

    /** A button can show a loading indicator. */
    loading: PropTypes.bool,

    /** A button can hint towards a negative consequence. */
    negative: PropTypes.bool,

    /**
     * Called after user's click.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /** A button can hint towards a positive consequence. */
    positive: PropTypes.bool,

    /** A button can be formatted to show different levels of emphasis. */
    primary: PropTypes.bool,

    /** The role of the HTML element. */
    role: PropTypes.string,

    /** A button can be formatted to show different levels of emphasis. */
    secondary: PropTypes.bool,

    /** A button can have different sizes. */
    size: PropTypes.oneOf(SUI.SIZES),

    /** A button can receive focus. */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** A button can be formatted to toggle on and off. */
    toggle: PropTypes.bool,
  }

  static defaultProps = {
    as: 'button',
  }

  static Content = ButtonContent
  static Group = ButtonGroup
  static Or = ButtonOr

  computeButtonAriaRole(ElementType) {
    const { role } = this.props

    if (!_.isNil(role)) return role
    if (ElementType !== 'button') return 'button'
  }

  computeElementType = () => {
    const { attached, label } = this.props

    if (!_.isNil(attached) || !_.isNil(label)) return 'div'
  }

  computeTabIndex = (ElementType) => {
    const { disabled, tabIndex } = this.props

    if (!_.isNil(tabIndex)) return tabIndex
    if (disabled) return -1
    if (ElementType === 'div') return 0
  }

  focus = () => _.invoke(this.ref, 'focus')

  handleClick = (e) => {
    const { disabled } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    _.invoke(this.props, 'onClick', e, this.props)
  }

  handleRef = c => (this.ref = c)

  hasIconClass = () => {
    const { labelPosition, children, content, icon } = this.props

    if (icon === true) return true
    return icon && (labelPosition || (childrenUtils.isNil(children) && _.isNil(content)))
  }

  render() {
    const {
      active,
      animated,
      attached,
      basic,
      children,
      circular,
      className,
      color,
      compact,
      content,
      disabled,
      floated,
      fluid,
      icon,
      inverted,
      label,
      labelPosition,
      loading,
      negative,
      positive,
      primary,
      secondary,
      size,
      toggle,
    } = this.props

    const baseClasses = cx(
      color,
      size,
      useKeyOnly(active, 'active'),
      useKeyOnly(basic, 'basic'),
      useKeyOnly(circular, 'circular'),
      useKeyOnly(compact, 'compact'),
      useKeyOnly(fluid, 'fluid'),
      useKeyOnly(this.hasIconClass(), 'icon'),
      useKeyOnly(inverted, 'inverted'),
      useKeyOnly(loading, 'loading'),
      useKeyOnly(negative, 'negative'),
      useKeyOnly(positive, 'positive'),
      useKeyOnly(primary, 'primary'),
      useKeyOnly(secondary, 'secondary'),
      useKeyOnly(toggle, 'toggle'),
      useKeyOrValueAndKey(animated, 'animated'),
      useKeyOrValueAndKey(attached, 'attached'),
    )
    const labeledClasses = cx(useKeyOrValueAndKey(labelPosition || !!label, 'labeled'))
    const wrapperClasses = cx(useKeyOnly(disabled, 'disabled'), useValueAndKey(floated, 'floated'))

    const rest = getUnhandledProps(Button, this.props)
    const ElementType = getElementType(Button, this.props, this.computeElementType)
    const tabIndex = this.computeTabIndex(ElementType)

    if (!_.isNil(label)) {
      const buttonClasses = cx('ui', baseClasses, 'button', className)
      const containerClasses = cx('ui', labeledClasses, 'button', className, wrapperClasses)
      const labelElement = Label.create(label, {
        defaultProps: {
          basic: true,
          pointing: labelPosition === 'left' ? 'right' : 'left',
        },
        autoGenerateKey: false,
      })

      return (
        <ElementType {...rest} className={containerClasses} onClick={this.handleClick}>
          {labelPosition === 'left' && labelElement}
          <button
            className={buttonClasses}
            aria-pressed={toggle ? (!!active) : undefined}
            disabled={disabled}
            ref={this.handleRef}
            tabIndex={tabIndex}
          >
            {Icon.create(icon, { autoGenerateKey: false })} {content}
          </button>
          {(labelPosition === 'right' || !labelPosition) && labelElement}
        </ElementType>
      )
    }

    const classes = cx('ui', baseClasses, wrapperClasses, labeledClasses, 'button', className)
    const hasChildren = !childrenUtils.isNil(children)
    const role = this.computeButtonAriaRole(ElementType)

    return (
      <ElementType
        {...rest}
        className={classes}
        aria-pressed={toggle ? (!!active) : undefined}
        disabled={(disabled && ElementType === 'button') || undefined}
        onClick={this.handleClick}
        ref={this.handleRef}
        role={role}
        tabIndex={tabIndex}
      >
        {hasChildren && children}
        {!hasChildren && Icon.create(icon, { autoGenerateKey: false })}
        {!hasChildren && content}
      </ElementType>
    )
  }
}

Button.create = createShorthandFactory(Button, value => ({ content: value }))

export default Button
