import React, { Component } from 'react';
import { connect } from 'react-redux'

import AddItemForm from '../components/add_item_form.js';

class AddItem extends Component {

  nonUserItems() {
    let dbItems = this.props.DB.items;

    let userItems = this.props.User.items;

    let possibleItems = [];

    for(let dbitem of dbItems ) {
      if( userItems.every((uitem) => {
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
    console.log('this in AddItem', newItems)
    return (
      <div>
      <div>Add an existing item</div>

      <AddItemForm/>
      </div>
    )
  }
}

function mapStateToProps(state) {

  return state;
}


export default connect(mapStateToProps)(AddItem);
