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
      return dispatch(collectionAddedToDB(json.data))
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
