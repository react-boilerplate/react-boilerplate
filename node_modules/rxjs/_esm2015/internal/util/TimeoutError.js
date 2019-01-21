export class TimeoutError extends Error {
    constructor() {
        super('Timeout has occurred');
        this.name = 'TimeoutError';
        Object.setPrototypeOf(this, TimeoutError.prototype);
    }
}
//# sourceMappingURL=TimeoutError.js.map