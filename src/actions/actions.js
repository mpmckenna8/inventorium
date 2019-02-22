// main file for actions
//import fetch from 'isomorphic-fetch';
import setUpCollections from '../helpers/set_up_user_collection.js'

export const setUserFromStorage = (userData) => {
  return {
    type: "SET_USER_FROM_STORAGE",
    userInfo: userData
  }
}

export const fetchItemsIfNeeded = () => (dispatch, getState) => {

  return dispatch(fetchItems(getState().User))
}


const fetchItems = (userData) => (dispatch) => {

  if(shouldFetchItems(userData)) {
    var fetchItemsUrl = 'http://localhost:8888/items/' +  userData.name;


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
            let fetchedData =  Object.assign({}, {items:json.inventory, bags: json.collections })
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

//  console.log('need to parse resData = ', resData)
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

export const SET_CURRENT_COLLECTION = "SET_CURRENT_COLLECTION"

export const setCurrentCollection = (onCollection) => {
  return {
    type:SET_CURRENT_COLLECTION,
    onCollection: onCollection
  }
}

export const addItemToCollection = (item) => (dispatch, getState) => {
  let currentState = getState()

  let sendjson = {item: item, userName:currentState.User.name, itemClass: currentState.User.currentCollection}

  console.log('json being sent to add item to collection', sendjson)


  let addItemToCollectionURL = 'http://localhost:8888/items/addtocollection'
  return fetch(addItemToCollectionURL, {
    cache: "reload",
    mode: "cors", // no-corss cors, *same-origin
    referrer: "no-referrer", // no-referrer, *client
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': '*/*'
    },
    body: JSON.stringify(sendjson)
  })
  .then(res => res.json())
  .then(json => {
    return dispatch(addItemToCollectionSuccess(sendjson, json))
  })
  .catch( err => {
    console.log('there was an err adding item to collection', err)
    return dispatch(addItemToCollectionFailure())
  })

}

export const ADD_ITEM_TO_COLLECTION_SUCCESS = 'ADD_ITEM_TO_COLLECTION_SUCCESS'

const addItemToCollectionSuccess = (sendjson) => {

  return {
    type: ADD_ITEM_TO_COLLECTION_SUCCESS,
    json:sendjson
  }
}


const ADD_ITEM_TO_COLLECTION_FAILURE = 'ADD_ITEM_TO_COLLECTION_FAILURE';


const addItemToCollectionFailure = () => {
  return {
    type:ADD_ITEM_TO_COLLECTION_FAILURE,
    msg:'something messed up'
  }
}




export const toggleFilterDisplay = () => {

  return {
    type:"TOGGLE_FILTER_DISPLAY"
  }
}

export const toggleCategoryFilter = (filterCatObject) => {

  return {
    type: "FILTER_CATEGORY",
    filterObj: filterCatObject
  }
}

export const FILTER_COLLECTION = "FILTER_COLLECTION";
export const toggleCollectionFilter = (filterCollectionObj) => {

  return {
    type: "FILTER_COLLECTION",
    filterObj: filterCollectionObj
  }
}

export const SET_RETURN_HOME = "SET_RETURN_HOME"

export const setReturnHome = (returnValue) => {
  return {
    type:"SET_RETURN_HOME",
    value: returnValue
  }
}


export const SET_STOCK_FILTER = "SET_STOCK_FILTER";

export const setFilterStocked = ( filterInfo  = { type: "stocked",
  checked: true} )  => {
        return {
            type:SET_STOCK_FILTER,
            mode: filterInfo.type,
            checked: filterInfo.checked
        }
      }


const login_user_success = (res) => {
        return {
          type: "LOGIN_SUCCESS",
          data: res
        }
      }

export const login_user = ( userData) => (dispatch, getState ) => {
  var loginUrl = 'http://localhost:8888/login';

  console.log('trying to login with ')

  return fetch( loginUrl, {
    cache: "reload",
    mode: "cors", // no-corss cors, *same-origin
    referrer: "no-referrer", // no-referrer, *client
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': '*/*'
    },
    body: JSON.stringify(userData)
  })
  .then(res => res.json())
  .then(json => {

    dispatch( login_user_success(json) )
  })
  .catch(err => {

    console.log('error logging in user', err)
  })


}
