/** PURE_IMPORTS_START _InnerSubscriber,_subscribeTo PURE_IMPORTS_END */
import { InnerSubscriber } from '../InnerSubscriber';
import { subscribeTo } from './subscribeTo';
export function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    return subscribeTo(result)(destination);
}
//# sourceMappingURL=subscribeToResult.js.map
