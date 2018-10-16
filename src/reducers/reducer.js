// root reducer store to go here

import { combineReducers } from 'redux'
import {FETCH_ITEMS_SUCCESS} from '../actions/actions.js'

import { EDIT_ITEM } from '../actions/item_actions.js'

function User(state={
  items:[],
  collections: [],
  name:"test",
  email:"test",
  needsUpdate: true
}, action) {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS: {

      state.items = action.items;
      state.collections = action.collections;
      return Object.assign({}, state)
    }
    case EDIT_ITEM: {
      let itemIndex = state.items.findIndex((d) => d.p_id === action.item.p_id)

      state.items[itemIndex] = action.item;

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
