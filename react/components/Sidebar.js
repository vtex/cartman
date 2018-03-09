import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Actions from './Actions'
import Menu from './Menu'
import Items from './Items'
import Utms from './Utms'

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 'home'
    }
  }

  handleGoToHome = () => {
    this.setState({ page: 'home' })
  }

  handleGoToRead = () => {
    this.setState({ page: 'items' })
  }

  handleGoToItems = () => {
    this.setState({ page: 'items' })
  }

  handleGoToUtms = () => {
    this.setState({ page: 'utms' })
  }

  render() {
    return (
      <div className="fixed top-0 left-0 w-100">
        <div className="fixed top-0 left-0 vh-100 w-100 bg-white o-70"></div>
        <div className="absolute right-0 w-100 vh-100 mw6-m bg-near-white">
          <div className="flex flex-column h-100">
            <div className="flex-none">
              <Header page={this.state.page} backToHome={this.handleGoToHome} />
            </div>
            <div className="flex-none">
              <Actions />
            </div>
            <div className="flex-auto overflow-auto">
              {
                this.state.page === 'home' && (
                  <div>
                    <Menu onClick={this.handleGoToRead} title="Read" description="Go further into your Cart data" />
                    <Menu onClick={this.handleGoToItems} title="Items" description="Manage the items of your Cart" />
                    <Menu onClick={this.handleGoToUtms} title="UTMs" description="Define your Cart UTMs" />
                  </div>
                )
              }
              { this.state.page === 'items' && <Items /> }
              { this.state.page === 'utms' && <Utms /> }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
}

export default Sidebar
