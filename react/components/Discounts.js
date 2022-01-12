import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import Cookies from 'js-cookie'
import Button from '@vtex/styleguide/lib/Button'
import { logEvent } from '../actions/amplitude'

const SuccessColorfulIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12C21 16.971 16.971 21 12 21Z" fill="hsla(123, 41%, 37%, 1)"></path>
    <path strokeWidth="1.5" d="M16 10L11 15L8 12" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

class Discounts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showFeedback: false
    }
  }

  componentDidMount = () => {
    const attempt = window.sessionStorage.getItem('promotions-analyzer-attempt')

    if (!attempt) {
      window.sessionStorage.setItem('promotions-analyzer-attempt', 1)
    }

    const doNotShowFeedbackBefore = window.localStorage.getItem('vtex-promotions-analyzer-feedback-do-not-show-before')

    if (!doNotShowFeedbackBefore) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      window.localStorage.setItem('vtex-promotions-analyzer-feedback-do-not-show-before', tomorrow.toISOString())
    }

    const hasDiscountsApplied = Boolean(window.vtexjs?.checkout?.orderForm?.ratesAndBenefitsData?.rateAndBenefitsIdentifiers?.length)
    logEvent("Promotion Details Viewed", { "Discounts applied?": hasDiscountsApplied ? "Yes" : "No" })
  }

  handlePromotionsAnalyzerOpen = () => {
    const orderFormId = window.vtexjs.checkout.orderFormId;
    const attempt = Number(window.sessionStorage.getItem('promotions-analyzer-attempt'))

    // TODO @vlaux remove when bundles/trace izs available on stable
    Cookies.set('vtex-commerce-env', 'beta')

    const simulatorWindow = window.open(`/admin/app/promotions-analyzer?orderFormId=${orderFormId}${attempt > 1 ? `&attempt=${attempt}` : ""}`, "_blank", "width=1200,height=700,menubar=no,status=no,toolbar=no,titlebar=no")

    logEvent("Promotion Analyzer Initialized", { "Volume of Promotions on Cart": window.vtexjs?.checkout?.orderForm?.ratesAndBenefitsData?.rateAndBenefitsIdentifiers?.length, "Number of attempts": attempt })

    window.sessionStorage.setItem('promotions-analyzer-attempt', attempt + 1)

    const doNotShowFeedbackBefore = new Date(window.localStorage.getItem('vtex-promotions-analyzer-feedback-do-not-show-before'))

    if (doNotShowFeedbackBefore < new Date()) {
      const feedbackTimer = setInterval(function () {
        if (simulatorWindow.closed) {
          this.setState({ showFeedback: true })

          clearInterval(feedbackTimer);
        }
      }.bind(this), 1000);
    }
  }

  render() {
    if (this.state.showFeedback) {
      return <iframe className='w-100 h-100 nb3 b--none' src='/admin/app/promotions-analyzer/feedback'></iframe>
    }

    if (!window.vtexjs || !window.vtexjs.checkout || !window.vtexjs.checkout.orderForm) return null
    const { orderForm } = window.vtexjs.checkout
    const mkt = orderForm.marketingData
    const benefits = orderForm.ratesAndBenefitsData

    return (
      <div className="ph5 mv5 lh-title">
        <div className="mb5">
          <h2 className="f4 mb3"><FormattedMessage id="cartman.marketingData" /></h2>
          {!mkt || (!mkt.utmSource && !mkt.utmMedium && !mkt.utmCampaign) ? <p className="gray"><FormattedMessage id="cartman.noUtms" /></p> : ''}
          {mkt && mkt.utmSource && (<p>utm_source: {mkt.utmSource}</p>)}
          {mkt && mkt.utmMedium && (<p>utm_medium: {mkt.utmMedium}</p>)}
          {mkt && mkt.utmCampaign && (<p>utm_campaign: {mkt.utmCampaign}</p>)}
          {mkt && mkt.coupon && (<p><FormattedMessage id="cartman.coupon" />: {mkt.coupon}</p>)}
        </div>

        <div className="mb5">

          <div className='flex items-center'>
            <div className='h2 w2 nl2 mr2'>
              <SuccessColorfulIcon />
            </div>
            <h2 className="f4"><FormattedMessage id="cartman.benefits" /></h2>
          </div>

          <div className='mt4'>
            {!benefits || benefits.rateAndBenefitsIdentifiers.length == 0 ? <p className="gray"><FormattedMessage id="cartman.noBenefits" /></p> : <div>
              {benefits && benefits.rateAndBenefitsIdentifiers.map((benefit, i) => (
                <div className="mb4" key={i}>
                  <h3 className="f5 fw5 mb3">{benefit.name}</h3>
                  {benefit.description && <p><FormattedMessage id="cartman.description" />: {benefit.description}</p>}
                  <p><FormattedMessage id="cartman.featured" />: {benefit.featured ? <FormattedMessage id="cartman.general.yes" /> : <FormattedMessage id="cartman.general.no" />}</p>
                  {benefit.matchedParameters['slaIds'] && <p><FormattedMessage id="cartman.slaIds" />: {benefit.matchedParameters['slaIds']}</p>}
                  {benefit.matchedParameters['product@CatalogSystem'] && <p><FormattedMessage id="cartman.productAtCatalogSystem" />: {benefit.matchedParameters['product@CatalogSystem']}</p>}
                  {benefit.matchedParameters['buyAndWin@Marketing'] && <p><FormattedMessage id="cartman.buyAndWin" />: {benefit.matchedParameters['buyAndWin@Marketing']}</p>}
                </div>
              ))}

              <div className='mt6'>
                <Button secondary onClick={this.handlePromotionsAnalyzerOpen}>
                  <FormattedMessage id="cartman.openPromotionsAnalyzer" />
                </Button>
              </div>
            </div>}
          </div>
        </div>
      </div >
    )
  }
}

export default Discounts
