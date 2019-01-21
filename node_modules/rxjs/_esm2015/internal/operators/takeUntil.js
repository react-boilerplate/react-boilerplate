import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
export function takeUntil(notifier) {
    return (source) => source.lift(new TakeUntilOperator(notifier));
}
class TakeUntilOperator {
    constructor(notifier) {
        this.notifier = notifier;
    }
    call(subscriber, source) {
        const takeUntilSubscriber = new TakeUntilSubscriber(subscriber);
        const notifierSubscription = subscribeToResult(takeUntilSubscriber, this.notifier);
        if (notifierSubscription && !notifierSubscription.closed) {
            takeUntilSubscriber.add(notifierSubscription);
            return source.subscribe(takeUntilSubscriber);
        }
        return takeUntilSubscriber;
    }
}
class TakeUntilSubscriber extends OuterSubscriber {
    constructor(destination) {
        super(destination);
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.complete();
    }
    notifyComplete() {
    }
}
//# sourceMappingURL=takeUntil.js.map