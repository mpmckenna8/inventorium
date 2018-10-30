import React from 'react'
import {Link } from 'react-router-dom'

import {editItem} from "../actions/item_actions.js"

const ItemListView = (params) => {

  let items = [];
  if( params.items ) {
     items = params.items;
  }

  function incrementItemQuanity(itemEdit) {
    console.log('need to increment', itemEdit)
    let incrementedItem = itemEdit;
    incrementedItem.quantity = itemEdit.quantity + 1;
    params.dispatch(editItem(incrementedItem))
  }

  function decrementItemQuantity(itemEdit) {
    let decrementedItem = itemEdit;
    decrementedItem.quantity = itemEdit.quantity - 1;
    params.dispatch(editItem(decrementedItem))
  }


  return (
    <div>
      {
        items.map( ( itemObj, i ) => {
      //  console.log('itemObj', itemObj)
        return (
          <div className="itemListDiv" key={itemObj.name + i} >
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
          </div>)
        })
    }
    </div>
  )

}


export default ItemListView;
