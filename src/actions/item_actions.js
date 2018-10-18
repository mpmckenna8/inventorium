// actions relating to itemList


export const EDIT_ITEM = "EDIT_ITEM";

export const editItem = (itemDetails) => (dispatch, getState) => {

  let editItemUrl = "http://localhost:8080/items/editquant";
  let stateInfo = getState()
  console.log('username', stateInfo.User)
  let postData = { user: stateInfo.User.name, item:itemDetails, collection:'all'};
  console.log('postData,', postData)
  fetch(editItemUrl, {
    cache: "reload",
    body: JSON.stringify(postData),
    mode: "cors", // no-cors, cors, *same-origin
    referrer: "no-referrer", // no-referrer, *client
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': '*/*'
    }
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

export const addItem = function(newItem) {
  let addItemUrl = "http://localhost:8080/items/add'"

  return {
    type:ADD_ITEM
  }
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
    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/json;',

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
  dispatch(recievedAllItems)
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
