import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  SUI,
  useKeyOnly,
  useKeyOrValueAndKey,
  useValueAndKey,
  useVerticalAlignProp,
} from '../../lib'
import ListContent from './ListContent'
import ListDescription from './ListDescription'
import ListHeader from './ListHeader'
import ListIcon from './ListIcon'
import ListItem from './ListItem'
import ListList from './ListList'

/**
 * A list groups related content.
 */
class List extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** A list can animate to set the current item apart from the list. */
    animated: PropTypes.bool,

    /** A list can mark items with a bullet. */
    bulleted: PropTypes.bool,

    /** A list can divide its items into cells. */
    celled: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A list can show divisions between content. */
    divided: PropTypes.bool,

    /** An list can be floated left or right. */
    floated: PropTypes.oneOf(SUI.FLOATS),

    /** A list can be formatted to have items appear horizontally. */
    horizontal: PropTypes.bool,

    /** A list can be inverted to appear on a dark background. */
    inverted: PropTypes.bool,

    /** Shorthand array of props for ListItem. */
    items: customPropTypes.collectionShorthand,

    /** A list can be specially formatted for navigation links. */
    link: PropTypes.bool,

    /**
     * onClick handler for ListItem. Mutually exclusive with children.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All item props.
     */
    onItemClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),

    /** A list can be ordered numerically. */
    ordered: PropTypes.bool,

    /** A list can relax its padding to provide more negative space. */
    relaxed: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),

    /** A selection list formats list items as possible choices. */
    selection: PropTypes.bool,

    /** A list can vary in size. */
    size: PropTypes.oneOf(SUI.SIZES),

    /** An element inside a list can be vertically aligned. */
    verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),
  }

  static Content = ListContent
  static Description = ListDescription
  static Header = ListHeader
  static Icon = ListIcon
  static Item = ListItem
  static List = ListList

  handleItemOverrides = predefinedProps => ({
    onClick: (e, itemProps) => {
      _.invoke(predefinedProps, 'onClick', e, itemProps)
      _.invoke(this.props, 'onItemClick', e, itemProps)
    },
  })

  render() {
    const {
      animated,
      bulleted,
      celled,
      children,
      className,
      content,
      divided,
      floated,
      horizontal,
      inverted,
      items,
      link,
      ordered,
      relaxed,
      selection,
      size,
      verticalAlign,
    } = this.props

    const classes = cx(
      'ui',
      size,
      useKeyOnly(animated, 'animated'),
      useKeyOnly(bulleted, 'bulleted'),
      useKeyOnly(celled, 'celled'),
      useKeyOnly(divided, 'divided'),
      useKeyOnly(horizontal, 'horizontal'),
      useKeyOnly(inverted, 'inverted'),
      useKeyOnly(link, 'link'),
      useKeyOnly(ordered, 'ordered'),
      useKeyOnly(selection, 'selection'),
      useKeyOrValueAndKey(relaxed, 'relaxed'),
      useValueAndKey(floated, 'floated'),
      useVerticalAlignProp(verticalAlign),
      'list',
      className,
    )
    const rest = getUnhandledProps(List, this.props)
    const ElementType = getElementType(List, this.props)

    if (!childrenUtils.isNil(children)) {
      return (
        <ElementType role='list' className={classes} {...rest}>
          {children}
        </ElementType>
      )
    }

    if (!childrenUtils.isNil(content)) {
      return (
        <ElementType role='list' className={classes} {...rest}>
          {content}
        </ElementType>
      )
    }

    return (
      <ElementType role='list' className={classes} {...rest}>
        {_.map(items, item => ListItem.create(item, { overrideProps: this.handleItemOverrides }))}
      </ElementType>
    )
  }
}

export default List
