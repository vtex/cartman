import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Header extends Component {
  render() {
    return (
      <header className="relative f3 bg-light-silver serious-black pa5 tc">
        { this.props.page !== 'home' && (
          <button onClick={this.props.backToHome} className="absolute left-0 top-0 bn bg-transparent pointer pa5">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16">
              <polyline fill="none" stroke="#111111" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="11.5,0.5 4,8 11.5,15.5 "></polyline>
            </svg>
          </button>
        ) }
        { this.props.page === 'home' && <span>Cart Debugger</span>}
        { this.props.page === 'read' && <span>Read</span>}
        { this.props.page === 'items' && <span>Items</span>}
        { this.props.page === 'utms' && <span>UTMs</span>}

      </header>
    )
  }
}

Header.propTypes = {
}

export default Header
