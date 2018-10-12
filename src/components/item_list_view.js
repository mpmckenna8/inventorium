import React from 'react'


const ItemListView = (params) => {

  console.log('params = ' ,params, 'this = ',  this)
  let items = [];
  if(params.items) {
     items = params.items;
  }


  return (
    <div>
      {items.map( (itemObj, i) => {
        console.log('itemObj', itemObj)
        return (
          <div className="itemListDiv" key={itemObj.name + i} >
            <div className="itemListName">
              {itemObj.name}
            </div>
            <div className="itemListQuantity">
              <button className="itemQuantityDecrementor">-</button>
              {itemObj.quantity}
              <button className="itemQuantityIncerementor">+</button>

            </div>
          </div>)
      })}
    </div>
  )

}


export default ItemListView;
