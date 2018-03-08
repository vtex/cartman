import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Actions from './Actions'
import Menu from './Menu'

class Sidebar extends Component {
  render() {
    return (
      <div className="fixed top-0 left-0 vh-100 w-100">
        <div className="fixed top-0 left-0 vh-100 w-100 bg-white o-70"></div>
        <div className="fixed right-0 w-100 mw6-m vh-100 bg-near-white">
          <Header />
          <Actions />
          <div>
            <Menu title="Read" description="Go further into your Cart data" />
            <Menu title="Items" description="Manage the items of your Cart" />
            <Menu title="UTMs" description="Define your Cart UTMs" />
            <Menu />
          </div>
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
}

export default Sidebar
