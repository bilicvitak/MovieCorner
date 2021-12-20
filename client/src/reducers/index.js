import { combineReducers } from 'redux';
import authReducers from './auth';

export const reducers = combineReducers({ authReducers });