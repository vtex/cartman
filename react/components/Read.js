import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'

class Read extends Component {
  handleSetSelectedItem = (i) => {
    this.props.setSelectedItem(i)
    this.props.goToItemDetail()

    window.logSplunk({
      level: 'Debug',
      type: 'Info',
      workflowType: 'cartman',
      workflowInstance: 'clicked-detailed-item',
      event: {item: i}
    });
  }

  render() {
    if (!window.vtexjs || !window.vtexjs.checkout || !window.vtexjs.checkout.orderForm) return null
    const { orderForm } = window.vtexjs.checkout
    const mkt = orderForm.marketingData
    const benefits = orderForm.ratesAndBenefitsData
    return (
      <div className="ph5 mv5 lh-title">
        <div className="mb5">
          <h2 className="f4 mb3">Marketing data</h2>
          {!mkt || (!mkt.utmSource && !mkt.utmMedium && !mkt.utmCampaign && !mkt.utmiCampaign) ? <p className="gray">No UTMs.</p> : ''}
          {mkt && mkt.utmSource && (<p>utm_source: {mkt.utmSource}</p>)}
          {mkt && mkt.utmMedium && (<p>utm_medium: {mkt.utmMedium}</p>)}
          {mkt && mkt.utmCampaign && (<p>utm_campaign: {mkt.utmCampaign}</p>)}
          {mkt && mkt.utmiCampaign && (<p>utmi_campaign: {mkt.utmiCampaign}</p>)}
          {mkt && mkt.coupon && (<p>Coupon: {mkt.coupon}</p>)}
        </div>

        <div className="mb5">
          <h2 className="f4 mb3">Benefits</h2>
          {!benefits || benefits.rateAndBenefitsIdentifiers.length == 0 ? <p className="gray">No benefits.</p> : '' }
          {benefits && benefits.rateAndBenefitsIdentifiers.map((benefit, i) => (
            <div className="mb4" key={i}>
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
          {orderForm.items.map((item, i) => (
            <div className="mb4" key={i}>
              <h3 className="f5 fw5 mb3">{item.skuName}</h3>
              <p>Category Ids: {item.productCategoryIds}</p>
              <p>EAN: {item.ean || '-'}</p>
              <p>Product Id: {item.productId}</p>
              <p>Quantity: {item.quantity}</p>
              <p>
                Seller: {item.seller} - {orderForm.sellers.map((seller, j) => (
                  <span key={j}>{seller.id === item.seller && <span>{seller.name}</span>}</span>
                ))}
              </p>
              <p>SKU Id: {item.id}</p>
              <div className="mv3">
                <Button secondary onClick={() => this.handleSetSelectedItem(i)}>View all details</Button>
              </div>
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
