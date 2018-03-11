import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Actions from './Actions'
import Menu from './Menu'
import Items from './Items'
import SkuItems from './SkuItems'
import Utms from './Utms'
import Read from './Read'
import FavoriteAdd from './FavoriteAdd'
import Favorites from './Favorites'

import styles from '../theme.css'

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 'favorites',
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

  handleGoToAddFavorite = () => {
    this.setState({ page: 'favoriteAdd' })
  }

  handleGoToFavorites = () => {
    this.setState({ page: 'favorites' })
  }

  handleToggleSidebarView = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <div className="">
        {
          this.state.isOpen && (
            <div className="debug fixed right-0 bottom-2-m w-100 mw6-m pl7-m pr5-m z-max">
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
                        <Actions favoriteAdd={this.handleGoToAddFavorite} />
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
                          <Menu onClick={this.handleGoToFavorites} title="My Favorites" description="See and manage your favorite Contexts" />

                          <div className="tc mv5 mv7-m w-100 rebel-pink lh-copy f6">
                            Cartman is NOT visible to your customers.
                          </div>
                        </div>
                      )
                    }
                    { this.state.page === 'read' && <Read /> }
                    { this.state.page === 'skuItems' && <SkuItems /> }
                    { this.state.page === 'items' && <Items /> }
                    { this.state.page === 'utms' && <Utms /> }
                    { this.state.page === 'favoriteAdd' && <FavoriteAdd /> }
                    { this.state.page === 'favorites' && <Favorites /> }
                  </div>
              </div>
              </div>
            </div>
          )
        }
        {
          this.state.isOpen
          ? (
            <button className="dn flex-m items-center fixed right-1 bottom-1 right-2-m bottom-2-m bn shadow-1 pa4 pa5-m br-100 pointer bg-near-white" onClick={this.handleToggleSidebarView}>
              <svg className="flex-none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="#111111">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </g>
              </svg>
            </button>
          )
          : (
            <button className="flex items-center fixed right-1 bottom-1 right-2-m bottom-2-m bn shadow-1 pa4 pa5-m br-100 pointer bg-blue" onClick={this.handleToggleSidebarView}>
              <svg className="flex-none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" width="24" height="24">
                <path d="M23,12A11,11,0,1,1,12,1" fill="none" stroke="#ffffff"></path>
                <path d="M6,12a6,6,0,1,1,6,6" fill="none" stroke="#ffffff"></path>
                <circle cx="12" cy="12" r="2" fill="#ffffff"></circle>
                <path d="M16,1.751A11.035,11.035,0,0,1,22.25,8" fill="none" stroke="#ffffff"></path>
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
