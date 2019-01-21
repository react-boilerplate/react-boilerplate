export class ArgumentOutOfRangeError extends Error {
    constructor() {
        super('argument out of range');
        this.name = 'ArgumentOutOfRangeError';
        Object.setPrototypeOf(this, ArgumentOutOfRangeError.prototype);
    }
}
//# sourceMappingURL=ArgumentOutOfRangeError.js.map