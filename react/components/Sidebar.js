import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Actions from './Actions'
import Menu from './Menu'
import Items from './Items'
import SkuItems from './SkuItems'
import Utms from './Utms'
import Read from './Read'

import styles from '../theme.css'

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 'home',
      isOpen: true,
    }
  }

  handleGoToHome = () => {
    this.setState({ page: 'home' })
  }

  handleGoToRead = () => {
    this.setState({ page: 'read' })
  }

  handleGoToItems = () => {
    this.setState({ page: 'items' })
  }

  handleGoToSkuItems = () => {
    this.setState({ page: 'skuItems' })
  }

  handleGoToUtms = () => {
    this.setState({ page: 'utms' })
  }

  handleToggleSidebarView = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <div className="">
        {
          this.state.isOpen && (
            <div className="wrapper fixed right-0 bottom-2-m w-100 mw6-m pl7-m pr5-m z-max">
              <div className="h-100 br0 br3-m bg-white shadow-1-m ml7-m mr4-m">
                <div className="flex flex-column h-100">
                  <div className="flex-none">
                    <Header
                      page={this.state.page}
                      backToHome={this.handleGoToHome}
                      closeSideBar={this.handleToggleSidebarView}
                    />
                  </div>
                  {
                    this.state.page === 'home' && (
                      <div className="flex-none">
                        <Actions />
                      </div>
                    )
                  }
                  <div className="relative flex-auto overflow-auto">
                    {
                      this.state.page === 'home' && (
                        <div>
                          <Menu onClick={this.handleGoToRead} title="View Cart details" description="Go further into your Cart data" />
                          <Menu onClick={this.handleGoToSkuItems} title="Add items by SKU ID" description="Pick your items one by one" />
                          <Menu onClick={this.handleGoToItems} title="Add random items" description="We'll sort some items for you" />
                          <Menu onClick={this.handleGoToUtms} title="Set UTMs" description="Define your Cart UTMs" />

                          <div className="absolute bottom-0 tc mb7 w-100 rebel-pink lh-copy f6">
                            Cart Debugger is NOT visible to customers.
                          </div>
                        </div>
                      )
                    }
                    { this.state.page === 'read' && <Read /> }
                    { this.state.page === 'skuItems' && <SkuItems /> }
                    { this.state.page === 'items' && <Items /> }
                    { this.state.page === 'utms' && <Utms /> }
                  </div>
              </div>
              </div>
            </div>
          )
        }
        {
          this.state.isOpen
          ? (
            <button className="dn db-m fixed right-2 bottom-2 bn shadow-1 pa5 br-100 pointer bg-near-white" onClick={this.handleToggleSidebarView}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="#111111">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </g>
              </svg>
            </button>
          )
          : (
            <button className="fixed right-2 bottom-2 bn shadow-1 pa5 br-100 pointer bg-blue" onClick={this.handleToggleSidebarView}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" width="24" height="24">
                <line data-cap="butt" fill="none" stroke="#ffffff" x1="12" y1="7" x2="12" y2="23"></line>
                <line data-cap="butt" fill="none" stroke="#ffffff" x1="1" y1="13" x2="4" y2="13"></line>
                <line data-cap="butt" fill="none" stroke="#ffffff" x1="4" y1="5" x2="6.1" y2="7.1"></line>
                <line data-cap="butt" fill="none" stroke="#ffffff" x1="20" y1="5" x2="17.9" y2="7.1"></line>
                <line data-cap="butt" fill="none" stroke="#ffffff" x1="4" y1="22" x2="6.1" y2="19.9"></line>
                <line data-cap="butt" fill="none" stroke="#ffffff" x1="20" y1="22" x2="17.9" y2="19.9"></line>
                <line data-cap="butt" fill="none" stroke="#ffffff" x1="20" y1="13" x2="23" y2="13"></line>
                <line data-cap="butt" fill="none" stroke="#ffffff" x1="9" y1="3" x2="7" y2="1"></line>
                <line data-cap="butt" fill="none" stroke="#ffffff" x1="15" y1="3" x2="17" y2="1"></line>
                <path data-cap="butt" fill="none" stroke="#ffffff" d="M15.9,5.2c2.5,1.6,4.1,4.7,4.1,8.3 c0,5.2-3.6,9.5-8,9.5s-8-4.3-8-9.5c0-3.6,1.7-6.7,4.1-8.3"></path>
                <path fill="none" stroke="#ffffff" d="M12,2c-2,0-3.7,1.5-4,3.5 c0,0,2,1.5,4,1.5s4-1.5,4-1.5C15.7,3.5,14,2,12,2z"></path>
              </svg>
            </button>
          )
        }
      </div>
    )
  }
}

Sidebar.propTypes = {
}

export default Sidebar
