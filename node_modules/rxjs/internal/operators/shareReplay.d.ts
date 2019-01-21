import { MonoTypeOperatorFunction, SchedulerLike } from '../types';
/**
 * @method shareReplay
 * @owner Observable
 */
export declare function shareReplay<T>(bufferSize?: number, windowTime?: number, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
