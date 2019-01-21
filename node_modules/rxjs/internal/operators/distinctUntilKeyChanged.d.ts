import { MonoTypeOperatorFunction } from '../types';
export declare function distinctUntilKeyChanged<T>(key: string): MonoTypeOperatorFunction<T>;
export declare function distinctUntilKeyChanged<T, K>(key: string, compare: (x: K, y: K) => boolean): MonoTypeOperatorFunction<T>;
