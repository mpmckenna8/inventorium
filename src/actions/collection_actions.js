// a file for actions related to Collections

export const addUserCollection = (newCollection) => (dispatch, getState) => {
  let data = {
    collectionInfo: newCollection,
    userName: getState().User.name
  }

  let addUserCollectionURL = "http://localhost:8080/usercollection/add";

  return fetch(addUserCollectionURL, {
    cache: "reload",
    mode: "cors", // no-corss cors, *same-origin
    referrer: "no-referrer", // no-referrer, *client
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': '*/*'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => {

    console.log('response from adding collection ', json);
    dispatch(addUserCollectionSuccess(newCollection, json))
  })
  .catch(err => {
    console.log('err adding user collection')

    dispatch(addUserCollectionFailure())
  })
}


export const ADD_USER_COLLECTION_SUCCESS = 'ADD_USER_COLLECTION_SUCCESS';

const addUserCollectionSuccess = (newCollection, json) => {

  return {
    type: ADD_USER_COLLECTION_SUCCESS,
    msg: json,
    newCollection: newCollection
  }
}

const addUserCollectionFailure = () => {
  return {
    type:"ADD_USER_COLLECTION_FAILURE"
  }
}



export const addCollectionType = (collectionDetails) => (dispatch, getState) => {

  let addCollectionTypeURL = "http://localhost:8080/collections/add";
  return fetch(addCollectionTypeURL, {
  body: JSON.stringify(collectionDetails),
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'accept': '*/*'
    }
  }).then(
    response => response.json(),
    error => console.log('there was an error in the add itemclass call thing to db, ', error)
  ).then(
    json => {
      return dispatch(collectionAddedToDB(json.data.collectionInfo))
    }
  )
}

export const COLLECTION_ADD_SUCCESS = 'COLLECTION_ADD_SUCCESS'
const collectionAddedToDB = (newCollection) => {

  return {
    type:COLLECTION_ADD_SUCCESS,
    newCollection: newCollection
  }
}

export const emptyCollection = (  collection, options = {mode:"setToZero"} ) =>
  (dispatch, getState) => {
    let emptyData = {uc_id:collection.up_id, options:options.mode}
    let emptyURL = "http://localhost:8080/emptycollection/" + emptyData.uc_id
    return fetch(emptyURL,
      {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'accept': '*/*'
        }
          ,
        body: JSON.stringify(emptyData)
    }
    )
    .then(res => {
  //  console.log('res back,', res)
        return res.json();
      })
      .then(json => {
        dispatch(emptyCollectionSuccess(options.mode, collection.up_id, json) )
      })
      .catch(err => dispatch(emptyCollectionFail(err)) )


}

export const EMPTY_COLLECTION_SUCCESS = "EMPTY_COLLECTION_SUCCESS";

const emptyCollectionSuccess = ( mode, up_id, json) => {

  return {
    type:"EMPTY_COLLECTION_SUCCESS",
    json: json,
    mode: mode,
    up_id: up_id
  }
}

const emptyCollectionFail = (collection) => {
  return {
    type:"EMPTY_COLLECTION_FAIL",
    collection: collection
  }
}



export const deleteUserCollection = (up_id) => (dispatch, getState) => {

  let deleteUserCollectionURL = 'http://localhost:8080/collections/deleteuserbag'

  let del_bag_data = {
    bag_id: up_id,
    user_id: getState().User.u_id
  }

  return fetch(deleteUserCollectionURL, {
    body: JSON.stringify(del_bag_data),
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'accept': '*/*'
      }
  })
  .then(res => {
//  console.log('res back,', res)
      return res.json();
    })
    .then(json => {
      dispatch(deletUserCollecitonSuccess(up_id, json) )
    })
    .catch(err => dispatch(deleteUserCollectionFail(err)) )

}


export const DELETE_USER_COLLECTION_FAIL = "DELETE_USER_COLLECTION_FAIL";

function deleteUserCollectionFail(err) {

  return {
    type:"DELETE_USER_COLLECTION_FAIL",
    err: err
  }
}

export const DELETE_USER_COLLECTION_SUCCESS = "DELETE_USER_COLLECTION_SUCCESS";

function deletUserCollecitonSuccess(up_id, json) {

  return {
    type: DELETE_USER_COLLECTION_SUCCESS,
    json: json,
    up_id: up_id
  }
}
