import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'

import { createShorthandFactory, customPropTypes } from '../../lib'
import AccordionTitle from './AccordionTitle'
import AccordionContent from './AccordionContent'

/**
 * A panel sub-component for Accordion component.
 */
class AccordionPanel extends Component {
  static propTypes = {
    /** Whether or not the title is in the open state. */
    active: PropTypes.bool,

    /** A shorthand for Accordion.Content. */
    content: customPropTypes.itemShorthand,

    /** A panel index. */
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Called when a panel title is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All item props.
     */
    onTitleClick: PropTypes.func,

    /** A shorthand for Accordion.Title. */
    title: customPropTypes.itemShorthand,
  }

  handleTitleOverrides = predefinedProps => ({
    onClick: (e, titleProps) => {
      _.invoke(predefinedProps, 'onClick', e, titleProps)
      _.invoke(this.props, 'onTitleClick', e, titleProps)
    },
  })

  render() {
    const { active, content, index, title } = this.props

    return (
      <Fragment>
        {AccordionTitle.create(title, {
          autoGenerateKey: false,
          defaultProps: { active, index },
          overrideProps: this.handleTitleOverrides,
        })}
        {AccordionContent.create(content, {
          autoGenerateKey: false,
          defaultProps: { active },
        })}
      </Fragment>
    )
  }
}

AccordionPanel.create = createShorthandFactory(AccordionPanel, null)

export default AccordionPanel
