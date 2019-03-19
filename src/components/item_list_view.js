import React from 'react'
import { Link } from 'react-router-dom'

import {editItemQuant} from "../actions/item_actions.js"


const ItemListView = (params) => {
  //console.log('this', this)
  let items = [];
  if( params.items ) {
     items = params.items;
  }

  function incrementItemQuanity(itemEdit) {
    console.log('need to increment', itemEdit,
    ' on collection', params.current_collection)
    let incrementedItem = itemEdit;
    incrementedItem.quantity = itemEdit.quantity + 1;
    params.dispatch(editItemQuant(incrementedItem,
       params.current_collection))
  }

  function decrementItemQuantity(itemEdit) {
    let decrementedItem = itemEdit;
    decrementedItem.quantity = itemEdit.quantity - 1;
    params.dispatch(editItemQuant(decrementedItem, params.current_collection))
  }

  return (
    <div>
      {
        items.map( ( itemObj, i ) => {
      //  console.log('itemObj', itemObj)
        return (
          <div className={"itemListDiv num"+i%2} key={itemObj.name + i} >
            <div className="itemListName">
              <Link to={"/item/" + itemObj.p_id}>
                {itemObj.name}
              </Link>
            </div>
            <div className="itemListQuantity">
              <button className="itemQuantityDecrementor" onClick={(d) => {
                decrementItemQuantity(itemObj)
              }}>-</button>
              {itemObj.quantity}
              <button className="itemQuantityIncerementor" onClick={ (d) =>  incrementItemQuanity(itemObj) }>+</button>
            </div>
          </div>
        )
        })
    }
    </div>
  )
}


export default ItemListView;
