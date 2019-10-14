import { combineReducers } from 'redux';
import data from './dataReducer';
import head2HeadData from './head2HeadReducer';

const mainReducer = combineReducers({ data, head2HeadData });
export default mainReducer;
