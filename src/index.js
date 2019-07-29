import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import superagent from 'superagent';

import storeData from './actions/dataActions';
import * as serviceWorker from './serviceWorker';
import App from './components/App/App';
import Store from './createStore';

import './index.css';

const store = Store();

superagent.get('http://localhost:3579/getPlayers')
  .then((response) => {
    console.log(response.body);
    storeData(response.body, 'players');
  })
  .catch((error) => {
    throw error;
  });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
