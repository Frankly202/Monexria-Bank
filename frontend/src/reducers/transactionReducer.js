const initialState = {
  transactions: [],
  isLoading: false,
  error: null
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TRANSACTIONS_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_TRANSACTIONS_SUCCESS':
      return {
        ...state,
        transactions: action.payload,
        isLoading: false
      };
    case 'FETCH_TRANSACTIONS_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'CREATE_TRANSACTION_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'CREATE_TRANSACTION_SUCCESS':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        isLoading: false
      };
    case 'CREATE_TRANSACTION_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default transactionReducer;