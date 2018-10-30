// item Item view

import React from 'react'

import {Link} from 'react-router-dom'

const ItemView = (params) => {

  let currentItem = params.item;
  if(!currentItem){
    currentItem = {
      name:"",

    }
  }
  return (
    <div>
      <h2 className="itemHeader">{currentItem.name}</h2>

<Link to={"/edit_item/" + currentItem.p_id}>Edit the current item {currentItem.name}</Link>
      <div className="itemDeets quantity" >
        <h4>Quantity:  </h4>
        <span><p>{currentItem.quantity}</p></span>
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
    </div>
  )
}


export default ItemView;
