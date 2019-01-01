import React from 'react'

import {addItem} from '../actions/item_actions.js'

const AddItemForm = (props) => {
  let dispatch = props.dispatch;
//  console.log('dispatch = ', dispatch)
  let input;
  let description = ''
  let count = 0;
  let weight = 0;

  let submitNewItem = (e, dispatcher) => {
    e.preventDefault()

    console.log("this =", this )
    let newItem = {
              name: input.value,
              description: description.value,
              quantity: count.value,
              weight: weight.value,
              category: document.getElementById('catSelect').value
            }

    // h
    if(this.dispatch) {

      this.dispatch(addItem(newItem))

    }
    else {
      console.log('there no dispatch')
    }
  }
  this.dispatch = props.dispatch
  submitNewItem.bind(this)

  return (
    <div>
    <h2>
      Add a new Item or choose an existing item below
    </h2>
    <form id="newItemForm"
      //onSubmit={submitNewItem}
      >

    <div className="addItemDiv">
      <label className="addLabel">Name:</label>
      <input
        className="itemInName addInput"
        ref={node => {
          input = node
        }}
      />

      </div>

      <br />

      <div className="addItemDiv">
        <label className="addLabel">description:</label>
        <input
        className="itemInputDescription addInput"
          ref={node => {
            description = node
          }}
        />

      </div>

      <br />

      <div className="addItemDiv">
        <label className="addLabel">Quantity:</label>
        <input
          className="quantin addInput"
          ref={node => {
            count = node;
          }}
          type="number"
          step="1"
          defaultValue="1"
        />
      </div>

      <br />
      <div className="addItemDiv">

        <label className="addLabel">weight:</label>
        <input
          className="weight addInput"
          ref={node => {
            weight = node;
          }}
          type="number"
          step=".1"
          defaultValue="1"

        />
      </div>

      <br />
      <div className="addItemDiv">
        <label className="addLabel">Category:</label>
          <select name="select" defaultValue="other" className="addSelect" id="catSelect">
                      <option value="clothing">Clothing</option>
                      <option value="comestible" >Comestibles</option>
                      <option value="tool">Tools</option>
                      <option value="potion">Potion</option>
                      <option value="electronics">Electronics</option>
                      <option value="other">other</option>
                  </select>
            <input type="text" className="categoryText" placeholder="add custom category">
            </input>
<br/>
<br/>


            <button onClick={submitNewItem} >Add new item</button>
            <button type="unique" id="bleep" onClick={(e) => {
              e.preventDefault()
              console.log('clicked on it', props, dispatch, submitNewItem(e))
            }

            }>bleeper</button>

          </div>


    </form>
    </div>
  )
}

export default AddItemForm
