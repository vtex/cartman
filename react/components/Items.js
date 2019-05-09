import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import Alert from '@vtex/styleguide/lib/Alert'
import { searchCatalog } from '../actions/index'
import Spinner from '@vtex/styleguide/lib/Spinner'
import { FormattedMessage, intlShape } from 'react-intl'
import { getAccountName } from '../utils';

class Items extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleNumberOfItemsChange = (e) => {
    this.setState({
      ...this.state,
      numberOfItems: e.target.value
    })
  }

  handleItemsCategoriesChange = (e) => {
    this.setState({
      ...this.state,
      categories: e.target.value
    })
  }

  handleItemsBrandsChange = (e) => {
    this.setState({
      ...this.state,
      brands: e.target.value
    })
  }

  handleItemsCollectionsChange = (e) => {
    this.setState({
      ...this.state,
      collections: e.target.value
    })
  }

  handleItemsSellersChange = (e) => {
    this.setState({
      ...this.state,
      itemsSellers: e.target.value
    })
  }

  handleSkusIdsChange = (e) => {
    this.setState({
      ...this.state,
      skuIds: e.target.value
    })
  }

  handlePriceFromChange = (e) => {
    this.setState({
      ...this.state,
      priceFrom: e.target.value
    })
  }

  handlePriceUpChange = (e) => {
    this.setState({
      ...this.state,
      priceUp: e.target.value
    })
  }

  handleItemsQuantityChange = (e) => {
    this.setState({
      ...this.state,
      itemsQuantity: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.searchCatalog(this.state, window.vtexjs && window.vtexjs.checkout && window.vtexjs.checkout.orderForm.salesChannel)
    window.logSplunk({
      level: 'Debug',
      type: 'Info',
      workflowType: 'cartman',
      workflowInstance: 'clicked-add-random-item',
      account: getAccountName(),
    });
  }

  render() {
    const { intl, simulation, isLoading } = this.props
    return (
      <form onSubmit={this.handleSubmit} className="ph5 mv5">
        <div className="lh-copy f6 mb6">
          <Alert>
            <FormattedMessage id="cartman.addRandomMessage"/>
          </Alert>
        </div>

        <div className="pb4">
          <Label htmlFor="itemsNumber"><FormattedMessage id="cartman.numberOfItems"/></Label>
          <Input autoComplete="off" autoFocus onChange={this.handleNumberOfItemsChange} id="itemsNumber" placeholder="Default is 1" />
        </div>
        <div className="pb4">
          <Label htmlFor="itemsQuantity"><FormattedMessage id="cartman.quantityOfEachItem"/></Label>
          <Input autoComplete="off" onChange={this.handleItemsQuantityChange} id="itemsQuantity" placeholder="Default is 1" />
        </div>
        <div className="pb4">
          <Label htmlFor="itemsCategory"><FormattedMessage id="cartman.categoryId"/></Label>
          <Input autoComplete="off" onChange={this.handleItemsCategoriesChange} id="itemsCategory" />
        </div>
        <div className="pb4">
          <Label htmlFor="itemsBrand"><FormattedMessage id="cartman.brandId"/></Label>
          <Input autoComplete="off" onChange={this.handleItemsBrandsChange} id="itemsBrand" />
        </div>
        <div className="pb4">
          <Label htmlFor="itemsCollection"><FormattedMessage id="cartman.collectionId"/></Label>
          <Input autoComplete="off" onChange={this.handleItemsCollectionsChange} id="itemsCollection" />
        </div>
        <div className="pb4">
          <Label htmlFor="itemsSeller"><FormattedMessage id="cartman.sellerId"/></Label>
          <Input autoComplete="off" onChange={this.handleItemsSellersChange} id="itemsSeller" />
        </div>
        <div className="pb4 cf">
          <div className="fl w-50 pr3">
            <Label htmlFor="itemsPriceFrom"><FormattedMessage id="cartman.priceFrom"/></Label>
            <Input autoComplete="off" onChange={this.handlePriceFromChange} id="itemsPriceFrom" placeholder="99.99" />
          </div>
          <div className="fl w-50 pl3">
            <Label htmlFor="itemsPriceUpTo"><FormattedMessage id="cartman.priceTo"/></Label>
            <Input autoComplete="off" onChange={this.handlePriceUpChange} id="itemsPriceUpTo" placeholder="99.99" />
          </div>
        </div>

        <div className="tc mt5">
          {
            isLoading
            ? (
              <Button submit disabled>
                <span className="flex items-center">
                  <svg className="vtex-cartman-loader flex-none mr3" version="1.1" x="0px" y="0px" viewBox="0 0 24 24" width="16" height="16">
                    <g transform="rotate(57.229285712486934 12 12)">
                      <circle opacity="0.4" fill="none" stroke="#111111" cx="12" cy="12" r="11"></circle>
                      <path fill="none" stroke="#111111" d="M12,1 c6.0751324,0,11,4.9248676,11,11"></path>
                    </g>
                  </svg>
                  <span className="flex-auto">
                    <FormattedMessage id="cartman.addItemsToCart"/>
                  </span>
                </span>
              </Button>
            )
            : <Button type="submit" primary><FormattedMessage id="cartman.addItemsToCart"/></Button>
          }
        </div>
      </form>
    )
  }
}

Items.propTypes = {
  searchCatalog: PropTypes.func.isRequired,
  intl: intlShape,
}

const mapStateToProps = (state, ownProps) => ({
  simulation: state.simulation,
  isLoading: state.isLoading,
  addedToCart: state.addedToCart,
})

export default connect(mapStateToProps, {
  searchCatalog,
})(Items)
