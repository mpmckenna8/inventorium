import React, { Component } from 'react';
import {connect} from 'react-redux';


class UserLogin extends Component {
  login_submit(e) {
    let login_info = {
      name: document.getElementById('username_login').value,
      password: document.getElementById('login_password').value

    }

    console.log('need to submit login', e, login_info)


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
        <button onClick={this.login_submit}>
          submit
        </button>
      </div>
    )
  }
}
const mapStateToProps = state => {
//  console.log('state to map', state)
  return state
}

export default connect(mapStateToProps)(UserLogin)
