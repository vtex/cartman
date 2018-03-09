import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'

class Items extends Component {
  render() {
    return (
      <div className="ph4">
        <p>
          <Label htmlFor="itemsQuantity">Number of items</Label>
          <Input htmlProps={{ id: 'itemsQuantity' }} />
        </p>
        <p>
          <Label htmlFor="itemsCategories">Categories</Label>
          <Input htmlProps={{ id: 'itemsCategories' }} />
        </p>
        <p>
          <Label htmlFor="itemsBrands">Brands</Label>
          <Input htmlProps={{ id: 'itemsBrands' }} />
        </p>
        <p>
          <Label htmlFor="itemsCollections">Collections</Label>
          <Input htmlProps={{ id: 'itemsCollections' }} />
        </p>
        <p>
          <Label htmlFor="itemsSellers">Sellers</Label>
          <Input htmlProps={{ id: 'itemsSellers' }} />
        </p>
        <p>
          <Label htmlFor="itemsIDs">SKU IDs</Label>
          <Input htmlProps={{ id: 'itemsIDs' }} />
        </p>
        <p>
          <Label htmlFor="itemsPriceFrom">Price from</Label>
          <Input htmlProps={{ id: 'itemsPriceFrom' }} />
        </p>
        <p>
          <Label htmlFor="itemsPriceUpTo">Price up to</Label>
          <Input htmlProps={{ id: 'itemsPriceUpTo' }} />
        </p>

        <div className="tc">
          <Button primary>Add items to Cart</Button>
        </div>
      </div>
    )
  }
}

Items.propTypes = {
}

export default Items
