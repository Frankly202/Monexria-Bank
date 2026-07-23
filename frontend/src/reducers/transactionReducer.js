import { requestState, failureState } from '../utils/reducerHelpers';

const initialState = {
  transactions: [],
  isLoading: false,
  error: null
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TRANSACTIONS_REQUEST':
      return requestState(state);
    case 'FETCH_TRANSACTIONS_SUCCESS':
      return {
        ...state,
        transactions: action.payload,
        isLoading: false
      };
    case 'FETCH_TRANSACTIONS_FAILURE':
      return failureState(state, action);
    case 'CREATE_TRANSACTION_REQUEST':
      return requestState(state);
    case 'CREATE_TRANSACTION_SUCCESS':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        isLoading: false
      };
    case 'CREATE_TRANSACTION_FAILURE':
      return failureState(state, action);
    default:
      return state;
  }
};

export default transactionReducer;