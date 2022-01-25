// ** Redux Imports
import { combineReducers } from 'redux'
import authReducer from './authReducer';
import walletReducer from './walletReducer';

// ** Reducers Imports

const rootReducer = combineReducers({
    auth: authReducer,
    wallet: walletReducer
})

export default rootReducer
