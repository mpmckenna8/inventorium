// a container to get the info on item
import React, { Component } from 'react';

import {connect} from 'react-redux';

import ItemView from '../components/item_view.js';
class Item extends Component {
getItemInfo() {
  let item = {}
  let item_id = parseInt(this.props.match.params.idnum, 10);
  console.log(this.props)
  if(this.props.User) {
    item = this.props.User.items.find( d => d.p_id === item_id)
  }

  return item;
}

getItemCollections(item) {


}
render() {
  let itemInfo = this.getItemInfo();
  let itemCollections = this.getItemCollections();
  console.log(itemInfo)
  return (
    <div>
      <ItemView item={itemInfo}/>
    </div>
  )
}
}

const mapStateToProps = state => {
//  console.log('state being mapped', state)
  return state;
}

export default connect(mapStateToProps)(Item)
