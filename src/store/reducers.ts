import { combineReducers } from 'redux';

import Address from './Address/slice';
import Auth from './Auth/slice';
import Permission from './Permission/slice';

const rootReducer = combineReducers({
  Address,
  Auth,
  Permission,
});

export default rootReducer;
