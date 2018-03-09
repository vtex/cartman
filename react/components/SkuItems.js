import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import Alert from '@vtex/styleguide/lib/Alert'
import { searchCatalog } from '../actions/index'

class SkuItems extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleNumberOfItemsChange = (e) => {
    this.setState({
      ...this.state,
      numberOfItems: e.target.value === null ? 1 : e.target.value
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
      <div>
        <form className="ph5 mv5" onSubmit={this.handleSubmit}>
          <div className="lh-copy f6 mb6">
            <Alert>
              We'll filter your items by the Seller ID, if you specify one.
            </Alert>
          </div>

          <div className="pb4">
            <Label htmlFor="itemsIDs">SKU IDs *</Label>
            <Input onChange={this.handleItemsIdsChange} id="itemsIDs" placeholder="11111, 12345, 54321" />
          </div>
          <div className="pb4">
            <Label htmlFor="itemsQuantity">Quantity of each item</Label>
            <Input id="itemsQuantity" placeholder="Default is 1" />
          </div>
          <div className="pb4">
            <Label htmlFor="itemsSeller">Seller ID</Label>
            <Input onChange={this.handleItemsSellersChange} id="itemsSeller" />
          </div>

          <div className="tc mt5">
            <Button onClick={this.handleSubmit} primary>Add items to Cart</Button>
          </div>
        </form>
      </div>
    )
  }
}

SkuItems.propTypes = {
  searchCatalog: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  simulation: state.simulation
})

export default connect(mapStateToProps, {
  searchCatalog,
})(SkuItems)
