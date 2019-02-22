import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import './index.css';
import './App.css';
import storageAvailable from "./helpers/storage_available.js";

import Root from './containers/root.js';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/reducer.js'

import {fetchItemsIfNeeded, setUserFromStorage} from "./actions/actions.js"
import {getDBItemsAndBags} from './actions/item_actions.js'
const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  console.log('local storage is available');
  let storedUser = JSON.parse( localStorage.getItem('User'))

  console.log(storedUser)
  if(storedUser.name ) {
    store.dispatch( setUserFromStorage(storedUser))

    store.dispatch( getDBItemsAndBags() )
  }
}
else {
  // Too bad, no localStorage for us
  console.log('no local storage')

  store.dispatch(fetchItemsIfNeeded('test'))
    .then(function() {
      store.dispatch(getDBItemsAndBags())
      console.log('now to get db stuff')
  })
}


ReactDOM.render(<Root store={store}/>, document.getElementById('root'));

registerServiceWorker();
