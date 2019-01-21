export as namespace Reselect;

export type Selector<S, R> = (state: S) => R;

export type OutputSelector<S, R, C> = Selector<S, R> & {
  resultFunc: C;
  recomputations: () => number;
  resetRecomputations: () => number;
}

export type ParametricSelector<S, P, R> = (state: S, props: P, ...args: any[]) => R;

export type OutputParametricSelector<S, P, R, C> = ParametricSelector<S, P, R> & {
  resultFunc: C;
  recomputations: () => number;
  resetRecomputations: () => number;
}

/* one selector */
export function createSelector<S, R1, T>(
  selector: Selector<S, R1>,
  combiner: (res: R1) => T,
): OutputSelector<S, T, (res: R1) => T>;
export function createSelector<S, P, R1, T>(
  selector: ParametricSelector<S, P, R1>,
  combiner: (res: R1) => T,
): OutputParametricSelector<S, P, T, (res: R1) => T>;

/* two selectors */
export function createSelector<S, R1, R2, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  combiner: (res1: R1, res2: R2) => T,
): OutputSelector<S, T, (res1: R1, res2: R2) => T>;
export function createSelector<S, P, R1, R2, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  combiner: (res1: R1, res2: R2) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2) => T>;

/* three selectors */
export function createSelector<S, R1, R2, R3, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3) => T>;
export function createSelector<S, P, R1, R2, R3, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3) => T>;

/* four selectors */
export function createSelector<S, R1, R2, R3, R4, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;
export function createSelector<S, P, R1, R2, R3, R4, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;

/* five selectors */
export function createSelector<S, R1, R2, R3, R4, R5, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;

/* six selectors */
export function createSelector<S, R1, R2, R3, R4, R5, R6, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, R6, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  selector6: ParametricSelector<S, P, R6>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;

/* seven selectors */
export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, R6, R7, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  selector6: ParametricSelector<S, P, R6>,
  selector7: ParametricSelector<S, P, R7>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7) => T>;

/* eight selectors */
export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  selector8: Selector<S, R8>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  selector6: ParametricSelector<S, P, R6>,
  selector7: ParametricSelector<S, P, R7>,
  selector8: ParametricSelector<S, P, R8>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8) => T>;

/* nine selectors */
export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  selector8: Selector<S, R8>,
  selector9: Selector<S, R9>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  selector6: ParametricSelector<S, P, R6>,
  selector7: ParametricSelector<S, P, R7>,
  selector8: ParametricSelector<S, P, R8>,
  selector9: ParametricSelector<S, P, R9>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9) => T>;

/* ten selectors */
export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  selector8: Selector<S, R8>,
  selector9: Selector<S, R9>,
  selector10: Selector<S, R10>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  selector6: ParametricSelector<S, P, R6>,
  selector7: ParametricSelector<S, P, R7>,
  selector8: ParametricSelector<S, P, R8>,
  selector9: ParametricSelector<S, P, R9>,
  selector10: ParametricSelector<S, P, R10>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10) => T>;

/* eleven selectors */
export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  selector8: Selector<S, R8>,
  selector9: Selector<S, R9>,
  selector10: Selector<S, R10>,
  selector11: Selector<S, R11>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  selector6: ParametricSelector<S, P, R6>,
  selector7: ParametricSelector<S, P, R7>,
  selector8: ParametricSelector<S, P, R8>,
  selector9: ParametricSelector<S, P, R9>,
  selector10: ParametricSelector<S, P, R10>,
  selector11: ParametricSelector<S, P, R11>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;

/* twelve selectors */
export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  selector8: Selector<S, R8>,
  selector9: Selector<S, R9>,
  selector10: Selector<S, R10>,
  selector11: Selector<S, R11>,
  selector12: Selector<S, R12>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selector1: ParametricSelector<S, P, R1>,
  selector2: ParametricSelector<S, P, R2>,
  selector3: ParametricSelector<S, P, R3>,
  selector4: ParametricSelector<S, P, R4>,
  selector5: ParametricSelector<S, P, R5>,
  selector6: ParametricSelector<S, P, R6>,
  selector7: ParametricSelector<S, P, R7>,
  selector8: ParametricSelector<S, P, R8>,
  selector9: ParametricSelector<S, P, R9>,
  selector10: ParametricSelector<S, P, R10>,
  selector11: ParametricSelector<S, P, R11>,
  selector12: ParametricSelector<S, P, R12>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;


/* array argument */

/* one selector */
export function createSelector<S, R1, T>(
  selectors: [Selector<S, R1>],
  combiner: (res: R1) => T,
): OutputSelector<S, T, (res: R1) => T>;
export function createSelector<S, P, R1, T>(
  selectors: [ParametricSelector<S, P, R1>],
  combiner: (res: R1) => T,
): OutputParametricSelector<S, P, T, (res: R1) => T>;

/* two selectors */
export function createSelector<S, R1, R2, T>(
  selectors: [Selector<S, R1>,
              Selector<S, R2>],
  combiner: (res1: R1, res2: R2) => T,
): OutputSelector<S, T, (res1: R1, res2: R2) => T>;
export function createSelector<S, P, R1, R2, T>(
  selectors: [ParametricSelector<S, P, R1>,
              ParametricSelector<S, P, R2>],
  combiner: (res1: R1, res2: R2) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2) => T>;

/* three selectors */
export function createSelector<S, R1, R2, R3, T>(
  selectors: [Selector<S, R1>,
              Selector<S, R2>,
              Selector<S, R3>],
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3) => T>;
export function createSelector<S, P, R1, R2, R3, T>(
  selectors: [ParametricSelector<S, P, R1>,
              ParametricSelector<S, P, R2>,
              ParametricSelector<S, P, R3>],
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3) => T>;

/* four selectors */
export function createSelector<S, R1, R2, R3, R4, T>(
  selectors: [Selector<S, R1>,
              Selector<S, R2>,
              Selector<S, R3>,
              Selector<S, R4>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;
export function createSelector<S, P, R1, R2, R3, R4, T>(
  selectors: [ParametricSelector<S, P, R1>,
              ParametricSelector<S, P, R2>,
              ParametricSelector<S, P, R3>,
              ParametricSelector<S, P, R4>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4) => T>;

/* five selectors */
export function createSelector<S, R1, R2, R3, R4, R5, T>(
  selectors: [Selector<S, R1>,
              Selector<S, R2>,
              Selector<S, R3>,
              Selector<S, R4>,
              Selector<S, R5>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, T>(
  selectors: [ParametricSelector<S, P, R1>,
              ParametricSelector<S, P, R2>,
              ParametricSelector<S, P, R3>,
              ParametricSelector<S, P, R4>,
              ParametricSelector<S, P, R5>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T>;

/* six selectors */
export function createSelector<S, R1, R2, R3, R4, R5, R6, T>(
  selectors: [Selector<S, R1>,
              Selector<S, R2>,
              Selector<S, R3>,
              Selector<S, R4>,
              Selector<S, R5>,
              Selector<S, R6>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, R6, T>(
  selectors: [ParametricSelector<S, P, R1>,
              ParametricSelector<S, P, R2>,
              ParametricSelector<S, P, R3>,
              ParametricSelector<S, P, R4>,
              ParametricSelector<S, P, R5>,
              ParametricSelector<S, P, R6>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T>;

/* seven selectors */
export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, T>(
  selectors: [Selector<S, R1>,
              Selector<S, R2>,
              Selector<S, R3>,
              Selector<S, R4>,
              Selector<S, R5>,
              Selector<S, R6>,
              Selector<S, R7>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, R6, R7, T>(
  selectors: [ParametricSelector<S, P, R1>,
              ParametricSelector<S, P, R2>,
              ParametricSelector<S, P, R3>,
              ParametricSelector<S, P, R4>,
              ParametricSelector<S, P, R5>,
              ParametricSelector<S, P, R6>,
              ParametricSelector<S, P, R7>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7) => T>;

/* eight selectors */
export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>,
    Selector<S, R3>,
    Selector<S, R4>,
    Selector<S, R5>,
    Selector<S, R6>,
    Selector<S, R7>,
    Selector<S, R8>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>,
    ParametricSelector<S, P, R3>,
    ParametricSelector<S, P, R4>,
    ParametricSelector<S, P, R5>,
    ParametricSelector<S, P, R6>,
    ParametricSelector<S, P, R7>,
    ParametricSelector<S, P, R8>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8) => T>;

/* nine selectors */
export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>,
    Selector<S, R3>,
    Selector<S, R4>,
    Selector<S, R5>,
    Selector<S, R6>,
    Selector<S, R7>,
    Selector<S, R8>,
    Selector<S, R9>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>,
    ParametricSelector<S, P, R3>,
    ParametricSelector<S, P, R4>,
    ParametricSelector<S, P, R5>,
    ParametricSelector<S, P, R6>,
    ParametricSelector<S, P, R7>,
    ParametricSelector<S, P, R8>,
    ParametricSelector<S, P, R9>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9) => T>;

/* ten selectors */
export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>,
    Selector<S, R3>,
    Selector<S, R4>,
    Selector<S, R5>,
    Selector<S, R6>,
    Selector<S, R7>,
    Selector<S, R8>,
    Selector<S, R9>,
    Selector<S, R10>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>,
    ParametricSelector<S, P, R3>,
    ParametricSelector<S, P, R4>,
    ParametricSelector<S, P, R5>,
    ParametricSelector<S, P, R6>,
    ParametricSelector<S, P, R7>,
    ParametricSelector<S, P, R8>,
    ParametricSelector<S, P, R9>,
    ParametricSelector<S, P, R10>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10) => T>;

/* eleven selectors */
export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>,
    Selector<S, R3>,
    Selector<S, R4>,
    Selector<S, R5>,
    Selector<S, R6>,
    Selector<S, R7>,
    Selector<S, R8>,
    Selector<S, R9>,
    Selector<S, R10>,
    Selector<S, R11>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>,
    ParametricSelector<S, P, R3>,
    ParametricSelector<S, P, R4>,
    ParametricSelector<S, P, R5>,
    ParametricSelector<S, P, R6>,
    ParametricSelector<S, P, R7>,
    ParametricSelector<S, P, R8>,
    ParametricSelector<S, P, R9>,
    ParametricSelector<S, P, R10>,
    ParametricSelector<S, P, R11>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11) => T>;

/* twelve selectors */
export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selectors: [Selector<S, R1>,
    Selector<S, R2>,
    Selector<S, R3>,
    Selector<S, R4>,
    Selector<S, R5>,
    Selector<S, R6>,
    Selector<S, R7>,
    Selector<S, R8>,
    Selector<S, R9>,
    Selector<S, R10>,
    Selector<S, R11>,
    Selector<S, R12>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputSelector<S, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;
export function createSelector<S, P, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, T>(
  selectors: [ParametricSelector<S, P, R1>,
    ParametricSelector<S, P, R2>,
    ParametricSelector<S, P, R3>,
    ParametricSelector<S, P, R4>,
    ParametricSelector<S, P, R5>,
    ParametricSelector<S, P, R6>,
    ParametricSelector<S, P, R7>,
    ParametricSelector<S, P, R8>,
    ParametricSelector<S, P, R9>,
    ParametricSelector<S, P, R10>,
    ParametricSelector<S, P, R11>,
    ParametricSelector<S, P, R12>],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T,
): OutputParametricSelector<S, P, T, (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6,
            res7: R7, res8: R8, res9: R9, res10: R10, res11: R11, res12: R12) => T>;


export function defaultMemoize<F extends Function>(
  func: F, equalityCheck?: <T>(a: T, b: T, index: number) => boolean,
): F;

export function createSelectorCreator(
  memoize: <F extends Function>(func: F) => F,
): typeof createSelector;

export function createSelectorCreator<O1>(
  memoize: <F extends Function>(func: F,
                                option1: O1) => F,
  option1: O1,
): typeof createSelector;

export function createSelectorCreator<O1, O2>(
  memoize: <F extends Function>(func: F,
                                option1: O1,
                                option2: O2) => F,
  option1: O1,
  option2: O2,
): typeof createSelector;

export function createSelectorCreator<O1, O2, O3>(
  memoize: <F extends Function>(func: F,
                                option1: O1,
                                option2: O2,
                                option3: O3,
                                ...rest: any[]) => F,
  option1: O1,
  option2: O2,
  option3: O3,
  ...rest: any[],
): typeof createSelector;

export function createStructuredSelector<S, T>(
  selectors: {[K in keyof T]: Selector<S, T[K]>},
  selectorCreator?: typeof createSelector,
): Selector<S, T>;

export function createStructuredSelector<S, P, T>(
  selectors: {[K in keyof T]: ParametricSelector<S, P, T[K]>},
  selectorCreator?: typeof createSelector,
): ParametricSelector<S, P, T>;
