import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import AddItemForm from '../components/add_item_form.js';
import AddExistingItemList from '../components/add_existing_item_list.js'

import {addItem} from '../actions/item_actions.js'


class AddItem extends Component {
  addNewItem(newItem) {

    this.props.dispatch(addItem(newItem))
  }
  nonUserItems() {
    let dbItems = this.props.DB.items;

    let userItems = this.props.User.items;

    let possibleItems = [];

    for(let dbitem of dbItems ) {
      if(
        userItems.every((uitem) => {
          return uitem.p_id !== dbitem.p_id
        })
      ) {
      possibleItems.push(dbitem)
    }
    }
    return possibleItems;
  }

  render() {
    let newItems = this.nonUserItems();

    console.log('newItems in AddItem', newItems, 'rops, ', this.props);
    return (
      <div>
      <AddItemForm
        addnewitem={this.addNewItem}
        dispatch={this.props.dispatch} />


      <div>Add an existing item</div>
      <AddExistingItemList possible={newItems} />

      <AddItemForm
        addnewitem={this.addNewItem}
        dispatch={this.props.dispatch} />
      {
        (this.props.User.returnHome) ?
          <Redirect to="/home" /> :
          (<span></span>)
      }
      </div>
    )
  }
}

function mapStateToProps(state) {

  return state;
}


export default connect(mapStateToProps)(AddItem);
