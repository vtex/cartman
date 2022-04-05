import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, intlShape } from 'react-intl'

class Header extends Component {
  render() {
    return (
      <header className="relative f3 bg-light-silver serious-black pa5 tc br3-m br--top-m fw5">
        {this.props.page !== 'home' && (
          <button onClick={this.props.page === 'itemDetail' ? this.props.backToRead : this.props.backToHome} className="absolute left-0 top-0 bn bg-transparent pointer pa5 outline-0">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16">
              <polyline fill="none" stroke="#111111" points="11.5,0.5 4,8 11.5,15.5 "></polyline>
            </svg>
          </button>
        )}
        {this.props.page === 'home' && <span>Cartman</span>}
        {this.props.page === 'read' && <span><FormattedMessage id="cartman.viewDetails" /></span>}
        {this.props.page === 'discounts' && <span><FormattedMessage id="cartman.viewDiscounts" /></span>}
        {this.props.page === 'skuItems' && <span><FormattedMessage id="cartman.addBySkuId" /></span>}
        {this.props.page === 'items' && <span><FormattedMessage id="cartman.addRandom" /></span>}
        {this.props.page === 'utms' && <span><FormattedMessage id="cartman.setMarketingData" /></span>}
        {this.props.page === 'itemDetail' && <span><FormattedMessage id="cartman.itemDetail" /></span>}
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
  intl: intlShape,
}

export default Header
