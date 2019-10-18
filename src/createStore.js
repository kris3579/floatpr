import { createStore } from 'redux';

import mainReducer from './reducers/mainReducer';

export default () => {
  return createStore(mainReducer);
};
