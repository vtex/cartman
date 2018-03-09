import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'

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

  handleItemsIdsChange = (e) => {
    this.setState({
      ...this.state,
      itemsId: e.target.value
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="ph4 mb5">
          <p>
            <Label htmlFor="itemsQuantity">Number of items</Label>
            <Input onChange={this.handleNumberOfItemsChange} htmlProps={{ type: 'number', id:'itemsQuantity' }}/>
          </p>
          <p>
            <Label htmlFor="itemsCategories">Categories</Label>
            <Input onChange={this.handleItemsCategoriesChange} htmlProps={{ id: 'itemsCategories' }} />
          </p>
          <p>
            <Label htmlFor="itemsBrands">Brands</Label>
            <Input onChange={this.handleItemsBrandsChange} htmlProps={{ id: 'itemsBrands' }} />
          </p>
          <p>
            <Label htmlFor="itemsCollections">Collections</Label>
            <Input onChange={this.handleItemsCollectionsChange} htmlProps={{ id: 'itemsCollections' }} />
          </p>
          <p>
            <Label htmlFor="itemsSellers">Sellers</Label>
            <Input onChange={this.handleItemsSellersChange} htmlProps={{ id: 'itemsSellers' }} />
          </p>
          <p>
            <Label htmlFor="itemsIDs">SKU IDs</Label>
            <Input onChange={this.handleItemsIdsChange} htmlProps={{ id: 'itemsIDs' }} />
          </p>
          <p>
            <Label htmlFor="itemsPriceFrom">Price from</Label>
            <Input onChange={this.handlePriceFromChange} htmlProps={{ id: 'itemsPriceFrom' }} />
          </p>
          <p>
            <Label htmlFor="itemsPriceUpTo">Price up to</Label>
            <Input onChange={this.handlePriceUpChange} htmlProps={{ id: 'itemsPriceUpTo' }} />
          </p>

          <div className="tc">
            <Button htmlProps={{type: 'submit'}} primary>Add items to Cart</Button>
          </div>
        </div>
      </form>
    )
  }
}

Items.propTypes = {
}

export default Items
