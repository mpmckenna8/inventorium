// home compenent here
import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';

import ItemList from '../containers/itemlist.js';


class Home extends Component {

  render() {
    return (

      <div>
        <h2>All items</h2>
        <ItemList />
      </div>

    )

}

}

export default withRouter(Home)
