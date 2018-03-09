import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'

class Items extends Component {
  render() {
    return (
      <div className="ph4 mb5">
        <p>
          <Label htmlFor="itemsQuantity">Number of items</Label>
          <Input id="itemsQuantity" name="oi" />
        </p>
        <p>
          <Label htmlFor="itemsCategory">Category</Label>
          <Input id="itemsCategory" />
        </p>
        <p>
          <Label htmlFor="itemsBrand">Brand</Label>
          <Input id="itemsBrand" />
        </p>
        <p>
          <Label htmlFor="itemsCollection">Collection</Label>
          <Input id="itemsCollection" />
        </p>
        <p>
          <Label htmlFor="itemsSeller">Seller</Label>
          <Input id="itemsSeller" />
        </p>
        <p>
          <Label htmlFor="itemsID">SKU ID</Label>
          <Input id="itemsID" />
        </p>
        <p>
          <Label htmlFor="itemsPriceFrom">Price from</Label>
          <Input id="itemsPriceFrom" />
        </p>
        <p>
          <Label htmlFor="itemsPriceUpTo">Price up to</Label>
          <Input id="itemsPriceUpTo" />
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
