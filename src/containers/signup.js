// a compenent for signing up new people

import React, { Component } from 'react';
import {connect} from 'react-redux';


class SignUp extends Component {
  attempt_signup() {
    console.log('need to attempt signup');
    let user = {
      name: '',
      password: ''
    }


    console.log( 'user = ', user)
  }
  render() {

    return (
      <div>

        <h2>Signup for an Inventorium account</h2>
        <label>User Name: </label>
        <input type="text"
          id="signup_name">
        </input>

        <br/>

        <label>password: </label>

        <input type="text"
          id="signup_password">
        </input>

        <br />

        <button onClick={(e) => {
          this.attempt_signup()
        }}>Submit</button>

      </div>
    )
  }
}


const mapStateToProps = state => {
  console.log('state to map', state)

  let profile_state = state.User

  return profile_state;
}


export default connect(mapStateToProps)(SignUp)
