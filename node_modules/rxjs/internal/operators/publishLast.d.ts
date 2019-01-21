import { Observable } from '../Observable';
import { ConnectableObservable } from '../observable/ConnectableObservable';
import { UnaryFunction } from '../types';
export declare function publishLast<T>(): UnaryFunction<Observable<T>, ConnectableObservable<T>>;
