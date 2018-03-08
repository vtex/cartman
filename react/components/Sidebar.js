import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Actions from './Actions'
import Items from './Items'

class Sidebar extends Component {
  render() {
    return (
      <div>
        <Header />
        <Actions />
        <div>
          <Items />
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
}

export default Sidebar
