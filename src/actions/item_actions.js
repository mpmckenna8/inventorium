// actions relating to itemList
let urlStart = "http://localhost:8080/"


export const EDIT_ITEM = "EDIT_ITEM";

export const editItemQuant = (itemDetails) => (dispatch, getState) => {

  let editItemQuantUrl = "http://localhost:8080/items/editquant";
  let stateInfo = getState()
  console.log('username', stateInfo.User)

  let postData = {
      user: stateInfo.User.name,
      item:itemDetails,
      collection:stateInfo.User.currentCollection
    };

  console.log('needing to post ,', postData)

  fetch(editItemQuantUrl, {
    cache: "reload",
    body: JSON.stringify(postData),
    mode: "cors", // no-cors, cors, *same-origin
    referrer: "no-referrer", // no-referrer, *client
    method: 'POST',
    headers: {
    'content-type': 'application/json',
    'accept': '*/*'
    },
    })
    .then(res => res.json())
    .then(json => {
      dispatch(editItemSuccess(itemDetails))

    })
    .catch(error => console.error('Error editing the item and sending to db:', error));

}

function editItemSuccess(itemDetails) {
  return {
    type:EDIT_ITEM,
    item: itemDetails
  }

}



export const ADD_ITEM = "ADD_ITEM";

export const addItem = (newItem) => (dispatch, getState) => {

  let addItemUrl = 'http://localhost:8080/items/add'

  let sendData = {
    item: newItem,
    userName: getState().User.name,
    className:'all'
  }

  console.log('our sendData for new item', sendData)

  fetch(addItemUrl, {
    method: 'POST',
    body: JSON.stringify(sendData),

        headers: {
        'content-type': 'application/json',
        'accept': '*/*'
        }
  })
  .then(res => {
    return res.json()
  }
  )
  .then(json => {
    console.log('trying to get some json back')
    dispatch(addNewUserItemSuccess(newItem))

  })
}

export const getDBItemsAndBags = () => (dispatch, getState) => {

  let getAllurl = 'http://localhost:8080/allitems';

  return fetch(getAllurl, {
    //credentials: 'include', //pass cookies, for authentication
    method: 'GET',
    mode: "cors", // no-cors, cors, *same-origin
    referrer: "no-referrer", // no-referrer, *client
    cache: 'no-cache',

    headers: {
    'content-type': 'application/json',
    'accept': '*/*'
    },
    })
    .then(res =>  res.json())
    .then(json => {
        // handle the incoming new items:
        console.log('made a new fetch for ALL items = ', json)
        return dispatch(recievedAllItems(json))
        // return dispatch(recievedAllItems(json))
        }
      )
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation getting the all items which needs to be handeled better: ' + error.message);
      })
}

export const RECIEVED_ALL_ITEMS = "RECIEVED_ALL_ITEMS"

function recievedAllItems(json) {
    console.log('all the items back', json)

  return {
    type: RECIEVED_ALL_ITEMS,
    items: json.items,
    collectionTypes: json.collectionTypes
  }
}

export const ADD_NEW_USER_ITEM = "ADD_NEW_USER_ITEM";

export const addNewUserItem = (newUserItem) => (dispatch, getState) => {

  let urlend = urlStart + "existingitem"

  let sendjson = {item:newUserItem, user: {name: getState().User.name}}

  fetch(urlend, {
    cache: "reload",
    body: JSON.stringify(sendjson),
    mode: "cors", // no-corss cors, *same-origin
    referrer: "no-referrer", // no-referrer, *client
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': '*/*'
    }
  })
   .then(res =>  res.json())
      .then(json => {
        console.log('message bag from adding an item')
        dispatch(addNewUserItemSuccess(newUserItem))
      })

    .catch((err) => {
      dispatch(addNewUserItemFail)
      console.log('there was an error adding the item', err)
    })


}

export const ADD_NEW_USER_ITEM_FAIL = "ADD_NEW_USER_ITEM_FAIL"


function addNewUserItemFail() {

  return {
    type:ADD_NEW_USER_ITEM_FAIL
  }
}
function addNewUserItemSuccess(userItem) {

  return {
    type:ADD_NEW_USER_ITEM,
    item:userItem
  }
}

export const editItem = (itemDetails) => (dispatch, getState) => {

  let editItemURL = 'http://localhost:8080/items/edit';

  fetch(editItemURL, {
    cache: "reload",
    body: JSON.stringify(itemDetails),
    mode: "cors", // no-corss cors, *same-origin
    referrer: "no-referrer", // no-referrer, *client
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': '*/*'
    }
  })
   .then(res =>  res.json())
   .then(json => {

     console.log('response from edititem', json)
     dispatch(editItemSuccess(itemDetails))


   })
   .catch(err => {
     console.log('there was an err editing an item', err)
   })

}
