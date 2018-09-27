import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Actions from './Actions'
import Menu from './Menu'
import Items from './Items'
import SkuItems from './SkuItems'
import Utms from './Utms'
import Read from './Read'
import ItemDetail from './ItemDetail'
import Button from '@vtex/styleguide/lib/Button'
import styles from '../theme.css'


class Sidebar extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      page: 'home',
      isOpen: false,
      deactivate: false,
      selectedItem: null
    }
  }

  isCartmanEnabled = () => {
    let enabled = false
    let cartmanIsInLocalStorage = this.getCartmanStatusInLocalStorage()
    let isCartmanUndefined = typeof cartmanIsInLocalStorage === "undefined"
    let cartmanQueryOn = this.isCartmanQueryOn()
    if (cartmanIsInLocalStorage) {
      enabled = true

    } else {
      if (cartmanQueryOn && !this.state.deactivate){
        this.enableCartman()
        enabled = true  

      } else if (isCartmanUndefined){
        this.enableCartman()
        enabled = true
      
      } else {
        enabled = false
      }
    }

    return enabled

  }

  isUserAdmin = () => {
     //TODO
  }

  enableCartman = () => {
    this.saveCartmanInLocalStorage()
  }

  disableCartman = () => {
    let cartmanDisabled = false
    localStorage.setItem("isCartmanEnabled", JSON.stringify(cartmanDisabled))
    this.disableCartmanQuery()

  }

  isCartmanQueryOn = () => {
    return location.search.includes("cartman=on")
  }

  disableCartmanQuery = () => {
    let cartmanIndex = location.search.indexOf("cartman")
    let newQuery = location.search.substr(0,cartmanIndex - 1)
    location.search = newQuery
  }

  saveCartmanInLocalStorage = () => {
    let cartmanEnabled = true
    localStorage.setItem("isCartmanEnabled", JSON.stringify(cartmanEnabled))
  }

  deleteCartmanInLocalStorage = () => {
    delete localStorage.isCartmanEnabled
  }

  getCartmanStatusInLocalStorage = () => {
    let cartmanStatus = localStorage.isCartmanEnabled
    if (typeof cartmanStatus !== "undefined"){
      cartmanStatus = JSON.parse(cartmanStatus)
    }

    return cartmanStatus
  }

  handleGoToHome = () => {
    this.setState({ page: 'home' })
  }

  handleGoToRead = () => {
    this.setState({ page: 'read' })
    window.logSplunk({
      level: 'Debug',
      type: 'Info',
      workflowType: 'cartman',
      workflowInstance: 'clicked-view-details'
    });
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

  handleGoToItemDetail = () => {
    this.setState({ page: 'itemDetail' })
  }

  handleToggleSidebarView = () => {
    this.setState({ isOpen: !this.state.isOpen })
    if (this.state.deactivate){
      this.disableCartman()
    }
    window.logSplunk({
      level: 'Debug',
      type: 'Info',
      workflowType: 'cartman',
      workflowInstance: 'clicked-on',
      event: {isOpen: this.state.isOpen}
    });

  }

  handleDeactivate = () => {
    this.setState({ deactivate: true })
    window.logSplunk({
      level: 'Debug',
      type: 'Info',
      workflowType: 'cartman',
      workflowInstance: 'clicked-deactivate'
    });
  }

  handleReactivate = () => {
    this.setState({ deactivate: false })
  }

  setSelectedItem = (i) => {
    this.setState({ selectedItem: i })
  }

  render() {
    const reactivateLink = window.location.origin + '/checkout?cartman=on'
    var cartmanEnabled = this.isCartmanEnabled()

    return (
      cartmanEnabled
      ? (
      <div className="vtex-cartman">
        {
          this.state.isOpen && (
            <div className="vtex-cartman-container fixed right-0 bottom-2-m w-100 mw6-m pl7-m pr5-m z-max">
              <div className="h-100 br0 br3-m bg-white shadow-1-m ml7-m mr4-m">
                <div className="flex flex-column h-100">
                  <div className="flex-none">
                    <Header
                      page={this.state.page}
                      backToHome={this.handleGoToHome}
                      backToRead={this.handleGoToRead}
                      closeSideBar={this.handleToggleSidebarView}
                    />
                  </div>
                  {
                    this.state.deactivate
                    ? (
                      <div className="flex-auto tc ma5 f5 lh-copy">
                        <p className="fw5">Cartman will not be loaded for you in this Account anymore.</p>
                        <p>If you change your mind later, you can reactivate Cartman througth the link:</p>
                        <p className="f6" style={{ wordBreak: 'break-all' }}><a href={reactivateLink}>{reactivateLink}</a></p>
                        <div className="mt5"><Button onClick={this.handleReactivate}>Undo Deactivate</Button></div>
                      </div>
                    )
                    : (
                      <Fragment>
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
                                <Menu onClick={this.handleGoToUtms} title="Set Marketing data" description="Define your Cart UTMs and Coupon" />

                                <div className="tc mv5 ph4 mv7-m w-100 lh-copy f6">
                                  <div className="gray mb3">Cartman helps you to create, investigate and share Carts.</div>
                                  <div className="rebel-pink">Don't worry! Cartman is NOT visible to your customers :)</div>
                                  <div className=""><Button onClick={this.handleDeactivate}>Deactivate Cartman</Button></div>
                                </div>
                              </div>
                            )
                          }
                          { this.state.page === 'read' && <Read setSelectedItem={this.setSelectedItem} goToItemDetail={this.handleGoToItemDetail} /> }
                          { this.state.page === 'skuItems' && <SkuItems /> }
                          { this.state.page === 'items' && <Items /> }
                          { this.state.page === 'utms' && <Utms /> }
                          { this.state.page === 'itemDetail' && <ItemDetail selectedItem={this.state.selectedItem} /> }
                        </div>
                      </Fragment>
                    )
                  }
                </div>
              </div>
            </div>
          )
        }
        {
          this.state.isOpen
          ? (
            <button className="dn flex-m items-center fixed right-1 bottom-1 right-2-m bottom-2-m bn shadow-1 pa4 pa5-m br-100 pointer bg-near-white outline-0 z-max" onClick={this.handleToggleSidebarView}>
              <svg className="flex-none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="#111111">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </g>
              </svg>
            </button>
          )
          : (
            <button className="flex items-center fixed right-1 bottom-1 right-2-m bottom-2-m bn shadow-1 pa4 pa5-m br-100 pointer bg-blue outline-0 z-max" onClick={this.handleToggleSidebarView}>
              <svg className="flex-none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" width="24" height="24">
                <path d="M23,12A11,11,0,1,1,12,1" fill="none" stroke="#ffffff"></path>
                <path d="M6,12a6,6,0,1,1,6,6" fill="none" stroke="#ffffff"></path>
                <circle cx="12" cy="12" r="2" fill="#ffffff"></circle>
                <path d="M16,1.751A11.035,11.035,0,0,1,22.25,8" fill="none" stroke="#ffffff"></path>
              </svg>
            </button>
          )
        }
      </div>) : (<div></div>
    ))
  }
  
  }



Sidebar.propTypes = { 
}



export default Sidebar
