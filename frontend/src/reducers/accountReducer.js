const initialState = {
  accounts: [],
  selectedAccount: null,
  isLoading: false,
  error: null
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ACCOUNTS_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_ACCOUNTS_SUCCESS':
      return {
        ...state,
        accounts: action.payload,
        isLoading: false
      };
    case 'FETCH_ACCOUNTS_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'SELECT_ACCOUNT':
      return {
        ...state,
        selectedAccount: state.accounts.find(acc => acc.id === action.payload)
      };
    case 'CREATE_ACCOUNT_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'CREATE_ACCOUNT_SUCCESS':
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
        isLoading: false
      };
    case 'CREATE_ACCOUNT_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default accountReducer;