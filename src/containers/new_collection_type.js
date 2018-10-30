import React, { Component } from 'react'
import { connect } from 'react-redux'

import {addCollectionType} from '../actions/collection_actions.js'

class NewCollectionType extends Component {

submitNewCollectionType() {

  let collectionDetails = {
      name:"",
      description:"",

  }

  collectionDetails.name = document.querySelector('#collectionTypeName').value;
  collectionDetails.description = document.querySelector('#collectionTypeDescription').value;

  collectionDetails.weight_capacity = document.querySelector('#collection_weight_cap').value;


  console.log(collectionDetails)
  this.props.dispatch( addCollectionType(collectionDetails) )




}
render() {
  return (
    <div className="collectionformdiv">
      <div className="collectionlabeldiv">
          <label className="collectionformlabel">Name:</label>
      </div>
      <div className="collectioninputdiv">
        <input
            className="itemInName collectioninput"
            id="collectionTypeName"
            name="name"
          />
      </div>
      <div className="collectionformdiv">
              <div className="collectionlabeldiv">

                <label className="collectionformlabel">description:</label>
              </div>
            <div className="collectioninputdiv">
              <input
                className="itemInputDescription collectioninput"
                id="collectionTypeDescription"
                name="description"
              />
            </div>

            </div>
              <br />
            <div className="collectionformdiv">
              <div className="collectionlabeldiv">
                <label className="collectionformlabel">Weight Capacity:</label>
              </div>
              <div className="collectioninputdiv">

                <input
                  className="weight_cap collectioninput"
                  name = 'weightCap'
                  type="number"
                  step=".5"
                  defaultValue="10"
                  id="collection_weight_cap"
                  />
              </div>
          </div>
              <br />
            <button type="button" onClick={(e) => {
              this.submitNewCollectionType();
            }}>Add new collection</button>
    </div>
  )
  }
}


function mapStateToProps(state) {

  return state;
}

export default connect(mapStateToProps)(NewCollectionType)
