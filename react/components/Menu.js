import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Menu extends Component {
  render() {
    return (
      <div onClick={this.props.onClick} className="flex items-center bb b--light-gray pa6 pointer hover-bg-blue hover-white">
        <div className="flex-auto">
          <div className="mb4">
            {this.props.title}
          </div>
          <div className="f6 o-60">
            {this.props.description}
          </div>
        </div>
        <div className="flex-none">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16">
            <polyline fill="none" stroke="#111111" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="4.5,0.5 12,8 4.5,15.5 "></polyline>
          </svg>
        </div>
      </div>
    )
  }
}

Menu.propTypes = {
}

export default Menu
