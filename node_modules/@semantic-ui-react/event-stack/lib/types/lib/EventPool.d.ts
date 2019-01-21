import EventSet from './EventSet';
import { EventListeners } from '../types';
export default class EventPool {
    private readonly handlerSets;
    private readonly poolName;
    constructor(poolName: string, handlerSets: Map<String, EventSet>);
    static createByType: (poolName: string, eventType: string, eventHandlers: import("../types").CallableEventListener[]) => EventPool;
    addHandlers(eventType: string, eventHandlers: EventListeners): EventPool;
    dispatchEvent(eventType: string, event: Event): void;
    hasHandlers(): boolean;
    removeHandlers(eventType: String, eventHandlers: EventListeners): EventPool;
}
