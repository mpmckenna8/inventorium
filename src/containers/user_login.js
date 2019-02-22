import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import {Redirect} from 'react-router-dom'

import {login_user} from "../actions/actions.js"


class UserLogin extends Component {
  login_submit(e) {
    let login_info = {
      username: document.getElementById('username_login').value,
      password: document.getElementById('login_password').value

    }

    console.log('need to submit login', e, login_info)
    this.props.dispatch(login_user(login_info))


  }
  render() {
    // need to basically have a form that when submitted should make a new user if the fields are correct
    return (
      <div>
      <h2>
        Login
      </h2>
        <label>Username:</label>
        <input type="text" id="username_login" />
        <br/>
        <label>password</label>
        <input type="text" id="login_password" />
        <br/>
        <button onClick={(e) => this.login_submit(e)}>
          submit
        </button>
        { (this.props.User.returnHome) ? (<Redirect to="/home" />) : ('') }

      </div>
    )
  }
}
const mapStateToProps = state => {
//  console.log('state to map', state)
  return state
}

export default connect(mapStateToProps)(UserLogin)
