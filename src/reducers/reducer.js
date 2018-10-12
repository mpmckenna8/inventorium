// root reducer store to go here

import { combineReducers } from 'redux'
import {FETCH_ITEMS_SUCCESS} from '../actions/actions.js'

function User(state={
  items:[],
  collections: [],
  name:"test",
  email:"",
  needsUpdate: true
}, action) {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS: {

      state.items = action.items;
      state.collections = action.collections;
      return Object.assign({}, state)
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  User
})

export default rootReducer;
