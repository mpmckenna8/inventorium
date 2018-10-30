// container for collections

import React, { Component } from 'react';
import { connect } from 'react-redux'

import CollectionsList from '../components/collections_list_view.js'

class Collections extends Component {


  render() {
    let userCollections = this.props.User.collections;

    return (
      <div>
        need to show collections here
        <CollectionsList collections={userCollections} />
      </div>
    )
  }
}


function mapStateToProps(state) {

  return state;
}

export default connect(mapStateToProps)(Collections)
