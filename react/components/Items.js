import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import Alert from '@vtex/styleguide/lib/Alert'
import { searchCatalog } from '../actions/index'
import Spinner from '@vtex/styleguide/lib/Spinner'

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
  }

  render() {
    const {simulation, isLoading} = this.props
    return (
      <form onClick={this.handleSubmit} className="ph5 mv5">
        <div className="lh-copy f6 mb6">
          <Alert>
            We'll filter your items by the parameters that you specify.
          </Alert>
        </div>

        <div className="pb4">
          <Label htmlFor="itemsNumber">Number of items</Label>
          <Input autoFocus onChange={this.handleNumberOfItemsChange} id="itemsNumber" placeholder="Default is 1" />
        </div>
        <div className="pb4">
          <Label htmlFor="itemsQuantity">Quantity of each item</Label>
          <Input onChange={this.handleItemsQuantityChange} id="itemsQuantity" placeholder="Default is 1" />
        </div>
        <div className="pb4">
          <Label htmlFor="itemsCategory">Category ID</Label>
          <Input onChange={this.handleItemsCategoriesChange} id="itemsCategory" />
        </div>
        <div className="pb4">
          <Label htmlFor="itemsBrand">Brand ID</Label>
          <Input onChange={this.handleItemsBrandsChange} id="itemsBrand" />
        </div>
        <div className="pb4">
          <Label htmlFor="itemsCollection">Collection ID</Label>
          <Input onChange={this.handleItemsCollectionsChange} id="itemsCollection" />
        </div>
        <div className="pb4">
          <Label htmlFor="itemsSeller">Seller ID</Label>
          <Input onChange={this.handleItemsSellersChange} id="itemsSeller" />
        </div>
        <div className="pb4 cf">
          <div className="fl w-50 pr3">
            <Label htmlFor="itemsPriceFrom">Price from</Label>
            <Input onChange={this.handlePriceFromChange} id="itemsPriceFrom" placeholder="99.99" />
          </div>
          <div className="fl w-50 pl3">
            <Label htmlFor="itemsPriceUpTo">Price up to</Label>
            <Input onChange={this.handlePriceUpChange} id="itemsPriceUpTo" placeholder="99.99" />
          </div>
        </div>

        <div className="tc mt5">
          {
            isLoading
            ? (
              <Button submit disabled>
                <span className="flex items-center">
                  <svg className="debug-loader flex-none mr3" version="1.1" x="0px" y="0px" viewBox="0 0 24 24" width="16" height="16">
                    <g transform="rotate(57.229285712486934 12 12)">
                      <circle opacity="0.4" fill="none" stroke="#111111" cx="12" cy="12" r="11"></circle>
                      <path fill="none" stroke="#111111" d="M12,1 c6.0751324,0,11,4.9248676,11,11"></path>
                    </g>
                  </svg>
                  <span className="flex-auto">
                    Add items to Cart
                  </span>
                </span>
              </Button>
            )
            : <Button submit primary>Add items to Cart</Button>
          }
        </div>
      </form>
    )
  }
}

Items.propTypes = {
  searchCatalog: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  simulation: state.simulation,
  isLoading: state.isLoading,
  addedToCart: state.addedToCart,
})

export default connect(mapStateToProps, {
  searchCatalog,
})(Items)
