// root provider to go here

import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import App from '../App.js'

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
