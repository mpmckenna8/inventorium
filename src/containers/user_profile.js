import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom'
import {logoutUser} from '../actions/actions.js'

class User_Profile extends Component {
  logout() {

    console.log('need to log out user')
    this.props.dispatch(logoutUser())
  }

  render() {
    console.log('props for user profile', this.props)
    return (
      <div>
        <h4>Profile for {this.props.name}</h4>

        { this.props.name === 'test' ? (
          <div>Currently on test profile,<Link to="/login"> log in? </Link>
          <br />
          <div>Or <Link to="/signup">sign up for a new account</Link></div>
          </div>) : (
            <button id="logout_button"
              onClick={(e) => {
                this.logout()
              }}
              >Logout</button> )}

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
