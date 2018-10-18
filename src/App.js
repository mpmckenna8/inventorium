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


class App extends Component {
  render() {
    return (
      <BrowserRouter forceRefresh={false}>

      <div className="App">

        <header className="App-header">
          <HeaderLinks />
          <h1 className="App-title">Inventorium</h1>
        </header>

              <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/home" component={Home}/>
                <Route path="/newitem" component={AddItem}/>
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
