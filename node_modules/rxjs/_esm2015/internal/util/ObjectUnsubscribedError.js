export class ObjectUnsubscribedError extends Error {
    constructor() {
        super('object unsubscribed');
        this.name = 'ObjectUnsubscribedError';
        Object.setPrototypeOf(this, ObjectUnsubscribedError.prototype);
    }
}
//# sourceMappingURL=ObjectUnsubscribedError.js.map