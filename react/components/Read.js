import React, { Component } from 'react'
import { intlShape } from 'react-intl'
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
    const { intl } = this.props
    if (!window.vtexjs || !window.vtexjs.checkout || !window.vtexjs.checkout.orderForm) return null
    const { orderForm } = window.vtexjs.checkout
    const mkt = orderForm.marketingData
    const benefits = orderForm.ratesAndBenefitsData
    return (
      <div className="ph5 mv5 lh-title">
        <div className="mb5">
          <h2 className="f4 mb3">{intl.formatMessage({ id: 'cartman.marketingData' })}</h2>
          {!mkt || (!mkt.utmSource && !mkt.utmMedium && !mkt.utmCampaign) ? <p className="gray">{intl.formatMessage({ id: 'cartman.noUtms' })}</p> : ''}
          {mkt && mkt.utmSource && (<p>utm_source: {mkt.utmSource}</p>)}
          {mkt && mkt.utmMedium && (<p>utm_medium: {mkt.utmMedium}</p>)}
          {mkt && mkt.utmCampaign && (<p>utm_campaign: {mkt.utmCampaign}</p>)}
          {mkt && mkt.coupon && (<p>{intl.formatMessage({ id: 'cartman.coupon' })}: {mkt.coupon}</p>)}
        </div>

        <div className="mb5">
          <h2 className="f4 mb3">{intl.formatMessage({ id: 'cartman.benefits' })}</h2>
          {!benefits || benefits.rateAndBenefitsIdentifiers.length == 0 ? <p className="gray">{intl.formatMessage({ id: 'cartman.noBenefits' })}</p> : '' }
          {benefits && benefits.rateAndBenefitsIdentifiers.map((benefit, i) => (
            <div className="mb4" key={i}>
              <h3 className="f5 fw5 mb3">{benefit.name}</h3>
              {benefit.description && <p>{intl.formatMessage({ id: 'cartman.description' })}: {benefit.description}</p>}
              <p>{intl.formatMessage({ id: 'cartman.featured' })}: {benefit.featured ? 'yes' : 'no'}</p>
              {benefit.matchedParameters['slaIds'] && <p>{intl.formatMessage({ id: 'cartman.slaIds' })}: {benefit.matchedParameters['slaIds']}</p>}
              {benefit.matchedParameters['product@CatalogSystem'] && <p>{intl.formatMessage({ id: 'cartman.productAtCatalogSystem' })}: {benefit.matchedParameters['product@CatalogSystem']}</p>}
              {benefit.matchedParameters['buyAndWin@Marketing'] && <p>{intl.formatMessage({ id: 'cartman.buyAndWin' })}: {benefit.matchedParameters['buyAndWin@Marketing']}</p>}
            </div>
          ))}
        </div>

        <div className="mb5">
          <h2 className="f4 mb3">{intl.formatMessage({ id: 'cartman.items' })}</h2>
          {orderForm.items.length == 0 ? <p className="gray">{intl.formatMessage({ id: 'cartman.noItems' })}</p> : '' }
          {orderForm.items.map((item, i) => (
            <div className="mb4" key={i}>
              <h3 className="f5 fw5 mb3">{item.skuName}</h3>
              <p>{intl.formatMessage({ id: 'cartman.categoryIds' })}: {item.productCategoryIds}</p>
              <p>EAN: {item.ean || '-'}</p>
              <p>{intl.formatMessage({ id: 'cartman.productId' })}: {item.productId}</p>
              <p>{intl.formatMessage({ id: 'cartman.quantity' })}: {item.quantity}</p>
              <p>
                {intl.formatMessage({ id: 'cartman.seller' })}: {item.seller} - {orderForm.sellers.map((seller, j) => (
                  <span key={j}>{seller.id === item.seller && <span>{seller.name}</span>}</span>
                ))}
              </p>
              <p>{intl.formatMessage({ id: 'cartman.skyId' })}: {item.id}</p>
              <div className="mv3">
                <Button secondary onClick={() => this.handleSetSelectedItem(i)}>{intl.formatMessage({ id: 'cartman.viewAllDetails' })}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

Read.propTypes = {
  intl: intlShape,
}

export default Read
