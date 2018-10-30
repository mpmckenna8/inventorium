// new uesr collection form
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import {addUserCollection }  from "../actions/collection_actions.js"

class NewUserCollection extends Component {

  getCollectionDetails() {
    let collection = { name: ''};

    if(this.props.DB) {
      collection = this.props.DB.collectionTypes.find( (coll_type) => {
        return parseInt(this.props.match.params.idnum, 10 ) === coll_type.coll_id;
      })
    }
    return collection;
  }

  addUserCollection(addingCollection) {

    let userDescription = document.getElementById('usercollectionDesc');
    addingCollection.userDescription = userDescription.value

    addingCollection.collection_name = addingCollection.name;
    addingCollection.name = addingCollection.userDescription

    console.log('now need to dispatch an action to add the new collection', addingCollection)

    this.props.dispatch(addUserCollection(addingCollection))
  }
  render() {
    let collectionInfo = this.getCollectionDetails()

      if(collectionInfo === undefined) {

        collectionInfo = {name:'loading'}
      }


    console.log('addingCollection', collectionInfo, this.props)
    return (
      <div>
        <h2>Collection details</h2>
        <div className="collectiondeetDiv">
          <h4 className="collectionInfoHeader">Name:</h4>
          <span className="collectionDetails">{collectionInfo.name}</span>
        </div>
        <div className="collectiondeetDiv">
          <h4 className="collectionInfoHeader">Description: </h4>
          <span className="collectionDetails">{collectionInfo.description}</span>
        </div>
        <div className="collectiondeetDiv">
          <h4 className="collectionInfoHeader">Weight Capacity: </h4>
          <span className="collectionDetails">{collectionInfo.weight_capacity}</span>
        </div>
        <div className="collectiondeetDiv">
          <h4 className="collectionInfoHeader">Custom collection name:</h4>
          <input id="usercollectionDesc" type="text" className="wideInput"/>
        </div>
        <button onClick={(e) => {this.addUserCollection(collectionInfo)}}>Add collection</button>
        { ( this.props.User.redirectTo !== '' ) ? (<Redirect to={this.props.User.redirectTo} />) : ("")
      }
      </div>
    )
  }
}


const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps)(NewUserCollection)
