/**
 * The current implementation was chosen by performance and compatibility reasons, feel free to play
 * with benchmarks and submit PR with faster alternative. Each method contains links to benchmarks.
 */
import { EventListeners } from '../types'

export default class EventSet {
  private readonly handlers: EventListeners

  /**
   * @see https://jsperf.com/suir-eventset-constructor
   */
  public constructor(eventHandlers: EventListeners) {
    this.handlers = eventHandlers.slice(0)
  }

  /**
   * @see https://jsperf.com/suir-eventset-addhandlers
   */
  public addHandlers(additionalHandlers: EventListeners): EventSet {
    const newHandlers = this.handlers.slice(0)
    const length = additionalHandlers.length

    // Heads up!
    // Previously we use Set there, it granted uniqueness of handlers, now dispatchEvent() is
    // responsible for this.
    for (let i = 0; i < length; i += 1) {
      newHandlers.push(additionalHandlers[i])
    }

    return new EventSet(newHandlers)
  }

  /**
   * @see https://jsperf.com/suir-eventset-dispatchsingle
   * @see https://jsperf.com/suir-eventset-dispatchmultiple2
   */
  public dispatchEvent(event: Event, dispatchAll: boolean) {
    const count = this.handlers.length - 1

    if (!dispatchAll) {
      // Heads up!
      // We don't use .pop() there because it will mutate the array.
      const recentHandler = this.handlers[count]
      recentHandler(event)

      return
    }

    for (let i = count; i >= 0; i -= 1) {
      if (!this.handlers[i].called) {
        this.handlers[i].called = true
        this.handlers[i](event)
      }
    }

    for (let i = count; i >= 0; i -= 1) {
      this.handlers[i].called = false
    }
  }

  public hasHandlers(): boolean {
    return this.handlers.length > 0
  }

  /**
   * @see https://jsperf.com/suir-eventset-removehandlers
   */
  public removeHandlers(removalHandlers: EventListeners): EventSet {
    const newHandlers = []
    const length = this.handlers.length

    for (let i = 0; i < length; i += 1) {
      const handler = this.handlers[i]

      if (removalHandlers.indexOf(handler) === -1) {
        newHandlers.push(handler)
      }
    }

    return new EventSet(newHandlers)
  }
}
