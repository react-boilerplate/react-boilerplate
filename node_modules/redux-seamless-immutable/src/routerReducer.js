import Immutable from 'seamless-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = Immutable({
  locationBeforeTransitions: null
});

export default function routerReducer(state=initialState, { type, payload }) {
  if (type === LOCATION_CHANGE) {
    return state.set('locationBeforeTransitions', payload);
  }
  return state
}