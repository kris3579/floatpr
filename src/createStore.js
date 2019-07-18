import { createStore } from 'redux';
import dataReducer from './reducers/dataReducer';

export default () => {
  return createStore(dataReducer);
};