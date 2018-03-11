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
      <div className="ph5 mv5 lh-title">
        <div className="mb5">
          <h2 className="f4 mb3">Marketing data</h2>
          {!mkt || (!mkt.utmSource && !mkt.utmMedium && !mkt.utmCampaign) ? <p className="gray">No UTMs.</p> : ''}
          {mkt && mkt.utmSource && (<p>utm_source: {mkt.utmSource}</p>)}
          {mkt && mkt.utmMedium && (<p>utm_medium: {mkt.utmMedium}</p>)}
          {mkt && mkt.utmCampaign && (<p>utm_campaign: {mkt.utmCampaign}</p>)}
          {mkt && mkt.coupon && (<p>Coupon: {mkt.coupon}</p>)}
        </div>

        <div className="mb5">
          <h2 className="f4 mb3">Benefits</h2>
          {!benefits || benefits.rateAndBenefitsIdentifiers.length == 0 ? <p className="gray">No benefits.</p> : '' }
          {benefits && benefits.rateAndBenefitsIdentifiers.map((benefit) => (
            <div className="mb4" key={benefit.id}>
              <h3 className="f5 fw5 mb3">{benefit.name}</h3>
              {benefit.description && <p>Description: {benefit.description}</p>}
              <p>Featured: {benefit.featured ? 'yes' : 'no'}</p>
              {benefit.matchedParameters['slaIds'] && <p>SLA Ids: {benefit.matchedParameters['slaIds']}</p>}
              {benefit.matchedParameters['product@CatalogSystem'] && <p>Product at Catalog System: {benefit.matchedParameters['product@CatalogSystem']}</p>}
              {benefit.matchedParameters['buyAndWin@Marketing'] && <p>Buy and Win at Marketing: {benefit.matchedParameters['buyAndWin@Marketing']}</p>}
            </div>
          ))}
        </div>

        <div className="mb5">
          <h2 className="f4 mb3">Items</h2>
          {orderForm.items.length == 0 ? <p className="gray">No items.</p> : '' }
          {orderForm.items.map((item) => (
            <div className="mb4" key={item.uniqueId}>
              <h3 className="f5 fw5 mb3">{item.skuName}</h3>
              <p>Product Id: {item.productId}</p>
              <p>SKU Id: {item.id}</p>
              <p>EAN: {item.ean || '-'}</p>
              <p>Quantity: {item.quantity}</p>
              <p>
                Seller: {item.seller} - {orderForm.sellers.map((seller) => (
                  <span>{seller.id === item.seller && <span>{seller.name}</span>}</span>
                ))}
              </p>
              <p>Category Ids: {item.productCategoryIds}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

Read.propTypes = {
}

export default Read
