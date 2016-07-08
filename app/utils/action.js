export default class Action {
  constructor(type) {
    this.type = type;
    this.payload = undefined;
  }
  unapply(action) {
    if (action.type === this.type) {
      return { payload: action.payload };
    }
    return undefined;
  }

  action(payload) {
    return {
      type: this.type,
      payload,
    };
  }
}
