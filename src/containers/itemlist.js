import React, { Component } from 'react';

import {connect} from 'react-redux';

import categorizeItems from "../helpers/categorize_items.js";
import applyFilters from "../helpers/apply_filters.js"

import ItemListView from "../components/item_list_view.js"

import {setCurrentCollection, setReturnHome,fetchItemsIfNeeded } from '../actions/actions.js';

class ItemList extends Component {
  setCurrentCollection(onCollection) {
    console.log('setting current collection to ', onCollection)
      this.props.dispatch(setCurrentCollection(onCollection))
  }
  componentDidMount() {
    console.log('pathname = ', window.location.pathname)

    if( this.props.User.needsUpdate) {
      console.log('need to update user stuff');
      this.props.dispatch(fetchItemsIfNeeded(this.props.User.name))

    }

    if( window.location.pathname === "/home") {
      console.log('need to set return home to false.')
      this.props.dispatch(setReturnHome(false))
      this.setCurrentCollection('all');
    }
  }
    render() {
//    console.log('this in itemList = ', this)

    let categorizedItems = categorizeItems(applyFilters(this.props.User.items, this.props.User.collections, this.props.Filters));
    let itemCategories = Object.keys(categorizedItems);

    return (
      <div className="itemList">
        {
          itemCategories.map( (category, i) => {
            return (
              <div key={category + i}><h2>{category}</h2>
                <ItemListView
                  items={ categorizedItems[category] }
                  current_collection="all"
                  dispatch={this.props.dispatch} />
              </div>
            )
            })
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
//  console.log('state being mapped', state)
  return state;
}

export default connect(mapStateToProps)(ItemList);
