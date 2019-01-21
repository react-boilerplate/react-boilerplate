/**
 * The current implementation was chosen by performance and compatibility reasons, feel free to play
 * with benchmarks and submit PR with faster alternative. Each method contains links to benchmarks.
 */
import { EventListeners } from '../types';
export default class EventSet {
    private readonly handlers;
    /**
     * @see https://jsperf.com/suir-eventset-constructor
     */
    constructor(eventHandlers: EventListeners);
    /**
     * @see https://jsperf.com/suir-eventset-addhandlers
     */
    addHandlers(additionalHandlers: EventListeners): EventSet;
    /**
     * @see https://jsperf.com/suir-eventset-dispatchsingle
     * @see https://jsperf.com/suir-eventset-dispatchmultiple2
     */
    dispatchEvent(event: Event, dispatchAll: boolean): void;
    hasHandlers(): boolean;
    /**
     * @see https://jsperf.com/suir-eventset-removehandlers
     */
    removeHandlers(removalHandlers: EventListeners): EventSet;
}
