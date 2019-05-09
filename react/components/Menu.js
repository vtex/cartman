import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Menu extends Component {
  render() {
    return (
      <div onClick={this.props.onClick} className="menu-item flex items-center bb b--light-gray pv6 ph5 pointer hover-bg-blue hover-white">
        <div className="flex-auto">
          <div className="f4">
            {this.props.title}
          </div>
          <div className="f6 o-60 dn">
            {this.props.description}
          </div>
        </div>
        <div className="flex-none">
          <svg className="menu-item-icon-black db" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16">
            <polyline fill="none" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="4.5,0.5 12,8 4.5,15.5 "></polyline>
          </svg>
          <svg className="menu-item-icon-white db" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16">
            <polyline fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="4.5,0.5 12,8 4.5,15.5 "></polyline>
          </svg>
        </div>
      </div>
    )
  }
}

Menu.propTypes = {
}

export default Menu
