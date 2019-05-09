import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import Alert from '@vtex/styleguide/lib/Alert'
import { addSpecifiedSku } from '../actions/index'
import Spinner from '@vtex/styleguide/lib/Spinner'
import { FormattedMessage, intlShape } from 'react-intl'
import { getAccountName } from '../utils';

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
    e.preventDefault()
    this.props.addSpecifiedSku(this.state)
    window.logSplunk({
      level: 'Debug',
      type: 'Info',
      workflowType: 'cartman',
      workflowInstance: 'clicked-add-item',
      event: {item: this.state},
      account: getAccountName(),
    });
  }

  render() {
    const { intl, simulation, isLoading } = this.props
    return (
      <form className="ph5 mv5" onSubmit={this.handleSubmit}>
        <div className="lh-copy f6 mb6">
          <Alert>
            <FormattedMessage id="cartman.addByIdMessage"/>
          </Alert>
        </div>

        <div className="pb4">
          <Label htmlFor="skuIds"><FormattedMessage id="cartman.skuIds"/> *</Label>
          <Input autoComplete="off" autoFocus onChange={this.handleSkuIdsChange} id="skuIds" placeholder="11111, 12345, 54321" />
        </div>
        <div className="pb4">
          <Label htmlFor="itemsQuantity"><FormattedMessage id="cartman.quantityOfEachItem"/></Label>
          <Input autoComplete="off" onChange={this.handleItemsQuantityChange} id="itemsQuantity" placeholder="Default is 1" />
        </div>
        <div className="pb4">
          <Label htmlFor="sellerId"><FormattedMessage id="cartman.sellerId"/></Label>
          <Input autoComplete="off" onChange={this.handleSellerIdChange} id="sellerId" />
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
              : <Button submit type="submit"><FormattedMessage id="cartman.addItemsToCart"/></Button>
          }
        </div>
      </form>
    )
  }
}

SkuItems.propTypes = {
  addSpecifiedSku: PropTypes.func.isRequired,
  intl: intlShape,
}

const mapStateToProps = (state, ownProps) => ({
  simulation: state.simulation,
  isLoading: state.isLoading,
})

export default connect(mapStateToProps, {
  addSpecifiedSku,
})(SkuItems)
