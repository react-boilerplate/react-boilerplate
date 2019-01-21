import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
export function catchError(selector) {
    return function catchErrorOperatorFunction(source) {
        const operator = new CatchOperator(selector);
        const caught = source.lift(operator);
        return (operator.caught = caught);
    };
}
class CatchOperator {
    constructor(selector) {
        this.selector = selector;
    }
    call(subscriber, source) {
        return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
    }
}
class CatchSubscriber extends OuterSubscriber {
    constructor(destination, selector, caught) {
        super(destination);
        this.selector = selector;
        this.caught = caught;
    }
    error(err) {
        if (!this.isStopped) {
            let result;
            try {
                result = this.selector(err, this.caught);
            }
            catch (err2) {
                super.error(err2);
                return;
            }
            this._unsubscribeAndRecycle();
            this.add(subscribeToResult(this, result));
        }
    }
}
//# sourceMappingURL=catchError.js.map