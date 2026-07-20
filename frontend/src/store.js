import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import accountReducer from './reducers/accountReducer';
import transactionReducer from './reducers/transactionReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  accounts: accountReducer,
  transactions: transactionReducer
});

const store = createStore(rootReducer);

export default store;