import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'

class Read extends Component {
  render() {
    if (!window.vtexjs || !window.vtexjs.checkout || !window.vtexjs.checkout.orderForm) return null
    return (
      <div className="ph4 mb5">
        <h1>Cart context</h1>
        <h2>UTMs</h2>
        {orderForm.marketingData && orderForm.marketingData.utmSource && (
          <p>
            utm_source: {orderForm.marketingData.utmSource}
          </p>)}
        {orderForm.marketingData && orderForm.marketingData.utmMedium && (
          <p>
            utm_medium: {orderForm.marketingData.utmMedium}
          </p>)}
        {orderForm.marketingData && orderForm.marketingData.utmCampaign && (
          <p>
            utm_medium: {orderForm.marketingData.utmCampaign}
          </p>)}
          <h2>Applied benefits</h2>
        {orderForm.ratesAndBenefitsData && orderForm.ratesAndBenefitsData.rateAndBenefitsIdentifiers.map((benefit) => (
              <div key={benefit.id}>
                <div>
                  {benefit.name}
                </div>
              </div>
        ))}
        <h1>Items</h1>
        {orderForm.items.map((item) => (
            <div key={item.uniqueId}>
              <div>
                <h2>{item.skuName}</h2>
              </div>
              <div className="pa2">
                SKU Id: {item.id}
              </div>
              <div className="pa2">
                Quantity: {item.quantity}
              </div>
              <div className="pa2">
                Seller: {item.seller}
              </div>
            </div>
        ))}
      </div>
    )
  }
}

Read.propTypes = {
}

export default Read
