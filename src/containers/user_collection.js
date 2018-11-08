import React, { Component } from 'react';

import { connect } from 'react-redux'

import UserCollectionView from "../components/user_collection_view.js"
import {setCurrentCollection} from '../actions/actions.js';


class UserCollection extends Component {
  collectionDetails() {
    let collection_id = parseInt(this.props.match.params.idnum, 10);

    let collection = this.props.User.collections.find( (coll) => {
      return coll.up_id === collection_id;
    })
    return collection;
  }

  componentDidMount() {
    this.setCurrentCollection(this.props.match.params.idnum);
  }
  setCurrentCollection(onCollection) {
      this.props.dispatch(setCurrentCollection(onCollection))
  }
  itemsNotInCollection() {
    let collection_id = parseInt(this.props.match.params.idnum, 10);
    let collection_items = this.props.User.collections.find( (coll) => {
      return coll.up_id === collection_id;
    })

    let remainingItems = this.props.User.items;

    if(collection_items) {
      collection_items = collection_items.items;

      for( let coll_item of collection_items ) {
          remainingItems = remainingItems.filter( (item) => {
            return item.p_id !== coll_item.p_id
          })
      }

      return remainingItems;
    }
    else {
      return []
    }
  }
  render() {
    let collection = this.collectionDetails();
    let nonCollectionItems = this.itemsNotInCollection();

    console.log('nonCollectionItems', nonCollectionItems)
    if(collection) {
    console.log('current collection = ', collection)
    return (
      <div>
        <UserCollectionView collection={collection}
          remaining_items={nonCollectionItems}
          dispatch={this.props.dispatch}
        />

      </div>
    )
    }
    else {
      return (
        <div></div>
      )
    }
  }
}

function mapStateToProps(state) {

  return state;
}

export default connect(mapStateToProps)(UserCollection)
