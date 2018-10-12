import React, { Component } from 'react';
import logo from './logo.svg';

// for some reason importing the css does not work in this file but you can load them in the index.js in this directory and the styles will be applied
// import './App.css';

import ItemList from './containers/itemlist.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Inventorium</h1>
        </header>
        <p className="App-intro">
          Items of user should show up here
        </p>
        <ItemList />
      </div>
    );
  }
}

export default App;
