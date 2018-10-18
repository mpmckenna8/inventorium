import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import './index.css';
import './App.css';

import Root from './containers/root.js';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/reducer.js'

import {fetchItemsIfNeeded} from "./actions/actions.js"
import {getDBItemsAndBags} from './actions/item_actions.js'
const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

store.dispatch(fetchItemsIfNeeded('test'))
  .then(function() {
    store.dispatch(getDBItemsAndBags())
    console.log('now to get db stuff')
})

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));

registerServiceWorker();
