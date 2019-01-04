// home compenent here
import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';

import ItemList from '../containers/itemlist.js';

import ItemFilters from '../containers/item_filters.js'

class Home extends Component {

  render() {
    return (
      <div>
        <h1 className="App-title">
          Inventorium
        </h1>
        <ItemFilters />
        <ItemList current_collection="all" />
      </div>
    )

}

}

export default withRouter(Home)
