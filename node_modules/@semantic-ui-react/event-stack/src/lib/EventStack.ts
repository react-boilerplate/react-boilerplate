import * as env from 'exenv'

import EventTarget from './EventTarget'
import { InputEventListener, InputTargetElement, Options, TargetElement } from '../types'
import { normalizeHandlers, normalizeTarget } from './utils'

export default class EventStack {
  private readonly targets: Map<TargetElement, EventTarget> = new Map()

  public sub(eventName: string, eventHandlers: InputEventListener, options: Options = {}) {
    if (!env.canUseDOM) return

    const { target = document, pool = 'default' } = options
    const eventTarget = this.getTarget(target) as EventTarget

    eventTarget.addHandlers(pool, eventName, normalizeHandlers(eventHandlers))
  }

  public unsub(eventName: string, eventHandlers: InputEventListener, options: Options = {}) {
    if (!env.canUseDOM) return

    const { target = document, pool = 'default' } = options
    const eventTarget = this.getTarget(target, false)

    if (eventTarget) {
      eventTarget.removeHandlers(pool, eventName, normalizeHandlers(eventHandlers))
      if (!eventTarget.hasHandlers()) this.removeTarget(target)
    }
  }

  private getTarget = (
    target: InputTargetElement,
    autoCreate: boolean = true,
  ): null | EventTarget => {
    const normalized = normalizeTarget(target)

    if (this.targets.has(normalized)) {
      return this.targets.get(normalized) as EventTarget
    }

    if (!autoCreate) return null

    const eventTarget = new EventTarget(normalized)
    this.targets.set(normalized, eventTarget)

    return eventTarget
  }

  private removeTarget = (target: InputTargetElement) => {
    this.targets.delete(normalizeTarget(target))
  }
}
