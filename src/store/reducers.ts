import { combineReducers } from 'redux';

import Address from './Address/slice';
import Auth from './Auth/slice';
import Company from './Company/slice';
import User from './User/slice';
import Location from './Location/slice';
import Permission from './Permission/slice';
import Report from './Report/slice';
import Wood from './Wood/slice';

const rootReducer = combineReducers({
  Address,
  Auth,
  Company,
  User,
  Location,
  Permission,
  Report,
  Wood,
});

export default rootReducer;
