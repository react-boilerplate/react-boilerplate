import {Action} from "redux";
import {END, Channel, Task, Buffer, Predicate} from "./index";

type ActionType = string | number | symbol;

type StringableActionCreator<A extends Action> = {
  (...args: any[]): A;
  toString(): string;
};

type SubPattern =
  ActionType |
  Predicate<Action> |
  StringableActionCreator<Action>;

export type Pattern =
  SubPattern |
  SubPattern[];


export interface TakeEffectDescriptor {
  pattern: Pattern;
  maybe?: boolean;
}

export interface ChannelTakeEffectDescriptor<T> {
  channel: Channel<T>;
  maybe?: boolean;
}

export interface TakeEffect {
  TAKE: TakeEffectDescriptor;
}

export interface ChannelTakeEffect<T> {
  TAKE: ChannelTakeEffectDescriptor<T>;
}

export interface Take {
  <A extends Action>(pattern?: Pattern): TakeEffect;
  <T>(channel: Channel<T>): ChannelTakeEffect<T>;

  maybe<A extends Action>(pattern?: Pattern): TakeEffect;
  maybe<T>(channel: Channel<T>): ChannelTakeEffect<T>;
}

export const take: Take;

/**
 * @deprecated
 */
export const takem: typeof take.maybe;


export interface PutEffectDescriptor<A extends Action> {
  action: A;
  channel: null;
  resolve?: boolean;
}

export interface ChannelPutEffectDescriptor<T> {
  action: T;
  channel: Channel<T>;
  resolve?: boolean;
}

export interface PutEffect<A extends Action> {
  PUT: PutEffectDescriptor<A>;
}

export interface ChannelPutEffect<T> {
  PUT: ChannelPutEffectDescriptor<T>;
}

export interface Put {
  <A extends Action>(action: A): PutEffect<A>;
  <T>(channel: Channel<T>, action: T | END): ChannelPutEffect<T | END>;

  resolve<A extends Action>(action: A): PutEffect<A>;
  resolve<T>(channel: Channel<T>, action: T | END): ChannelPutEffect<T | END>;

  /**
   * @deprecated
   */
  sync<A extends Action>(action: A): PutEffect<A>;
  /**
   * @deprecated
   */
  sync<T>(channel: Channel<T>, action: T | END): ChannelPutEffect<T | END>;
}

export const put: Put;


export type GenericAllEffectDescriptor<T> = T[] | {[key: string]: T};

export interface GenericAllEffect<T> {
  ALL: GenericAllEffectDescriptor<T>;
}

export type AllEffectDescriptor = GenericAllEffectDescriptor<Effect>;

export interface AllEffect {
  ALL: AllEffectDescriptor;
}

export function all(effects: Effect[]): AllEffect;
export function all(effects: {[key: string]: Effect}): AllEffect;

export function all<T>(effects: T[]): GenericAllEffect<T>;
export function all<T>(effects: {[key: string]: T}): GenericAllEffect<T>;


export type GenericRaceEffectDescriptor<T> = {[key: string]: T};

export interface GenericRaceEffect<T> {
  RACE: GenericRaceEffectDescriptor<T>;
}

export type RaceEffectDescriptor = GenericRaceEffectDescriptor<Effect>;

export interface RaceEffect {
  RACE: RaceEffectDescriptor;
}

export function race(effects: {[key: string]: Effect}): RaceEffect;

export function race<T>(effects: {[key: string]: T}): GenericRaceEffect<T>;


export interface CallEffectDescriptor {
  context: any;
  fn: Function;
  args: any[];
}

export interface CallEffect {
  CALL: CallEffectDescriptor;
}

type Func0 = () => any;
type Func1<T1> = (arg1: T1) => any;
type Func2<T1, T2> = (arg1: T1, arg2: T2) => any;
type Func3<T1, T2, T3> = (arg1: T1, arg2: T2, arg3: T3) => any;
type Func4<T1, T2, T3, T4> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => any;
type Func5<T1, T2, T3, T4, T5> = (arg1: T1, arg2: T2, arg3: T3,
                                  arg4: T4, arg5: T5) => any;
type Func6Rest<T1, T2, T3, T4, T5, T6> = (arg1: T1, arg2: T2, arg3: T3,
                                          arg4: T4, arg5: T5, arg6: T6,
                                          ...rest: any[]) => any;

export type CallEffectFn<F extends Function> =
  F | [any, F] | {context: any, fn: F};

export type CallEffectNamedFn<C extends {[P in Name]: Function},
                              Name extends string> =
  [C, Name] | {context: C, fn: Name};


interface CallEffectFactory<R> {
  (fn: CallEffectFn<Func0>): R;
  <T1>(fn: CallEffectFn<Func1<T1>>,
       arg1: T1): R;
  <T1, T2>(fn: CallEffectFn<Func2<T1, T2>>,
           arg1: T1, arg2: T2): R;
  <T1, T2, T3>(fn: CallEffectFn<Func3<T1, T2, T3>>,
               arg1: T1, arg2: T2, arg3: T3): R;
  <T1, T2, T3, T4>(fn: CallEffectFn<Func4<T1, T2, T3, T4>>,
                   arg1: T1, arg2: T2, arg3: T3, arg4: T4): R;
  <T1, T2, T3, T4, T5>(fn: CallEffectFn<Func5<T1, T2, T3, T4, T5>>,
                       arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): R;
  <T1, T2, T3, T4, T5, T6>(fn: CallEffectFn<Func6Rest<T1, T2, T3, T4, T5, T6>>,
                           arg1: T1, arg2: T2, arg3: T3,
                           arg4: T4, arg5: T5, arg6: T6, ...rest: any[]): R;

  <C extends {[P in N]: Func0}, N extends string>(
    fn: CallEffectNamedFn<C, N>): R;
  <C extends {[P in N]: Func1<T1>}, N extends string,  T1>(
    fn: CallEffectNamedFn<C, N>,
    arg1: T1): R;
  <C extends {[P in N]: Func2<T1, T2>}, N extends string, T1, T2>(
    fn: CallEffectNamedFn<C, N>,
    arg1: T1, arg2: T2): R;
  <C extends {[P in N]: Func3<T1, T2, T3>}, N extends string,
   T1, T2, T3>(
    fn: CallEffectNamedFn<C, N>,
    arg1: T1, arg2: T2, arg3: T3): R;
  <C extends {[P in N]: Func4<T1, T2, T3, T4>}, N extends string,
   T1, T2, T3, T4>(
    fn: CallEffectNamedFn<C, N>,
    arg1: T1, arg2: T2, arg3: T3, arg4: T4): R;
  <C extends {[P in N]: Func5<T1, T2, T3, T4, T5>}, N extends string,
   T1, T2, T3, T4, T5>(
    fn: CallEffectNamedFn<C, N>,
    arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): R;
  <C extends {[P in N]: Func6Rest<T1, T2, T3, T4, T5, T6>}, N extends string,
   T1, T2, T3, T4, T5, T6>(
    fn: CallEffectNamedFn<C, N>,
    arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6,
    ...rest: any[]): R;
}

export const call: CallEffectFactory<CallEffect>;

export function apply(context: any, fn: Func0): CallEffect;
export function apply<T1>(context: any, fn: Func1<T1>,
                          args: [T1]): CallEffect;
export function apply<T1, T2>(context: any, fn: Func2<T1, T2>,
                              args: [T1, T2]): CallEffect;
export function apply<T1, T2, T3>(context: any, fn: Func3<T1, T2, T3>,
                                  args: [T1, T2, T3]): CallEffect;
export function apply<T1, T2, T3, T4>(context: any,
                                      fn: Func4<T1, T2, T3, T4>,
                                      args: [T1, T2, T3, T4]): CallEffect;
export function apply<T1, T2, T3, T4, T5>(
  context: any, fn: Func5<T1, T2, T3, T4, T5>, args: [T1, T2, T3, T4, T5],
): CallEffect;
export function apply<T1, T2, T3, T4, T5, T6, AA extends any[] & {
  0: T1; 1: T2; 2: T3; 3: T4; 4: T5; 5: T6;
}>(
  context: any, fn: Func6Rest<T1, T2, T3, T4, T5, T6>, args: AA,
): CallEffect;

export function apply<C extends {[P in N]: Func0},
                      N extends string>(
  context: C, fn: N): CallEffect;
export function apply<C extends {[P in N]: Func1<T1>},
                      N extends string,
                      T1>(
  context: C, fn: N,
  args: [T1]): CallEffect;
export function apply<C extends {[P in N]: Func2<T1, T2>},
                      N extends string,
                      T1, T2>(
  context: C, fn: N,
  args: [T1, T2]): CallEffect;
export function apply<C extends {[P in N]: Func3<T1, T2, T3>},
                      N extends string,
                      T1, T2, T3>(
  context: C, fn: N,
  args: [T1, T2, T3]): CallEffect;
export function apply<C extends {[P in N]: Func4<T1, T2, T3, T4>},
                      N extends string,
                      T1, T2, T3, T4>(
  context: C, fn: N,
  args: [T1, T2, T3, T4]): CallEffect;
export function apply<C extends {[P in N]: Func5<T1, T2, T3, T4, T5>},
                      N extends string,
                      T1, T2, T3, T4, T5>(
  context: C, fn: N,
  args: [T1, T2, T3, T4, T5]): CallEffect;
export function apply<C extends {[P in N]: Func6Rest<T1, T2, T3, T4, T5, T6>},
                      N extends string,
                      T1, T2, T3, T4, T5, T6, AA extends any[] & {
  0: T1; 1: T2; 2: T3; 3: T4; 4: T5; 5: T6;
}>(
  context: C, fn: N,
  args: AA): CallEffect;



export interface CpsEffect {
  CPS: CallEffectDescriptor;
}

type CpsCallback = {
  (error: any, result: any): void;
  cancel?(): void;
};

export function cps(fn: CallEffectFn<Func1<CpsCallback>>): CpsEffect;
export function cps<T1>(fn: CallEffectFn<Func2<T1, CpsCallback>>,
                        arg1: T1): CpsEffect;
export function cps<T1, T2>(fn: CallEffectFn<Func3<T1, T2, CpsCallback>>,
                            arg1: T1, arg2: T2): CpsEffect;
export function cps<T1, T2, T3>(
  fn: CallEffectFn<Func4<T1, T2, T3, CpsCallback>>,
  arg1: T1, arg2: T2, arg3: T3): CpsEffect;
export function cps<T1, T2, T3, T4>(
  fn: CallEffectFn<Func5<T1, T2, T3, T4, CpsCallback>>,
  arg1: T1, arg2: T2, arg3: T3, arg4: T4): CpsEffect;
export function cps<T1, T2, T3, T4, T5>(
  fn: CallEffectFn<Func6Rest<T1, T2, T3, T4, T5, any>>,
  arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5,
  ...rest: any[]): CpsEffect;

export function cps<C extends {[P in N]: Func1<CpsCallback>},
                    N extends string>(
  fn: CallEffectNamedFn<C, N>): CpsEffect;
export function cps<C extends {[P in N]: Func2<T1, CpsCallback>},
                    N extends string,
                    T1>(
  fn: CallEffectNamedFn<C, N>,
  arg1: T1): CpsEffect;
export function cps<C extends {[P in N]: Func3<T1, T2, CpsCallback>},
                    N extends string,
                    T1, T2>(
  fn: CallEffectNamedFn<C, N>,
  arg1: T1, arg2: T2): CpsEffect;
export function cps<C extends {[P in N]: Func4<T1, T2, T3, CpsCallback>},
                    N extends string,
                    T1, T2, T3>(
  fn: CallEffectNamedFn<C, N>,
  arg1: T1, arg2: T2, arg3: T3): CpsEffect;
export function cps<C extends {[P in N]: Func5<T1, T2, T3, T4, CpsCallback>},
                    N extends string,
                    T1, T2, T3, T4>(
  fn: CallEffectNamedFn<C, N>,
  arg1: T1, arg2: T2, arg3: T3, arg4: T4): CpsEffect;
export function cps<C extends {[P in N]:
                                  Func6Rest<T1, T2, T3, T4, T5, CpsCallback>},
                    N extends string,
                    T1, T2, T3, T4, T5>(
  fn: CallEffectNamedFn<C, N>,
  arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, ...rest: any[]): CpsEffect;


export interface ForkEffectDescriptor extends CallEffectDescriptor {
  detached?: boolean;
}

export interface ForkEffect {
  FORK: ForkEffectDescriptor;
}

export const fork: CallEffectFactory<ForkEffect>;
export const spawn: CallEffectFactory<ForkEffect>;


export type JoinEffectDescriptor = Task;

export interface JoinEffect {
  JOIN: JoinEffectDescriptor;
}

export function join(task: Task): JoinEffect;
export function join(task1: Task, task2: Task,
                     ...tasks: Task[]): JoinEffect[];


type SELF_CANCELLATION = '@@redux-saga/SELF_CANCELLATION';
export type CancelEffectDescriptor = Task | SELF_CANCELLATION;

export interface CancelEffect {
  CANCEL: CancelEffectDescriptor;
}

export function cancel(): CancelEffect;
export function cancel(task: Task): CancelEffect;
export function cancel(...tasks: Task[]): CancelEffect[];


export interface SelectEffectDescriptor {
  selector(state: any, ...args: any[]): any;
  args: any[];
}

export interface SelectEffect {
  SELECT: SelectEffectDescriptor;
}

export function select(): SelectEffect;
export function select<S>(selector: Func1<S>): SelectEffect;
export function select<S, T1>(selector: Func2<S, T1>,
                              arg1: T1): SelectEffect;
export function select<S, T1, T2>(selector: Func3<S, T1, T2>,
                                  arg1: T1, arg2: T2): SelectEffect;
export function select<S, T1, T2, T3>(
  selector: Func4<S, T1, T2, T3>,
  arg1: T1, arg2: T2, arg3: T3): SelectEffect;
export function select<S, T1, T2, T3, T4>(
  selector: Func5<S, T1, T2, T3, T4>,
  arg1: T1, arg2: T2, arg3: T3, arg4: T4): SelectEffect;
export function select<S, T1, T2, T3, T4, T5>(
  selector: Func6Rest<S, T1, T2, T3, T4, T5>,
  arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5,
  ...rest: any[]): SelectEffect;


export interface ActionChannelEffectDescriptor {
  pattern: Pattern;
  buffer?: Buffer<Action>;
}

export interface ActionChannelEffect {
  ACTION_CHANNEL: ActionChannelEffectDescriptor;
}

export function actionChannel(
  pattern: Pattern, buffer?: Buffer<Action>,
): ActionChannelEffect;


export type CancelledEffectDescriptor = {};

export interface CancelledEffect {
  CANCELLED: CancelledEffectDescriptor;
}

export function cancelled(): CancelledEffect;


export type FlushEffectDescriptor<T> = Channel<T>;

export interface FlushEffect<T> {
  FLUSH: FlushEffectDescriptor<T>;
}

export function flush<T>(channel: Channel<T>): FlushEffect<T>;


export type GetContextEffectDescriptor = string;

export interface GetContextEffect {
  GET_CONTEXT: GetContextEffectDescriptor;
}

export function getContext(prop: string): GetContextEffect;


export type SetContextEffectDescriptor<C extends object> = C;

export interface SetContextEffect<C extends object> {
  SET_CONTEXT: SetContextEffectDescriptor<C>;
}

export function setContext<C extends object>(props: C): SetContextEffect<C>;


export interface RootEffect {
  root: true;
  saga(...args: any[]): Iterator<any>;
  args: any[];
}


export type Effect =
  RootEffect |
  TakeEffect | ChannelTakeEffect<any> |
  PutEffect<any> | ChannelPutEffect<any> |
  AllEffect | RaceEffect | CallEffect |
  CpsEffect | ForkEffect | JoinEffect | CancelEffect | SelectEffect |
  ActionChannelEffect | CancelledEffect | FlushEffect<any> |
  GetContextEffect | SetContextEffect<any>;


type HelperFunc0<A> = (action: A) => any;
type HelperFunc1<A, T1> = (arg1: T1, action: A) => any;
type HelperFunc2<A, T1, T2> = (arg1: T1, arg2: T2, action: A) => any;
type HelperFunc3<A, T1, T2, T3> = (arg1: T1, arg2: T2, arg3: T3,
                                   action: A) => any;
type HelperFunc4<A, T1, T2, T3, T4> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4,
                                       action: A) => any;
type HelperFunc5<A, T1, T2, T3, T4, T5> = (arg1: T1, arg2: T2, arg3: T3,
                                           arg4: T4, arg5: T5,
                                           action: A) => any;
type HelperFunc6Rest<A, T1, T2, T3, T4, T5, T6> = (
  arg1: T1, arg2: T2, arg3: T3,
  arg4: T4, arg5: T5, arg6: T6,
  arg7: any, ...rest: any[]) => any;


export function takeEvery<A extends Action>(
  pattern: Pattern,
  worker: HelperFunc0<A>): ForkEffect;
export function takeEvery<A, T1>(
  pattern: Pattern,
  worker: HelperFunc1<A, T1>,
  arg1: T1): ForkEffect;
export function takeEvery<A, T1, T2>(
  pattern: Pattern,
  worker: HelperFunc2<A, T1, T2>,
  arg1: T1, arg2: T2): ForkEffect;
export function takeEvery<A, T1, T2, T3>(
  pattern: Pattern,
  worker: HelperFunc3<A, T1, T2, T3>,
  arg1: T1, arg2: T2, arg3: T3): ForkEffect;
export function takeEvery<A, T1, T2, T3, T4>(
  pattern: Pattern,
  worker: HelperFunc4<A, T1, T2, T3, T4>,
  arg1: T1, arg2: T2, arg3: T3, arg4: T4): ForkEffect;
export function takeEvery<A, T1, T2, T3, T4, T5>(
  pattern: Pattern,
  worker: HelperFunc5<A, T1, T2, T3, T4, T5>,
  arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): ForkEffect;
export function takeEvery<A, T1, T2, T3, T4, T5, T6>(
  pattern: Pattern,
  worker: HelperFunc6Rest<A, T1, T2, T3, T4, T5, T6>,
  arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6,
  ...rest: any[]): ForkEffect;
export function takeEvery<T>(
  channel: Channel<T>,
  worker: HelperFunc0<T>): ForkEffect;
export function takeEvery<T, T1>(
  channel: Channel<T>,
  worker: HelperFunc1<T, T1>,
  arg1: T1): ForkEffect;
export function takeEvery<T, T1, T2>(
  channel: Channel<T>,
  worker: HelperFunc2<T, T1, T2>,
  arg1: T1, arg2: T2): ForkEffect;
export function takeEvery<T, T1, T2, T3>(
  channel: Channel<T>,
  worker: HelperFunc3<T, T1, T2, T3>,
  arg1: T1, arg2: T2, arg3: T3): ForkEffect;
export function takeEvery<T, T1, T2, T3, T4>(
  channel: Channel<T>,
  worker: HelperFunc4<T, T1, T2, T3, T4>,
  arg1: T1, arg2: T2, arg3: T3, arg4: T4): ForkEffect;
export function takeEvery<T, T1, T2, T3, T4, T5>(
  channel: Channel<T>,
  worker: HelperFunc5<T, T1, T2, T3, T4, T5>,
  arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): ForkEffect;
export function takeEvery<T, T1, T2, T3, T4, T5, T6>(
  channel: Channel<T>,
  worker: HelperFunc6Rest<T, T1, T2, T3, T4, T5, T6>,
  arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6,
  ...rest: any[]): ForkEffect;


export const takeLatest: typeof takeEvery;


export function throttle<A extends Action>(
  ms: number, pattern: Pattern,
  worker: HelperFunc0<A>): ForkEffect;
export function throttle<A extends Action, T1>(
  ms: number, pattern: Pattern,
  worker: HelperFunc1<A, T1>,
  arg1: T1): ForkEffect;
export function throttle<A extends Action, T1, T2>(
  ms: number, pattern: Pattern,
  worker: HelperFunc2<A, T1, T2>,
  arg1: T1, arg2: T2): ForkEffect;
export function throttle<A extends Action, T1, T2, T3>(
  ms: number, pattern: Pattern,
  worker: HelperFunc3<A, T1, T2, T3>,
  arg1: T1, arg2: T2, arg3: T3): ForkEffect;
export function throttle<A extends Action, T1, T2, T3, T4>(
  ms: number, pattern: Pattern,
  worker: HelperFunc4<A, T1, T2, T3, T4>,
  arg1: T1, arg2: T2, arg3: T3, arg4: T4): ForkEffect;
export function throttle<A extends Action, T1, T2, T3, T4, T5>(
  ms: number, pattern: Pattern,
  worker: HelperFunc5<A, T1, T2, T3, T4, T5>,
  arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): ForkEffect;
export function throttle<A extends Action, T1, T2, T3, T4, T5, T6>(
  ms: number, pattern: Pattern,
  worker: HelperFunc6Rest<A, T1, T2, T3, T4, T5, T6>,
  arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6,
  ...rest: any[]): ForkEffect;
