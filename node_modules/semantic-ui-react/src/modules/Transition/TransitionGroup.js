import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { cloneElement } from 'react'

import {
  customPropTypes,
  getChildMapping,
  getElementType,
  getUnhandledProps,
  makeDebugger,
  mergeChildMappings,
  SUI,
} from '../../lib'
import Transition from './Transition'

const debug = makeDebugger('transition_group')

/**
 * A Transition.Group animates children as they mount and unmount.
 */
export default class TransitionGroup extends React.Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Named animation event to used. Must be defined in CSS. */
    animation: PropTypes.oneOf(SUI.TRANSITIONS),

    /** Primary content. */
    children: PropTypes.node,

    /** Duration of the CSS transition animation in milliseconds. */
    duration: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        hide: PropTypes.number.isRequired,
        show: PropTypes.number.isRequired,
      }),
      PropTypes.string,
    ]),
  }

  static defaultProps = {
    animation: 'fade',
    duration: 500,
  }

  constructor(...args) {
    super(...args)

    const { children } = this.props
    this.state = {
      children: _.mapValues(getChildMapping(children), child => this.wrapChild(child)),
    }
  }

  componentWillReceiveProps(nextProps) {
    debug('componentWillReceiveProps()')

    const { children: prevMapping } = this.state
    const nextMapping = getChildMapping(nextProps.children)
    const children = mergeChildMappings(prevMapping, nextMapping)

    _.forEach(children, (child, key) => {
      const hasPrev = _.has(prevMapping, key)
      const hasNext = _.has(nextMapping, key)
      const { [key]: prevChild } = prevMapping
      const isLeaving = !_.get(prevChild, 'props.visible')

      // Heads up!
      // An item is new (entering), it will be picked from `nextChildren`, so it should be wrapped
      if (hasNext && (!hasPrev || isLeaving)) {
        children[key] = this.wrapChild(child, { transitionOnMount: true })
        return
      }

      // Heads up!
      // An item is old (exiting), it will be picked from `prevChildren`, so it has been already
      // wrapped, so should be only updated
      if (!hasNext && hasPrev && !isLeaving) {
        children[key] = cloneElement(prevChild, { visible: false })
        return
      }

      // Heads up!
      // An item item hasn't changed transition states, but it will be picked from `nextChildren`,
      // so we should wrap it again
      const {
        props: { visible, transitionOnMount },
      } = prevChild

      children[key] = this.wrapChild(child, { transitionOnMount, visible })
    })

    this.setState({ children })
  }

  handleOnHide = (nothing, childProps) => {
    debug('handleOnHide', childProps)
    const { reactKey } = childProps

    this.setState((state) => {
      const children = { ...state.children }
      delete children[reactKey]

      return { children }
    })
  }

  wrapChild = (child, options = {}) => {
    const { animation, duration } = this.props
    const { key } = child
    const { visible = true, transitionOnMount = false } = options

    return (
      <Transition
        animation={animation}
        duration={duration}
        key={key}
        onHide={this.handleOnHide}
        reactKey={key}
        transitionOnMount={transitionOnMount}
        visible={visible}
      >
        {child}
      </Transition>
    )
  }

  render() {
    debug('render')
    debug('props', this.props)
    debug('state', this.state)

    const { children } = this.state
    const ElementType = getElementType(TransitionGroup, this.props)
    const rest = getUnhandledProps(TransitionGroup, this.props)

    return <ElementType {...rest}>{_.values(children)}</ElementType>
  }
}
