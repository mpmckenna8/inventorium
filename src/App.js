import React, { Component } from 'react';

import {
  BrowserRouter,
  Route,
  Switch,
//  Redirect
} from 'react-router-dom'
// for some reason importing the css does not work in this file but you can load them in the index.js in this directory and the styles will be applied
// import './App.css';
import Home from './components/home.js'
import AddItem from './containers/add_item.js'

import HeaderLinks from './client_routing/headerlinks.js'

import AddExistingItem from './containers/add_existing_item.js'
import Collections from './containers/collections.js'
import UserCollection from './containers/user_collection.js'
import Item from "./containers/item.js"
import NewCollection from "./containers/newcollection.js"
import NewUserCollection from "./containers/new_user_collection.js"
import NewCollectionType from "./containers/new_collection_type.js"
import EditItem from "./containers/edit_item.js"
import User_Profile from './containers/user_profile.js'
import UserLogin from './containers/user_login.js'
import SignUp from './containers/signup.js'


class App extends Component {
  render() {
    return (
      <BrowserRouter forceRefresh={false}>

      <div className="App">

        <header className="App-header">
          <HeaderLinks />
        </header>

              <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/home" component={Home}/>
                <Route path="/new_collection" component={NewCollection}/>

                <Route path="/newitem" component={AddItem}/>
                <Route path="/add_existing_item/:idnum" component={AddExistingItem}/>
                <Route path="/collections" component={Collections}/>

                <Route path="/usercollection/:idnum" component={UserCollection}/>
                <Route path="/new_user_collection/:idnum" component={NewUserCollection}/>
                <Route path="/item/:idnum" component={Item}/>
                <Route path="/edit_item/:idnum" component={EditItem}/>

                <Route path="/new_collection_type" component={NewCollectionType}/>
                <Route path="/user_profile/:u_id" component={User_Profile}/>

                <Route path="/login" component={UserLogin}/>
                <Route path="/signup" component={SignUp}/>

                <Route component={NoMatch}/>
              </Switch>
      </div>
      </BrowserRouter>

    );
  }
}

export default App;


const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)
