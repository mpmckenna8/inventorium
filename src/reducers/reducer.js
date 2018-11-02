// root reducer store to go here

import { combineReducers } from 'redux'
import {FETCH_ITEMS_SUCCESS, SET_CURRENT_COLLECTION, ADD_ITEM_TO_COLLECTION_SUCCESS} from '../actions/actions.js'

import { EDIT_ITEM, RECIEVED_ALL_ITEMS, ADD_NEW_USER_ITEM } from '../actions/item_actions.js'

import {ADD_USER_COLLECTION_SUCCESS, COLLECTION_ADD_SUCCESS, EMPTY_COLLECTION_SUCCESS} from '../actions/collection_actions.js'

function User(state={
  items:[],
  collections: [],
  name:"test",
  email:"test",
  currentCollection:'all',
  needsUpdate: true,
  returnHome: false,
  redirectTo:""
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
      state.returnHome = true;
      return Object.assign({}, state)
    }
    case ADD_NEW_USER_ITEM: {
      state.items.push(action.item)
      state.returnHome = true;
      return Object.assign({}, state)
    }
    case SET_CURRENT_COLLECTION: {
      state.currentCollection = action.onCollection;
      return Object.assign({}, state)

    }
    case ADD_ITEM_TO_COLLECTION_SUCCESS: {
      let collectionIndex = state.collections.findIndex( (collection) => {
        return collection.up_id === parseInt(state.currentCollection, 10)
      } )
      console.log('collectionIndex = ', collectionIndex)
      state.collections[collectionIndex].items.push(action.json.item)
      return Object.assign({}, state)

    }
    case ADD_USER_COLLECTION_SUCCESS: {
      console.log('need to update the user collections', action)

      state.collections.push(action.msg.collectionInfo)
      state.redirectTo = "/usercollection/" + action.msg.collectionInfo.up_id;
      return Object.assign({}, state)

    }

    case COLLECTION_ADD_SUCCESS: {
      state.collections.push(action.newCollection);

      return Object.assign({}, state)
    }
    case EMPTY_COLLECTION_SUCCESS: {
      let onCollection = state.collections.find( d => action.up_id === d.up_id)
      if( action.mode === "setToZero") {

        for( let item of onCollection.items) {
          item.quantity = 0;
        }
      }
      if( action.mode === 'emptyArray' ) {

        onCollection.items = [];
      }
      return Object.assign({}, state)
    }


    default:
      return state;
  }
}

function DB(state={
  items: [],
  collectionTypes:[]
}, action) {

  switch (action.type) {
    case RECIEVED_ALL_ITEMS: {

      state.items = action.items;
      state.collectionTypes = action.collectionTypes;

      return Object.assign({}, state)
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  User, DB
})

export default rootReducer;
