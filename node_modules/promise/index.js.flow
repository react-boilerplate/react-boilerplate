// @flow

declare class ThenPromise<+R> extends Promise<R> {
  constructor(callback: (
    resolve: (result: Promise<R> | R) => void,
    reject:  (error: any) => void
  ) => mixed): void;

  then<U>(
    onFulfill?: (value: R) => Promise<U> | U,
    onReject?: (error: any) => Promise<U> | U
  ): ThenPromise<U>;

  catch<U>(
    onReject?: (error: any) => Promise<U> | U
  ): ThenPromise<R | U>;

  // Extensions specific to then/promise

  /**
   * Attaches callbacks for the resolution and/or rejection of the ThenPromise, without returning a new promise.
   * @param onfulfilled The callback to execute when the ThenPromise is resolved.
   * @param onrejected The callback to execute when the ThenPromise is rejected.
   */
  done(onfulfilled?: (value: R) => any, onrejected?: (reason: any) => any): void;


  /**
   * Calls a node.js style callback.  If none is provided, the promise is returned.
   */
  nodeify(callback: void | null): ThenPromise<R>;
  nodeify(callback: (err: Error, value: R) => void): void;

  static resolve<T>(object: Promise<T> | T): ThenPromise<T>;
  static reject<T>(error?: any): ThenPromise<T>;
  static all<Elem, T:Iterable<Elem>>(promises: T): ThenPromise<$TupleMap<T, typeof $await>>;
  static race<T, Elem: Promise<T> | T>(promises: Array<Elem>): ThenPromise<T>;

  // Extensions specific to then/promise

  static denodeify(fn: Function): (...args: any[]) => ThenPromise<any>;
  static nodeify(fn: Function): Function;
}
module.exports = ThenPromise;
