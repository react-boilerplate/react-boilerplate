import EventSet from './EventSet'
import { cloneMap } from './utils'
import { EventListeners } from '../types'

export default class EventPool {
  private readonly handlerSets: Map<String, EventSet>
  private readonly poolName: string

  public constructor(poolName: string, handlerSets: Map<String, EventSet>) {
    this.handlerSets = handlerSets
    this.poolName = poolName
  }

  public static createByType = (
    poolName: string,
    eventType: string,
    eventHandlers: EventListeners,
  ): EventPool => {
    const handlerSets = new Map()
    handlerSets.set(eventType, new EventSet(eventHandlers))

    return new EventPool(poolName, handlerSets)
  }

  public addHandlers(eventType: string, eventHandlers: EventListeners): EventPool {
    const handlerSets = cloneMap(this.handlerSets)

    if (handlerSets.has(eventType)) {
      const eventSet = handlerSets.get(eventType) as EventSet

      handlerSets.set(eventType, eventSet.addHandlers(eventHandlers))
    } else {
      handlerSets.set(eventType, new EventSet(eventHandlers))
    }

    return new EventPool(this.poolName, handlerSets)
  }

  public dispatchEvent(eventType: string, event: Event) {
    const handlerSet = this.handlerSets.get(eventType)
    const shouldDispatchAll = this.poolName === 'default'

    if (handlerSet) {
      handlerSet.dispatchEvent(event, shouldDispatchAll)
    }
  }

  public hasHandlers(): boolean {
    return this.handlerSets.size > 0
  }

  public removeHandlers(eventType: String, eventHandlers: EventListeners): EventPool {
    const handlerSets = cloneMap(this.handlerSets)

    if (!handlerSets.has(eventType)) {
      return new EventPool(this.poolName, handlerSets)
    }

    const currentSet = handlerSets.get(eventType) as EventSet
    const nextSet = currentSet.removeHandlers(eventHandlers)

    if (nextSet.hasHandlers()) {
      handlerSets.set(eventType, nextSet)
    } else {
      handlerSets.delete(eventType)
    }

    return new EventPool(this.poolName, handlerSets)
  }
}
