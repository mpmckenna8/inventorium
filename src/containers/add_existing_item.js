// container for adding an existing items
import React, { Component } from 'react';
import {connect} from 'react-redux';


import AddExistingItemView from '../components/add_existing_item_view.js'

class AddExistingItem extends Component {

getCurrentItemDetails() {
  console.log('nned to get getCurrentItemDetails,', this)
  let itemID = parseInt(this.props.match.params.idnum, 10);

  let itemDetails = this.props.DB.items.find( (item) => {
    return item.p_id === itemID;
  })

  return itemDetails
}

render() {
  let itemToAdd = this.getCurrentItemDetails();
  return (
    <div>
      <AddExistingItemView dispatch={this.props.dispatch} itemToAdd={itemToAdd}/>
      {
        ( this.props.User.returnHome ? "" : "" )
      }
    </div>
  )
}
}


const mapStateToProps = state => {
//  console.log('state being mapped', state)
  return state;
}

export default connect(mapStateToProps)(AddExistingItem)
