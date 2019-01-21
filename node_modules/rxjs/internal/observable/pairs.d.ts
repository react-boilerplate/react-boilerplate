import { Observable } from '../Observable';
import { SchedulerAction, SchedulerLike } from '../types';
import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
/**
 * Convert an object into an observable sequence of [key, value] pairs
 * using an optional IScheduler to enumerate the object.
 *
 * ## Example
 * Converts a javascript object to an Observable
 * ```javascript
 * const obj = {
 *   foo: 42,
 *   bar: 56,
 *   baz: 78,
 * };
 *
 * const source = pairs(obj);
 *
 * const subscription = source.subscribe(
 *   x => console.log('Next: %s', x),
 *   err => console.log('Error: %s', err),
 *   () => console.log('Completed'),
 * );
 * ```
 *
 * @param {Object} obj The object to inspect and turn into an
 * Observable sequence.
 * @param {Scheduler} [scheduler] An optional IScheduler to run the
 * enumeration of the input sequence on.
 * @returns {(Observable<[string, T]>)} An observable sequence of
 * [key, value] pairs from the object.
 */
export declare function pairs<T>(obj: Object, scheduler?: SchedulerLike): Observable<[string, T]>;
/** @internal */
export declare function dispatch<T>(this: SchedulerAction<any>, state: {
    keys: string[];
    index: number;
    subscriber: Subscriber<[string, T]>;
    subscription: Subscription;
    obj: Object;
}): void;
