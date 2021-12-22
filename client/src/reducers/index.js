import { combineReducers } from 'redux';
import auth from './auth';
import movies from './movies';

export const reducers = combineReducers({ movies, auth });