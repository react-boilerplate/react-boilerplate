// selectLocationState expects a plain JS object for the routing state
const selectLocationSelector = (state) => state.get('route').toJS();

export default selectLocationSelector;
