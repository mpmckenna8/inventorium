// root reducer store to go here

import { combineReducers } from 'redux'
import {FETCH_ITEMS_SUCCESS, SET_CURRENT_COLLECTION, ADD_ITEM_TO_COLLECTION_SUCCESS, SET_RETURN_HOME, FILTER_COLLECTION, SET_STOCK_FILTER} from '../actions/actions.js'

import { EDIT_ITEM, RECIEVED_ALL_ITEMS, ADD_NEW_USER_ITEM, USER_ITEM_DELETED } from '../actions/item_actions.js'

import {ADD_USER_COLLECTION_SUCCESS, COLLECTION_ADD_SUCCESS, EMPTY_COLLECTION_SUCCESS} from '../actions/collection_actions.js'

function User(state={
  u_id: 1,
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
    case SET_RETURN_HOME: {
      state.returnHome = action.value;
      return Object.assign({}, state);
    }
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

      let newItem = action.item;
      state.items.push(newItem)
      state.returnHome = true;
      return Object.assign({}, state)
    }
    case SET_CURRENT_COLLECTION: {
      console.log('setting collection,', action.onCollection, action)
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
    case USER_ITEM_DELETED: {
      console.log('action in user item delete', action)
      state.items = state.items.filter( (d) => {
        return d.p_id !== action.item.p_id
      })
      state.returnHome = true;

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


function Filters(state={
  showZeroQuantity: true,
  showPositiveQuantity: true,
  collections:[],
  selected_collections: [],
  visibleCategories:[],
  categories:[],
  visible: false,
  showCollections: true
},
action ) {
switch (action.type) {
  case FETCH_ITEMS_SUCCESS: {
    let collectionsArray = ['all']
    console.log('collections for filters', action.collections)
    collectionsArray = collectionsArray.concat(
      action.collections.map( (d) => {
      return d.name
    }) )

    state.selected_collections = collectionsArray;
    state.collections = collectionsArray;
    return Object.assign({}, state)

  }
  case SET_STOCK_FILTER: {
      if( action.mode === 'stocked') {
        if( action.checked ) {
          state.showPositiveQuantity = true;
        }
        else {
          state.showPositiveQuantity = false;
        }
      }
      else {
        // do unstocked stuff
        if( action.checked) {
          state.showZeroQuantity = true;
        }
        else {
          state.showZeroQuantity = false
        }
      }

      return Object.assign({}, state)
  }
  case FILTER_COLLECTION: {

    if(action.filterObj.status) {
      state.selected_collections.push( action.filterObj.collection)
    }
    else {
      state.selected_collections = state.selected_collections.filter( (d) => d !== action.filterObj.collection )
    }

    return Object.assign({}, state)
  }

  case "FILTER_CATEGORY": {

    let filter_category = action.filterObj.category

    let filter_status = action.filterObj.status;

    console.log(action)

    if( filter_status === false) {
      state.visibleCategories = state.visibleCategories.filter( (d) => {
      console.log('filtering', d, filter_category)
          return d !== filter_category }
        )
    }
    else {
      state.visibleCategories.push(filter_category)
    }


    return Object.assign({}, state)
  }
  case "TOGGLE_FILTER_DISPLAY": {

    state.visible = !state.visible;

    return Object.assign({}, state)
  }
  case RECIEVED_ALL_ITEMS: {
    let categories = [];
    for( let item of action.items) {
      if( !categories.includes(item.category) ) {
        categories.push(item.category)
      }
    }

    state.categories = categories;
    state.visibleCategories = categories;
    return Object.assign({}, state)

  }
  default:
    return state;

  }

}
const rootReducer = combineReducers({
  User,
  DB,
  Filters
})

export default rootReducer;
