// new collection components

import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import { connect } from 'react-redux'
import NewCollectionView from '../components/newcollection_view.js'

class NewCollection extends Component {
  getCollectionTypes() {
    let collectionTypes = [];
    if(this.props) {
      collectionTypes = this.props.DB.collectionTypes
    }

    return collectionTypes;
  }
  render() {

    let collectionTypes = this.getCollectionTypes();
    console.log('collectionTypes = ', collectionTypes);

    return (
      <div>
        <p>Choose from a collection type below or
        <Link to="/new_collection_type" >
        <span> create a new collection type</span>
        </Link>.</p>
          <NewCollectionView collection_types={collectionTypes} />

      </div>
    )
  }
}


function mapStateToProps(state) {

  return state;
}

export default connect(mapStateToProps)(NewCollection)
