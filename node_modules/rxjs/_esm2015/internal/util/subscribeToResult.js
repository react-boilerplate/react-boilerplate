import { InnerSubscriber } from '../InnerSubscriber';
import { subscribeTo } from './subscribeTo';
export function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    const destination = new InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    return subscribeTo(result)(destination);
}
//# sourceMappingURL=subscribeToResult.js.map