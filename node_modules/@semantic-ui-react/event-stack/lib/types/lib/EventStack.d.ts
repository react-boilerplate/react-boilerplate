import { InputEventListener, Options } from '../types';
export default class EventStack {
    private readonly targets;
    sub(eventName: string, eventHandlers: InputEventListener, options?: Options): void;
    unsub(eventName: string, eventHandlers: InputEventListener, options?: Options): void;
    private getTarget;
    private removeTarget;
}
