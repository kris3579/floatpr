import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import dataReducer from './reducers/dataReducer';

export default () => {
  return createStore(dataReducer, composeWithDevTools());
};
