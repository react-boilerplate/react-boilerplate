// @flow
type EqualityFn = (newValue: mixed, oldValue: mixed, index: number) => boolean;

const simpleIsEqual: EqualityFn = (a: mixed, b: mixed): boolean => a === b;

// <ResultFn: (...Array<any>) => mixed>
// The purpose of this typing is to ensure that the returned memoized
// function has the same type as the provided function (`resultFn`).
// ResultFn:        Generic type (which is the same as the resultFn).
// (...Array<any>): Accepts any length of arguments - and they are not checked
// mixed:           The result can be anything but needs to be checked before usage
export default function <ResultFn: (...Array<any>) => mixed>(resultFn: ResultFn, isEqual?: EqualityFn = simpleIsEqual): ResultFn {
  let lastThis: mixed;
  let lastArgs: Array<mixed> = [];
  let lastResult: mixed;
  let calledOnce: boolean = false;

  const isNewArgEqualToLast = (newArg: mixed, index: number): boolean => isEqual(newArg, lastArgs[index], index);

  // breaking cache when context (this) or arguments change
  const result = function (...newArgs: Array<mixed>) {
    if (calledOnce &&
      lastThis === this &&
      newArgs.length === lastArgs.length &&
      newArgs.every(isNewArgEqualToLast)) {
      return lastResult;
    }

    // Throwing during an assignment aborts the assignment: https://codepen.io/alexreardon/pen/RYKoaz
    // Doing the lastResult assignment first so that if it throws
    // nothing will be overwritten
    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  };

  // telling flow to ignore the type of `result` as we know it is `ResultFn`
  return (result: any);
}