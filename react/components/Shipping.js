import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class Shipping extends Component {
  render() {
    if (!window.vtexjs || !window.vtexjs.checkout || !window.vtexjs.checkout.orderForm) return null
    const { orderForm } = window.vtexjs.checkout

    return (
      <div className="ph5 mv5 lh-title">
        <div className="mb5">
          <h2 className="f4 mb3">Shipping Data</h2>
          {
            !vtexjs.checkout.orderForm.shippingData || vtexjs.checkout.orderForm.shippingData.selectedAddresses.length === 0 ? (
              <p className="gray">No location provided.</p>
            ) : (
              <Fragment>
                {
                  vtexjs.checkout.orderForm.shippingData.logisticsInfo.map((item, i) => (
                    <Fragment>
                      <h3 className="f5 fw5 mb3">{item.itemId}</h3>
                      <p key={i}>Selected SLA: <strong>{item.selectedSla}</strong></p>
                      <p key={i}>Selected Delivery Channel: <strong>{item.selectedDeliveryChannel}</strong></p>
                      <p key={i}>Selected Delivery Channel: <strong>{item.selectedDeliveryChannel}</strong></p>
                    </Fragment>
                  ))
                }
              </Fragment>
            )
          }
        </div>
      </div>
    )
  }
}

Shipping.propTypes = {
}

export default Shipping
