import Badge from '@vtex/styleguide/lib/Badge'
import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { logEvent } from '../utils/analytics'
import Menu from './Menu'

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="currentColor" viewBox="0 0 256 256" opacity="1">
      <rect width="16rem" height="16rem" fill="none"></rect>
      <polyline points="216 100 215.992 40.008 156 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="18"></polyline>
      <line x1="143.9714" y1="112.0286" x2="215.9714" y2="40.0286" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="18"></line>
      <path d="M184,144v64a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8h64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="18"></path>
    </svg>
  )
}

class Simulator extends Component {
  componentDidMount = () => {
    const attempt = window.sessionStorage.getItem('promotions-simulator-attempt')

    if (!attempt) {
      window.sessionStorage.setItem('promotions-simulator-attempt', 1)
    }
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
  }

  render() {
    return (
      <Menu onClick={this.handlePromotionsSimulatorOpen}
        title={<div className='flex items-center hide-child h-100'>
          <FormattedMessage id="cartman.promotionsSimulator" />

          <div className='ph3'>
            <Badge>
              <FormattedMessage id="cartman.general.new" />
            </Badge>
          </div>


          <div className='child flex'>
            <ExternalLinkIcon />
          </div>
        </div>} />
    )
  }
}

export default Simulator
