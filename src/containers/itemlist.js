import React, { Component } from 'react';

import {connect} from 'react-redux';

import categorizeItems from "../helpers/categorize_items.js";

import ItemListView from "../components/item_list_view.js"

import {setCurrentCollection, setReturnHome} from '../actions/actions.js';

class ItemList extends Component {
  setCurrentCollection(onCollection) {
    console.log('setting current collection to ', onCollection)
      this.props.dispatch(setCurrentCollection(onCollection))
  }
  componentDidMount() {

    if( window.location.pathname === "/home") {
      console.log('need to set return home to false.')
      this.props.dispatch(setReturnHome(false))
      this.setCurrentCollection('all');

    }

  }
  applyFilters(items) {
    console.log('applying filters.', items)
    let filteredItems = items;
    let filters = this.props.Filters
    // apply category filters

    filteredItems = items.filter( (item) => {
      console.log(filters.visibleCategories.includes( item.category ))
      return filters.visibleCategories.includes( item.category )
    })

    filteredItems = filteredItems.filter( (item) => {

      if( ! this.props.Filters.showPositiveQuantity ) {
        if( item.quantity > 0 ) {
          return false
        }
      }
      else if( ! this.props.Filters.showZeroQuantity ) {
        if( item.quantity < 1 ) {
          return false
        }
      }
      return true;
    })

    // don't apply collection filters if on a colleciton pages
    if(window.location.pathname.includes('usercollection') ||
     this.props.Filters.selected_collections.includes('all')) {
      console.log('not applying collection filters.')
    }
    else {

      let collections = this.props.User.collections;


      filteredItems = filteredItems.filter( (item) => {

        let filterStat = false;

        for( let collection of collections ) {
          if( this.props.Filters.selected_collections.includes(collection.name) ) {
          for( let collection_item of collection.items) {
            if( collection_item.p_id === item.p_id) {
              filterStat = true;
            }
          }
        }
      }

        return filterStat
      })
    }

    console.log('applying filters.', filteredItems)

    return filteredItems;

  }
    render() {
//    console.log('this in itemList = ', this)

    let categorizedItems = categorizeItems(this.applyFilters(this.props.User.items));
    let itemCategories = Object.keys(categorizedItems);

    return (
      <div className="itemList">
        {
          itemCategories.map( (category, i) => {
            return (
              <div key={category + i}><h2>{category}</h2>
                <ItemListView
                  items={ categorizedItems[category] }
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
