// edit item container

import React, { Component } from 'react';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import {editItem} from "../actions/item_actions.js"


class EditItem extends Component {

  getCurrentItem() {
    let item = { name: ""}

    let item_id = parseInt(this.props.match.params.idnum, 10);
    if(this.props.User.items.length > 0 ) {
      item = this.props.User.items.find( item => item.p_id === item_id )
    }
    return item
  }

  saveEdits(currentItem) {
    let name = document.querySelector('#editName').value
    let description = document.querySelector('#editDescription').value;
    let category = document.querySelector("#catSelect").value;

    if(category === "other") {
      category = document.querySelector("#catText").value
    }
    let quantity = document.querySelector("#editQuant").value;

    currentItem.name = name;
    currentItem.description = description;
    currentItem.category = category;
    currentItem.quantity = quantity;
    console.log('description', description, name, 'category =', category)

    console.log('gotsta save, ', currentItem)

    this.props.dispatch(editItem(currentItem))
  }

  render() {
    let currentItem = this.getCurrentItem()
    let categories = ['clothing', 'comestible', 'tool', 'potion', 'electronics' ]

    let onCategory = categories.find( (d) => {
      d === currentItem.category
    })


    console.log('current item', currentItem )
    return (<div>
              <label>Name: </label>
              <input
                type="text"
                defaultValue={currentItem.name}
                id="editName"
                ></input>

              <br/>
              <label>Description:</label>
              <input type="text" defaultValue={currentItem.description}
                    id="editDescription">
              </input>

              <br/>
              <label>Category:</label>
              <select name="select" defaultValue="other" className="addSelect" id="catSelect" onChange={(e) => {
                     console.log('para is', e.target.value);
                  }}
              defaultValue={ (onCategory) ? onCategory : 'other'}
                  >
                          <option value="clothing">Clothing</option>
                          <option value="comestible" >Comestibles</option>
                          <option value="tool">Tools</option>
                          <option value="potion">Potion</option>
                          <option value="electronics">Electronics</option>
                          <option value="other">other</option>
                      </select>
                <input type="text" className="categoryText"
                defaultValue={ (onCategory) ? "select other and add custom category" : currentItem.category}
                id="catText">
                </input>

                <br/>

                <input
                  type='number'
                  defaultValue={currentItem.quantity}
                  id="editQuant">
                  </input>
                <br/>
                <button onClick={(e) => {

                  this.saveEdits(currentItem);
                }}>Save Item Edit</button>


        { (this.props.User.returnHome) ? (<Redirect to='/home'></Redirect>) : ""}
            </div>
          )
  }
}


const mapStateToProps = state => {
  return state
}
export default connect(mapStateToProps)(EditItem)
