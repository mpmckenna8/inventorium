// a compenent for signing up new people

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addNewUser} from '../actions/actions.js'
import {Redirect} from 'react-router-dom'

class SignUp extends Component {
  attempt_signup() {
    console.log('need to attempt signup');
    let user = {
      name: '',
      password: ''
    }

    user.name = document.querySelector('#signup_name')
                  .value
    user.password = document
                    .querySelector('#signup_password')
                    .value


    console.log( 'user = ', user)
    this.props.dispatch(addNewUser(user))
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
        <div className="loadingMsg">
          Sign up processing
        </div>
        <button onClick={(e) => {
          this.attempt_signup()
        }}>Submit</button>
        { this.props.returnHome ? ( <Redirect to="/home" /> ) : ('')}

        {
          (this.props.name)
        }
      </div>
    )
  }
}


const mapStateToProps = state => {
  console.log('state to map', state)

  let profile_state = state.User

  return Object.assign({}, profile_state);
}


export default connect(mapStateToProps)(SignUp)
