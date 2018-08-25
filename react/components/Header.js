import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Header extends Component {
  handleGoBack = () => {
    if (this.props.page === 'favoritesImport') {
      this.props.backToFavorites()
    } else {
      this.props.backToHome()
    }
  }

  render() {
    return (
      <header className="relative f3 bg-light-silver serious-black pa5 tc br3-m br--top-m fw5">
        { this.props.page !== 'home' && (
          <button onClick={this.handleGoBack} className="absolute left-0 top-0 bn bg-transparent pointer pa5">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16">
              <polyline fill="none" stroke="#111111" points="11.5,0.5 4,8 11.5,15.5 "></polyline>
            </svg>
          </button>
        ) }
        { this.props.page === 'home' && <span>Cartman</span>}
        { this.props.page === 'read' && <span>View Cart details</span>}
        { this.props.page === 'skuItems' && <span>Add items by SKU ID</span>}
        { this.props.page === 'items' && <span>Add Random Items</span>}
        { this.props.page === 'utms' && <span>Set UTMs</span>}
        { this.props.page === 'favoriteAdd' && <span>Add Favorite</span>}
        { this.props.page === 'favorites' && <span>My Favorites</span>}
        { this.props.page === 'favoritesImport' && <span>Import Favorites</span>}
        <button onClick={this.props.closeSideBar} className="absolute right-0 top-0 bn bg-transparent pointer pa5 bd dn-m">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="#111111">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </g>
          </svg>
        </button>
      </header>
    )
  }
}

Header.propTypes = {
}

export default Header
