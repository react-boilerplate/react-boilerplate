import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  SUI,
  useKeyOnly,
} from '../../lib'
import Image from '../../elements/Image'
import CardContent from './CardContent'
import CardDescription from './CardDescription'
import CardGroup from './CardGroup'
import CardHeader from './CardHeader'
import CardMeta from './CardMeta'

/**
 * A card displays site content in a manner similar to a playing card.
 */
export default class Card extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** A Card can center itself inside its container. */
    centered: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A Card can be formatted to display different colors. */
    color: PropTypes.oneOf(SUI.COLORS),

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for CardDescription. */
    description: customPropTypes.itemShorthand,

    /** Shorthand for primary content of CardContent. */
    extra: customPropTypes.contentShorthand,

    /** A Card can be formatted to take up the width of its container. */
    fluid: PropTypes.bool,

    /** Shorthand for CardHeader. */
    header: customPropTypes.itemShorthand,

    /** Render as an `a` tag instead of a `div` and adds the href attribute. */
    href: PropTypes.string,

    /** A card can contain an Image component. */
    image: customPropTypes.itemShorthand,

    /** A card can be formatted to link to other content. */
    link: PropTypes.bool,

    /** Shorthand for CardMeta. */
    meta: customPropTypes.itemShorthand,

    /**
     * Called on click. When passed, the component renders as an `a`
     * tag by default instead of a `div`.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /** A Card can be formatted to raise above the page. */
    raised: PropTypes.bool,
  }

  static Content = CardContent
  static Description = CardDescription
  static Group = CardGroup
  static Header = CardHeader
  static Meta = CardMeta

  handleClick = (e) => {
    const { onClick } = this.props

    if (onClick) onClick(e, this.props)
  }

  render() {
    const {
      centered,
      children,
      className,
      color,
      content,
      description,
      extra,
      fluid,
      header,
      href,
      image,
      link,
      meta,
      onClick,
      raised,
    } = this.props

    const classes = cx(
      'ui',
      color,
      useKeyOnly(centered, 'centered'),
      useKeyOnly(fluid, 'fluid'),
      useKeyOnly(link, 'link'),
      useKeyOnly(raised, 'raised'),
      'card',
      className,
    )
    const rest = getUnhandledProps(Card, this.props)
    const ElementType = getElementType(Card, this.props, () => {
      if (onClick) return 'a'
    })

    if (!childrenUtils.isNil(children)) {
      return (
        <ElementType {...rest} className={classes} href={href} onClick={this.handleClick}>
          {children}
        </ElementType>
      )
    }
    if (!childrenUtils.isNil(content)) {
      return (
        <ElementType {...rest} className={classes} href={href} onClick={this.handleClick}>
          {content}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes} href={href} onClick={this.handleClick}>
        {Image.create(image, { autoGenerateKey: false })}
        {(description || header || meta) && (
          <CardContent description={description} header={header} meta={meta} />
        )}
        {extra && <CardContent extra>{extra}</CardContent>}
      </ElementType>
    )
  }
}
