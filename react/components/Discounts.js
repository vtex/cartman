import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import { logEvent } from '../utils/analytics'


const SuccessColorfulIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12C21 16.971 16.971 21 12 21Z" fill="hsla(123, 41%, 37%, 1)"></path>
    <path strokeWidth="1.5" d="M16 10L11 15L8 12" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

const PromotionsSimulatorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4675 19.6839C16.0055 19.6839 19.6845 16.0049 19.6845 11.4669C19.6845 6.92888 16.0055 3.24988 11.4675 3.24988C6.92949 3.24988 3.25049 6.92888 3.25049 11.4669C3.25049 16.0049 6.92949 19.6839 11.4675 19.6839ZM11.4675 18.1839C7.75749 18.1839 4.75049 15.1769 4.75049 11.4669C4.75049 7.75688 7.75749 4.74988 11.4675 4.74988C15.1775 4.74988 18.1845 7.75688 18.1845 11.4669C18.1845 15.1769 15.1775 18.1839 11.4675 18.1839Z" fill="white" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5302 19.4703L17.2802 16.2203C16.9882 15.9273 16.5122 15.9273 16.2202 16.2203C15.9272 16.5123 15.9272 16.9883 16.2202 17.2803L19.4702 20.5303C19.7622 20.8233 20.2382 20.8233 20.5302 20.5303C20.8232 20.2383 20.8232 19.7623 20.5302 19.4703Z" fill="white" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.89843 14.0968L14.0984 9.89682C14.3904 9.60482 14.3904 9.12882 14.0984 8.83682C13.8054 8.54382 13.3304 8.54382 13.0374 8.83682L8.83743 13.0368C8.54443 13.3288 8.54443 13.8048 8.83743 14.0968C9.13043 14.3898 9.60543 14.3898 9.89843 14.0968Z" fill="white" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2956 12.9184C14.6576 13.3084 14.6466 13.9164 14.2696 14.2894C13.8806 14.6784 13.2516 14.6754 12.8696 14.2894C12.4806 13.9004 12.4836 13.2724 12.8666 12.8934C13.2426 12.5134 13.8506 12.5014 14.2416 12.8634C14.2506 12.8724 14.2606 12.8814 14.2696 12.8904L14.2956 12.9184Z" fill="white" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0639 8.66046C10.4379 9.05046 10.4299 9.66746 10.0489 10.0445C9.65987 10.4335 9.03187 10.4305 8.64687 10.0415C8.26287 9.65346 8.26387 9.02646 8.65187 8.64246C9.03587 8.26346 9.65187 8.25946 10.0369 8.63346L10.0639 8.66046Z" fill="white" />
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
    const attempt = window.sessionStorage.getItem('promotions-simulator-attempt')

    if (!attempt) {
      window.sessionStorage.setItem('promotions-simulator-attempt', 1)
    }

    const doNotShowFeedbackBefore = window.localStorage.getItem('vtex-promotions-simulator-feedback-do-not-show-before')

    if (!doNotShowFeedbackBefore) {
      const now = new Date()
      window.localStorage.setItem('vtex-promotions-simulator-feedback-do-not-show-before', now.toISOString())
    }

    const discountsApplied = Boolean(window.vtexjs?.checkout?.orderForm?.ratesAndBenefitsData?.rateAndBenefitsIdentifiers?.length)
    logEvent("Promotions Details Viewed", { discountsApplied })
  }

  handlePromotionsSimulatorOpen = () => {
    const orderFormId = window.vtexjs.checkout.orderFormId;
    const attempt = Number(window.sessionStorage.getItem('promotions-simulator-attempt'))

    const simulatorWindow = window.open(`/admin/app/promotions-simulator?orderFormId=${orderFormId}${attempt > 1 ? `&attempt=${attempt}` : ""}`, "_blank", "width=1200,height=700,menubar=no,status=no,toolbar=no,titlebar=no")

    logEvent("Promotions Simulator Initialized", {
      promotionsApplied: window.vtexjs?.checkout?.orderForm?.ratesAndBenefitsData?.rateAndBenefitsIdentifiers?.length,
      itemsInCart: window.vtexjs?.checkout?.orderForm.items.length,
      attempt
    })

    window.sessionStorage.setItem('promotions-simulator-attempt', attempt + 1)

    simulatorWindow.sessionStorage.setItem('vtex-promotions-simulator-session-id', window.sessionStorage.getItem('vtex-promotions-simulator-session-id'))

    const doNotShowFeedbackBefore = new Date(window.localStorage.getItem('vtex-promotions-simulator-feedback-do-not-show-before'))

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
      return <iframe className='w-100 h-100 nb3 b--none' src='/admin/app/promotions-simulator/feedback'></iframe>
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
                </div>
              ))} </div>}

            <div className='mt6'>
              <Button primary onClick={this.handlePromotionsSimulatorOpen}>
                <div className='flex items-center'>
                  <span className='pr3'>
                    <PromotionsSimulatorIcon />
                  </span>
                  <FormattedMessage id="cartman.openPromotionsSimulator" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default Discounts
