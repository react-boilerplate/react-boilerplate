// selectLocationState expects a plain JS object for the routing state
const createSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (routingState.equals(prevRoutingState) === false) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectLocationSelector = createSelectLocationState();

export default selectLocationSelector;
