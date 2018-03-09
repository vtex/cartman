import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import Alert from '@vtex/styleguide/lib/Alert'
import { addSpecifiedSku } from '../actions/index'

class SkuItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemsQuantity: 1,
      sellerId: 1,
    }
  }

  handleSkuIdsChange = (e) => {
    this.setState({
      ...this.state,
      skuIds: e.target.value
    })
  }

  handleItemsQuantityChange = (e) => {
    this.setState({
      ...this.state,
      itemsQuantity: e.target.value
    })
  }

  handleSellerIdChange = (e) => {
    this.setState({
      ...this.state,
      sellerId: e.target.value
    })
  }

  handleSubmit = (e) => {
    this.props.addSpecifiedSku(this.state)
  }

  render() {
    return (
      <div>
        <div className="ph5 mv5" onSubmit={this.handleSubmit}>
          <div className="lh-copy f6 mb6">
            <Alert>
              We'll filter your items by the Seller ID, if you specify one.
            </Alert>
          </div>

          <div className="pb4">
            <Label htmlFor="skuIds">SKU IDs *</Label>
            <Input onChange={this.handleSkuIdsChange} id="skuIds" placeholder="11111, 12345, 54321" />
          </div>
          <div className="pb4">
            <Label htmlFor="itemsQuantity">Quantity of each item</Label>
            <Input onChange={this.handleItemsQuantityChange} id="itemsQuantity" placeholder="Default is 1" />
          </div>
          <div className="pb4">
            <Label htmlFor="sellerId">Seller ID</Label>
            <Input onChange={this.handleSellerIdChange} id="sellerId" />
          </div>
          <div className="tc mt5">
            <Button onClick={this.handleSubmit} primary>Add items to Cart</Button>
          </div>
        </div>
      </div>
    )
  }
}

SkuItems.propTypes = {
  addSpecifiedSku: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  simulation: state.simulation
})

export default connect(mapStateToProps, {
  addSpecifiedSku,
})(SkuItems)
