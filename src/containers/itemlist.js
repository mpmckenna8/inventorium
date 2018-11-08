import React, { Component } from 'react';

import {connect} from 'react-redux';

import categorizeItems from "../helpers/categorize_items.js";

import ItemListView from "../components/item_list_view.js"

import {setCurrentCollection} from '../actions/actions.js';

class ItemList extends Component {
  setCurrentCollection(onCollection) {
      this.props.dispatch(setCurrentCollection(onCollection))
  }
  componentDidMount() {
    this.setCurrentCollection(this.props.User.onCollection);
  }
    render() {
//    console.log('this in itemList = ', this)
    let categorizedItems = categorizeItems(this.props.User.items);
    let itemCategories = Object.keys(categorizedItems);

    return (
      <div className="itemList">
        {
          itemCategories.map( (category, i) => {
            return (
              <div key={category + i}><h2>{category}</h2>
              <ItemListView items={ categorizedItems[category] } dispatch={this.props.dispatch} />

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
