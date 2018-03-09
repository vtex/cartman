import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import { searchCatalog } from '../actions/index'

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

  handleSubmit = (e) => {
    this.props.searchCatalog(this.state)
  }

  render() {
    return (
      <form className="ph5 mv5" onSubmit={this.handleSubmit}>
        <div className="pb4">
          <Label htmlFor="itemsQuantity">Number of items</Label>
          <Input onChange={this.handleNumberOfItemsChange} id="itemsQuantity"/>
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
        <div className="pb4">
          <Label htmlFor="itemsIDs">SKU IDs</Label>
          <Input onChange={this.handleItemsIdsChange} id="itemsIDs" placeholder="11111, 12345, 54321" />
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
          <Button onClick={this.handleSubmit} primary>Add items to Cart</Button>
        </div>
      </form>
    )
  }
}

Items.propTypes = {
  searchCatalog: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  simulation: state.simulation
})

export default connect(mapStateToProps, {
  searchCatalog,
})(Items)
