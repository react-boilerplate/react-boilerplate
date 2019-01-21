export class UnsubscriptionError extends Error {
    constructor(errors) {
        super(errors ?
            `${errors.length} errors occurred during unsubscription:
  ${errors.map((err, i) => `${i + 1}) ${err.toString()}`).join('\n  ')}` : '');
        this.errors = errors;
        this.name = 'UnsubscriptionError';
        Object.setPrototypeOf(this, UnsubscriptionError.prototype);
    }
}
//# sourceMappingURL=UnsubscriptionError.js.map