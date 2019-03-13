
import React, {Component} from 'react';
import {Link } from 'react-router-dom'
import {connect} from 'react-redux';

class HeaderLinks extends Component {

  render() {
  //  console.log('this in links', this)

    return (
      <div className="headerLinks">
      <div className="user_header"><Link to={"/user_profile/" + this.props.User.u_id}>
        User: {this.props.User.name}
        </Link>
      </div>
      <div className="headerLinkDiv">
        <div className="headLink">
          <Link id="homelink" to="/home">Home</Link>
        </div>
        <div className="headLink">
          <Link to="/newitem">New Item</Link>

        </div>
        <div className="headLink">
          <Link to="/collections">Collections</Link>

        </div>
        <div className="headLink" >
          <Link to="/new_collection">
          New Collection
          </Link>
        </div>
        </div>


      </div>

    )
  }
}



const mapStateToProps = state => {
  let headerProps = {
    user: state.User
  }

  return state
}

export default connect(mapStateToProps)(HeaderLinks)
