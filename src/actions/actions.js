// main file for actions

//import fetch from 'isomorphic-fetch';
import setUpCollections from '../helpers/set_up_user_collection.js'

export const fetchItemsIfNeeded = (userName) => (dispatch, getState) => {
  dispatch(fetchItems(getState().User))
}

const fetchItems = (userData) => (dispatch) => {

  if(shouldFetchItems(userData)) {
    var fetchItemsUrl = 'http://localhost:8080/items/' +  userData.name;

    fetch(fetchItemsUrl, {
      cache: 'no-cache',
      mode: "cors", // no-cors, cors, *same-origin
      referrer: "no-referrer", // no-referrer, *client
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      //  console.log('sucessfully fetched items and response is', json)
        dispatch(fetchItemsSuccess(json.data))
    })


  }
  else {
    console.log('seems like items dont need update')
    dispatch(fetchItemsFailure())
  }
}

const shouldFetchItems = (userData) => {

  if(userData.needsUpdate) {
    return true
  }
  else {
    return false
  }
}

export const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS";

const fetchItemsSuccess = (resData) => {

  console.log('need to parse resData = ', resData)
  let user_items = resData.items;

  let user_collections = setUpCollections(user_items, resData.bags)
  return {
    type:FETCH_ITEMS_SUCCESS,
    items: user_items,
    collections: user_collections
  }
}

export const FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE";

const fetchItemsFailure = () => {

  return {
    type:FETCH_ITEMS_FAILURE
  }
}
