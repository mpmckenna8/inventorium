// home compenent here
import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';

import ItemList from '../containers/itemlist.js';


class Home extends Component {

  render() {
    return (
      <div>
      <h1 className="App-title">Inventorium</h1>
        <ItemList current_collection="all" />
      </div>
    )

}

}

export default withRouter(Home)
