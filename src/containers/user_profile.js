import React, { Component } from 'react';
import {connect} from 'react-redux';


class User_Profile extends Component {


  render() {
    console.log('props for user profile', this.props)
    return (
      <div>
        <h4>Profile for {this.props.name}</h4>
        <div>
          Number of Items: { this.props.items.length }
        </div>
        <div>
          Number of collections: { this.props.collections.length}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  console.log('state to map', state)

  let profile_state = state.User

  return profile_state;
}

export default connect(mapStateToProps)(User_Profile)
