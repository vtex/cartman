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
      <form onSubmit={this.handleSubmit}>
        <div className="ph5 mv5">
          <div className="pb4">
            <Label htmlFor="itemsQuantity">Number of items</Label>
            <Input onChange={this.handleNumberOfItemsChange} id="itemsQuantity"/>
          </div>
          <div className="pb4">
            <Label htmlFor="itemsCategories">Categories</Label>
            <Input onChange={this.handleItemsCategoriesChange} id="itemsCategories" />
          </div>
          <div className="pb4">
            <Label htmlFor="itemsBrands">Brands</Label>
            <Input onChange={this.handleItemsBrandsChange} id="itemsBrands" />
          </div>
          <div className="pb4">
            <Label htmlFor="itemsCollections">Collections</Label>
            <Input onChange={this.handleItemsCollectionsChange} id="itemsCollections" />
          </div>
          <div className="pb4">
            <Label htmlFor="itemsSellers">Sellers</Label>
            <Input onChange={this.handleItemsSellersChange} id="itemsSellers" />
          </div>
          <div className="pb4">
            <Label htmlFor="itemsIDs">SKU IDs</Label>
            <Input onChange={this.handleItemsIdsChange} id="itemsIDs" />
          </div>

          <div className="pb4 cf">
            <div className="fl w-50 pr3">
              <Label htmlFor="itemsPriceFrom">Price from</Label>
              <Input onChange={this.handlePriceFromChange} id="itemsPriceFrom" />
            </div>
            <div className="fl w-50 pl3">
              <Label htmlFor="itemsPriceUpTo">Price up to</Label>
              <Input onChange={this.handlePriceUpChange} id="itemsPriceUpTo" />
            </div>
          </div>

          <div className="tc">
            <Button onClick={this.handleSubmit} primary>Add items to Cart</Button>
          </div>
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
