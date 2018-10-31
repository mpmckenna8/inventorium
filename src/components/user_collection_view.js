import React from 'react';

import {Redirect} from 'react-router-dom'

import ItemListView from './item_list_view.js'
//import ItemNotInCollection from "../containers/item_not_in_collection.js"
import {addItemToCollection} from '../actions/actions.js'
import { emptyCollection } from '../actions/collection_actions.js'

function hereaddItemToCollection(itemToAdd, dispatch) {
    let newItem = {
                    name: itemToAdd.name,
                    quantity:1,

                    }
    itemToAdd.quantity = 1;
    console.log('itemtoadd', itemToAdd)
    dispatch(addItemToCollection(itemToAdd))

//    return {};
}

const UserCollectionView = (props) => {
  let collection = props.collection;


function showEmptyCollection() {

      let emptyDialogue = document.getElementById('empty_Collection_Dialog')
      emptyDialogue.showModal();
      console.log('need to empty the collection', collection)
}

function setQuantitiesToZero() {

  console.log('need to set all quantities to zero for', collection)
  props.dispatch(emptyCollection(collection, {mode:'setToZero'}))
}
  return (
    <div>
      <h3>{collection.name}</h3>

      <div>
        <button id="emptyCollectionButton" onClick={(e) => {
          showEmptyCollection();
        }}>Empty Collection</button>
        <dialog id="empty_Collection_Dialog">
          <p>Set item quantities to zero or empty all items?</p>
          <button onClick={setQuantitiesToZero}>
            Set Quantities to zero
          </button>
          <button onClick={
            ''
            //this.emptyItems.bind(this)
          }>
            Empty items
          </button>
          <button onClick={
            ''
            //this.closeDialogue
          }>
            Cancel
          </button>

        </dialog>
      </div>
      <ItemListView items={collection.items} dispatch={props.dispatch} />

      <h4>Items not yet in collecion</h4>
      {
        props.remaining_items.map( (item, i) => {
          return (
            <div className="itemListDiv" key={item.name + i}>
              <div className="itemListName">
                {item.name}
              </div>
              <div className="itemListQuantity">
                  0
              <button className="itemQuantityIncerementor" onClick={ (d) =>
                hereaddItemToCollection( item, props.dispatch )
              }>
              +
              </button>
              </div>

            </div>
          )
        })
      }
    </div>
  )
}

export default UserCollectionView;
