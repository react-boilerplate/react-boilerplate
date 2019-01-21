import { Observable } from '../Observable';
import { ColdObservable } from './ColdObservable';
import { HotObservable } from './HotObservable';
import { TestMessage } from './TestMessage';
import { SubscriptionLog } from './SubscriptionLog';
import { VirtualTimeScheduler } from '../scheduler/VirtualTimeScheduler';
export declare type observableToBeFn = (marbles: string, values?: any, errorValue?: any) => void;
export declare type subscriptionLogsToBeFn = (marbles: string | string[]) => void;
export declare class TestScheduler extends VirtualTimeScheduler {
    assertDeepEqual: (actual: any, expected: any) => boolean | void;
    private hotObservables;
    private coldObservables;
    private flushTests;
    constructor(assertDeepEqual: (actual: any, expected: any) => boolean | void);
    createTime(marbles: string): number;
    createColdObservable<T>(marbles: string, values?: any, error?: any): ColdObservable<T>;
    createHotObservable<T>(marbles: string, values?: any, error?: any): HotObservable<T>;
    private materializeInnerObservable(observable, outerFrame);
    expectObservable(observable: Observable<any>, unsubscriptionMarbles?: string): ({
        toBe: observableToBeFn;
    });
    expectSubscriptions(actualSubscriptionLogs: SubscriptionLog[]): ({
        toBe: subscriptionLogsToBeFn;
    });
    flush(): void;
    static parseMarblesAsSubscriptions(marbles: string): SubscriptionLog;
    static parseMarbles(marbles: string, values?: any, errorValue?: any, materializeInnerObservables?: boolean): TestMessage[];
}
