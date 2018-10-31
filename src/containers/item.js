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
  let itemColls = [];

  let userColls = this.props.User.collections;

  for( let collection of userColls ) {
    let collectionItem = collection.items.find( (collItem) => collItem.p_id === item.p_id )
    if( collectionItem ) {
      let itemsCollectionObject = {collection: collection, quantity: collectionItem.quantity}
      itemColls.push(itemsCollectionObject)
    }
  }
  //console.log('itemcolls', itemColls)
  return itemColls;
}
render() {
  let itemInfo = this.getItemInfo();
  let itemCollections = this.getItemCollections(itemInfo);
  console.log(itemInfo)
  return (
    <div>
      <ItemView item={itemInfo} item_collections={itemCollections}/>
    </div>
  )
}
}

const mapStateToProps = state => {
//  console.log('state being mapped', state)
  return state;
}

export default connect(mapStateToProps)(Item)
