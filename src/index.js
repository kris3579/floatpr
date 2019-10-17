import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import App from './components/App/App';
import Store from './createStore';

const store = Store();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
