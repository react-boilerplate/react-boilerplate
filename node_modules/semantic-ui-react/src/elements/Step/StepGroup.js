import _ from 'lodash'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  numberToWordMap,
  SUI,
  useKeyOnly,
  useKeyOrValueAndKey,
  useValueAndKey,
  useWidthProp,
} from '../../lib'
import Step from './Step'

const numberMap = _.pickBy(numberToWordMap, (val, key) => key <= 8)

/**
 * A set of steps.
 */
function StepGroup(props) {
  const {
    attached,
    children,
    className,
    content,
    fluid,
    items,
    ordered,
    size,
    stackable,
    unstackable,
    vertical,
    widths,
  } = props
  const classes = cx(
    'ui',
    size,
    useKeyOnly(fluid, 'fluid'),
    useKeyOnly(ordered, 'ordered'),
    useKeyOnly(unstackable, 'unstackable'),
    useKeyOnly(vertical, 'vertical'),
    useKeyOrValueAndKey(attached, 'attached'),
    useValueAndKey(stackable, 'stackable'),
    useWidthProp(widths),
    'steps',
    className,
  )
  const rest = getUnhandledProps(StepGroup, props)
  const ElementType = getElementType(StepGroup, props)

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes}>
        {content}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes}>
      {_.map(items, item => Step.create(item))}
    </ElementType>
  )
}

StepGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Steps can be attached to other elements. */
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A fluid step takes up the width of its container. */
  fluid: PropTypes.bool,

  /** Shorthand array of props for Step. */
  items: customPropTypes.collectionShorthand,

  /** A step can show a ordered sequence of steps. */
  ordered: PropTypes.bool,

  /** Steps can have different sizes. */
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),

  /** A step can stack vertically only on smaller screens. */
  stackable: PropTypes.oneOf(['tablet']),

  /** A step can prevent itself from stacking on mobile. */
  unstackable: PropTypes.bool,

  /** A step can be displayed stacked vertically. */
  vertical: PropTypes.bool,

  /** Steps can be divided evenly inside their parent. */
  widths: PropTypes.oneOf([
    ..._.keys(numberMap),
    ..._.keys(numberMap).map(Number),
    ..._.values(numberMap),
  ]),
}

export default StepGroup
