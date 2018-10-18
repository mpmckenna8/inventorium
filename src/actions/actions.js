// main file for actions

//import fetch from 'isomorphic-fetch';
import setUpCollections from '../helpers/set_up_user_collection.js'

export const fetchItemsIfNeeded = (userName) => (dispatch, getState) => {

  return dispatch(fetchItems(getState().User))
}

const fetchItems = (userData) => (dispatch) => {

  if(shouldFetchItems(userData)) {
    var fetchItemsUrl = 'http://localhost:8080/items/' +  userData.name;


    return fetch(fetchItemsUrl, {
      cache: "reload",
      referrer: "no-referrer", // no-referrer, *client
      method: 'GET',
      headers: {
      //  'Access-Control-Max-Age': 10,
        'Accept': 'application/json',
        'Content-Type': 'application/json',


      }
    })
    .then(res => res.json())
    .then(json => {
      //  console.log('sucessfully fetched items and response is', json)
            let fetchedData =  Object.assign({}, {items:json.data.items, bags: json.data.bags })
        dispatch(fetchItemsSuccess(fetchedData))
    })
    .catch(error => {
      console.error('Error getting the user items:', error)
      dispatch(fetchItemsFailure())
    }
    );


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
  let user_items = resData.items

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
