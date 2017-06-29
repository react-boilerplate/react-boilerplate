import { equals } from 'ramda';

const makeSelectLocationState = () => {
  let prevRoutingState;

  return (state) => {
    const routingState = state.route;

    if (!equals(routingState, prevRoutingState)) {
      prevRoutingState = routingState;
    }

    return prevRoutingState;
  };
};

export { makeSelectLocationState };
