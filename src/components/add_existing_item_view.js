// add existingItemView
import React from 'react'

import {addNewUserItem} from "../actions/item_actions.js"

const AddExistingItemView = (params) => {
  console.log('get to make the add item view with, ', params)
  let currentItem = {name:"", quantity:1,
    }

  function addToInventory(itemToAdd) {
    console.log('need to add', itemToAdd)
    var itemquantity = parseInt(document.body.querySelector('#itemquantity').value, 10);

    itemToAdd.quantity = itemquantity;

    params.dispatch(addNewUserItem(itemToAdd))

  }

  if(params.itemToAdd) {
    currentItem = params.itemToAdd;
  }

return (
<div>
  <h2 className="itemHeader">{currentItem.name}</h2>
  <div>
    <h3>Quantity</h3>
    <span>
      <input type="number" defaultValue="1" step="1" id="itemquantity" >
      </input>
    </span>
  </div>
  <div className="itemDeets description" >
    <h4>Description:</h4>
    <span>
      <p>{currentItem.description}</p>
    </span>
  </div>
  <div className="itemDeets category">
    <h4>Category:</h4>
    <span>
    <p>{currentItem.category}</p>
    </span>
  </div>
  <div className="itemDeets value">
    <h4>Value:</h4>
    <span>
    <p>{currentItem.value}</p>
    </span>
  </div>
  <div className="itemDeets weight">
    <h4>Weight:</h4>
    <span>
      <p>{currentItem.weight}</p>
    </span>
  </div>
      <div>  <button onClick={(e) =>  addToInventory(currentItem) }>Add to inventory</button></div>

</div>
)
}


export default AddExistingItemView;
