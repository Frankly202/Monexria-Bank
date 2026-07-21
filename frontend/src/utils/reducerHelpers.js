// Shared reducer state transitions for the async REQUEST / FAILURE pattern
// that every feature reducer repeats. Reducers reuse these instead of
// re-declaring identical `{ ...state, isLoading, error }` objects.

export const requestState = (state) => ({
  ...state,
  isLoading: true,
  error: null
});

export const failureState = (state, action) => ({
  ...state,
  isLoading: false,
  error: action.payload
});
