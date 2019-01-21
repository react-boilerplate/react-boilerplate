import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {
  AutoControlledComponent as Component,
  createPaginationItems,
  customPropTypes,
  getUnhandledProps,
} from '../../lib'
import Menu from '../../collections/Menu'
import PaginationItem from './PaginationItem'

/**
 * A component to render a pagination.
 */
export default class Pagination extends Component {
  static propTypes = {
    /** A pagination item can have an aria label. */
    'aria-label': PropTypes.string,

    /** Initial activePage value. */
    defaultActivePage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Index of the currently active page. */
    activePage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Number of always visible pages at the beginning and end. */
    boundaryRange: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** A shorthand for PaginationItem. */
    ellipsisItem: customPropTypes.itemShorthand,

    /** A shorthand for PaginationItem. */
    firstItem: customPropTypes.itemShorthand,

    /** A shorthand for PaginationItem. */
    lastItem: customPropTypes.itemShorthand,

    /** A shorthand for PaginationItem. */
    nextItem: customPropTypes.itemShorthand,

    /** A shorthand for PaginationItem. */
    pageItem: customPropTypes.itemShorthand,

    /** A shorthand for PaginationItem. */
    prevItem: customPropTypes.itemShorthand,

    /**
     * Called on change of an active page.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onPageChange: PropTypes.func,

    /** Number of always visible pages before and after the current one. */
    siblingRange: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Total number of pages. */
    totalPages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }

  static autoControlledProps = ['activePage']

  static defaultProps = {
    'aria-label': 'Pagination Navigation',
    boundaryRange: 1,
    ellipsisItem: '...',
    firstItem: {
      'aria-label': 'First item',
      content: '«',
    },
    lastItem: {
      'aria-label': 'Last item',
      content: '»',
    },
    nextItem: {
      'aria-label': 'Next item',
      content: '⟩',
    },
    pageItem: {},
    prevItem: {
      'aria-label': 'Previous item',
      content: '⟨',
    },
    siblingRange: 1,
  }

  static Item = PaginationItem

  handleItemClick = (e, { value: nextActivePage }) => {
    const { activePage: prevActivePage } = this.state

    // Heads up! We need the cast to the "number" type there, as `activePage` can be a string
    if (+prevActivePage === +nextActivePage) return

    this.trySetState({ activePage: nextActivePage })
    _.invoke(this.props, 'onPageChange', e, { ...this.props, activePage: nextActivePage })
  }

  handleItemOverrides = (active, type, value) => predefinedProps => ({
    active,
    type,
    key: `${type}-${value}`,
    onClick: (e, itemProps) => {
      _.invoke(predefinedProps, 'onClick', e, itemProps)
      this.handleItemClick(e, itemProps)
    },
  })

  render() {
    const { 'aria-label': ariaLabel, boundaryRange, siblingRange, totalPages } = this.props
    const { activePage } = this.state

    const items = createPaginationItems({ activePage, boundaryRange, siblingRange, totalPages })
    const rest = getUnhandledProps(Pagination, this.props)

    return (
      <Menu {...rest} aria-label={ariaLabel} pagination role='navigation'>
        {_.map(items, ({ active, type, value }) =>
          PaginationItem.create(this.props[type], {
            defaultProps: {
              content: value,
              value,
            },
            overrideProps: this.handleItemOverrides(active, type, value),
          }),
        )}
      </Menu>
    )
  }
}
