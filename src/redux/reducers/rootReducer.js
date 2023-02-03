import {combineReducers} from 'redux';
import auth from './auth';
import MessageRed from './MessageRed';

const rootReducer = combineReducers({
  auth,
  MessageRed,
});

export default rootReducer;
