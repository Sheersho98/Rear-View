import { combineReducers } from "redux";
import reviews from './reviews';
import auth from './auth';

export default combineReducers({ reviews, auth });