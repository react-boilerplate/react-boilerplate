import { EventListeners, TargetElement } from '../types';
export default class EventTarget {
    private readonly handlers;
    private readonly pools;
    private readonly target;
    constructor(target: TargetElement);
    addHandlers(poolName: string, eventType: string, eventHandlers: EventListeners): void;
    hasHandlers(): boolean;
    removeHandlers(poolName: string, eventType: string, eventHandlers: EventListeners): void;
    private createEmitter;
    private addTargetHandler;
    private removeTargetHandler;
}
