

import React from 'react'
import { shallow, mount } from 'enzyme';
//import renderer from 'react-test-renderer'
import { Thunk } from 'redux-testkit'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'



const middlewares = [thunk]

const mockStore = configureMockStore(middlewares)

let mockData = {User:{needsUpdate:true, name:'test', items:[]}}


import { setCurrentCollection, fetchItemsIfNeeded, } from '../actions/actions.js'

import { addItem } from '../actions/item_actions.js'


import rootReducer from '../reducers/reducer.js'

describe('>>>>> testing action and reducer for setCurrentCollection/SET_CURRENT_COLLECTION: ', () => {
  it('+++ action for SET_CURRENT_COLLECTION, used to set collection currently using', () => {
    let setCollectionObj = setCurrentCollection('poggers')
    console.log(setCollectionObj)
    expect(setCollectionObj.onCollection).toEqual('poggers')
  })
  it('+++ reducer for SET_CURRENT_COLLECTION, used to set collection currently using', () => {
    let props = rootReducer(undefined, setCurrentCollection('poggers'))
    //console.log(props)
    expect(props.User.currentCollection).toEqual('poggers')
  })
})


let testItem = {
  name: "testItemer",
  description:"item for testing",
  quantity: 100,
  weight: 2,
  category: "other"
}

describe(">>>>>>> Testing actions related to items.", () => {

  let store = mockStore( {User:{needsUpdate:true, name:'test'}} )


  it('+++ test to get all items', () => {

    let store = mockStore( {User:{needsUpdate:true, name:'test'}} )
    console.log('store = ', store)

    return store.dispatch(fetchItemsIfNeeded('test')).then( () => {
      console.log('fetched items if needed')

      console.log('state of store', store.getState())
      mockData.User.items = store.getActions()[0].items;
      expect(store.getActions()[0].items.length > 0).toEqual(
         true
      )

    //  expect(store.getActions().length).toEqual(1)
     expect(store.getActions()[0].items.length).toBeGreaterThan(0)
    })
  })

    it('+++ test to get add a test item', () => {

    //  let store = mockStore( {rootReducer.User} )
      let store = mockStore( {User:{needsUpdate:true, name:'test'}} )
      console.log('store = ', store)


      return store.dispatch( addItem( testItem ) )
      .then( () => {
        expect( store.getActions()[0].type).toEqual('ADD_NEW_USER_ITEM')
        return store

      })
      .then( (itemAddedStore) => {
        let testItemId = itemAddedStore.getActions()[0].msg.data.item_id;


        return expect(itemAddedStore.getActions()).toEqual([])
      })

    })

  })
