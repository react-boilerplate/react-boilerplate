import * as env from 'exenv'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { instance } from './lib/index'
import { InputEventListener, InputTargetElement } from './types'

interface EventStackProps {
  /** An event name on which we will subscribe. */
  name: string
  /** An event handler or array of event handlers. */
  on: InputEventListener
  /** A name of pool. */
  pool?: string
  /** A DOM element on which we will subscribe. */
  target?: InputTargetElement
}

/**
 * This component exposes the EventStack API as public and provides a declarative way to manage it.
 */
export default class EventStack extends React.PureComponent<EventStackProps> {
  static propTypes = {
    /** An event name on which we will subscribe. */
    name: PropTypes.string.isRequired,

    /** An event handler or array of event handlers. */
    on: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]).isRequired,

    /** A name of pool. */
    pool: PropTypes.string,

    /** A DOM element on which we will subscribe. */
    target: PropTypes.oneOfType([
      PropTypes.oneOf(['document', 'window']),
      // Heads up!
      // This condition for SSR safety.
      PropTypes.instanceOf(env.canUseDOM ? HTMLElement : Object),
    ]),
  }

  static defaultProps = {
    pool: 'default',
    target: 'document',
  }

  componentDidMount() {
    this.subscribe(this.props)
  }

  componentDidUpdate(prevProps: EventStackProps) {
    this.unsubscribe(prevProps)
    this.subscribe(this.props)
  }

  componentWillUnmount() {
    this.unsubscribe(this.props)
  }

  subscribe(props: Readonly<EventStackProps>) {
    const { name, on, pool, target } = props

    instance.sub(name, on, { pool, target })
  }

  unsubscribe(props: Readonly<EventStackProps>) {
    const { name, on, pool, target } = props

    instance.unsub(name, on, { pool, target })
  }

  render() {
    return null
  }
}
