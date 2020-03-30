// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: '',
  userData: {
    repos: [],
  },
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function appReducer(state = initialState) {
  return state;
}

export default appReducer;
