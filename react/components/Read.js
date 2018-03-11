import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'

class Read extends Component {
  render() {
    if (!window.vtexjs || !window.vtexjs.checkout || !window.vtexjs.checkout.orderForm) return null
    const { orderForm } = window.vtexjs.checkout
    const mkt = orderForm.marketingData
    const benefits = orderForm.ratesAndBenefitsData
    return (
      <div className="ph5 mv5">
        <h2 className="f3">UTMs</h2>
        {!mkt || (!mkt.utmSource && !mkt.utmMedium && !mkt.utmCampaign) ? <p className="gray">No UTMs.</p> : ''}
        {mkt && mkt.utmSource && (<p>utm_source: {mkt.utmSource}</p>)}
        {mkt && mkt.utmMedium && (<p>utm_medium: {mkt.utmMedium}</p>)}
        {mkt && mkt.utmCampaign && (<p>utm_campaign: {mkt.utmCampaign}</p>)}

        <h2 className="f3">Benefits</h2>
        {!benefits || benefits.rateAndBenefitsIdentifiers.length == 0 ? <p className="gray">No benefits.</p> : '' }
        {benefits && benefits.rateAndBenefitsIdentifiers.map((benefit) => (
          <div key={benefit.id}>
            <h3>{benefit.name}</h3>
            {benefit.description && <p>Description: {benefit.description}</p>}
            <p>Featured: {benefit.featured ? 'yes' : 'no'}</p>
            {benefit.matchedParameters['slaIds'] && <p>SLA Ids: {benefit.matchedParameters['slaIds']}</p>}
            {benefit.matchedParameters['product@CatalogSystem'] && <p>Product at CatalogSystem: {benefit.matchedParameters['product@CatalogSystem']}</p>}
            {benefit.matchedParameters['buyAndWin@Marketing'] && <p>Buy and Win at Marketing: {benefit.matchedParameters['buyAndWin@Marketing']}</p>}
          </div>
        ))}

        <h2 className="f3">Items</h2>
        {orderForm.items.length == 0 ? <p className="gray">No items.</p> : '' }
        {orderForm.items.map((item) => (
          <div className="mb4" key={item.uniqueId}>
            <p className="f5 fw5 lh-title">{item.skuName}</p>
            <p>Product Id: {item.productId}</p>
            <p>SKU Id: {item.id}</p>
            <p>EAN: {item.ean || '-'}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Seller: {item.seller}</p>
            <p>Category Ids: {item.productCategoryIds}</p>
          </div>
        ))}
      </div>
    )
  }
}

Read.propTypes = {
}

export default Read
