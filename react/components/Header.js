import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Header extends Component {
  render() {
    return (
      <header className="f3 bg-light-silver serious-black pa5 tc">
        { this.props.page !== 'home' && <span onClick={this.props.backToHome}>back</span> }
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
