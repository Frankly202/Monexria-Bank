import { requestState, failureState } from '../utils/reducerHelpers';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return requestState(state);
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false
      };
    case 'LOGIN_FAILURE':
      return failureState(state, action);
    case 'LOGOUT':
      return initialState;
    case 'REGISTER_REQUEST':
      return requestState(state);
    case 'REGISTER_SUCCESS':
      return { ...state, isLoading: false, user: action.payload };
    case 'REGISTER_FAILURE':
      return failureState(state, action);
    default:
      return state;
  }
};

export default authReducer;