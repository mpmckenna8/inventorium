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
