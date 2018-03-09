import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'

class Read extends Component {
  render() {
    if (!window.vtexjs || !window.vtexjs.checkout || !window.vtexjs.checkout.orderForm) return null
    const { orderForm } = window.vtexjs.checkout
    return (
      <div className="ph5 mv5">
        <h2 className="f3">UTMs</h2>
        {orderForm.marketingData && orderForm.marketingData.utmSource && (
          <p>utm_source: {orderForm.marketingData.utmSource}</p>
        )}
        {orderForm.marketingData && orderForm.marketingData.utmMedium && (
          <p>utm_medium: {orderForm.marketingData.utmMedium}</p>
        )}
        {orderForm.marketingData && orderForm.marketingData.utmCampaign && (
          <p>utm_medium: {orderForm.marketingData.utmCampaign}</p>
        )}

        { orderForm.ratesAndBenefitsData && orderForm.ratesAndBenefitsData.rateAndBenefitsIdentifiers.length > 0 && <h2 className="f3">Benefits</h2> }

        {orderForm.ratesAndBenefitsData && orderForm.ratesAndBenefitsData.rateAndBenefitsIdentifiers.map((benefit) => (
          <div key={benefit.id}>
            <div>
              {benefit.name}
            </div>
          </div>
        ))}

        <h2 className="f3">Items</h2>
        {orderForm.items.map((item) => (
          <div className="mb4" key={item.uniqueId}>
            <p className="f5 fw5 lh-title">{item.skuName}</p>
            <p>SKU Id: {item.id}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Seller: {item.seller}</p>
          </div>
        ))}
      </div>
    )
  }
}

Read.propTypes = {
}

export default Read
