import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import { FormattedMessage, intlShape } from 'react-intl'
import { getAccountName } from '../utils';

class Read extends Component {
  handleSetSelectedItem = (i) => {
    this.props.setSelectedItem(i)
    this.props.goToItemDetail()

    window.logSplunk({
      level: 'Debug',
      type: 'Info',
      workflowType: 'cartman',
      workflowInstance: 'clicked-detailed-item',
      event: { item: i },
      account: getAccountName(),
    });
  }

  render() {

    if (!window.vtexjs || !window.vtexjs.checkout || !window.vtexjs.checkout.orderForm) return null
    const { orderForm } = window.vtexjs.checkout

    return (
      <div className="ph5 mv5 lh-title">

        <div className="mb5">
          <h2 className="f4 mb3"><FormattedMessage id="cartman.items" /></h2>
          {orderForm.items.length == 0 ? <p className="gray"><FormattedMessage id="cartman.noItems" /></p> : ''}
          {orderForm.items.map((item, i) => (
            <div className="mb4" key={i}>
              <h3 className="f5 fw5 mb3">{item.skuName}</h3>
              <p><FormattedMessage id="cartman.categoryIds" />: {item.productCategoryIds}</p>
              <p>EAN: {item.ean || '-'}</p>
              <p><FormattedMessage id="cartman.productId" />: {item.productId}</p>
              <p><FormattedMessage id="cartman.quantity" />: {item.quantity}</p>
              <p>
                <FormattedMessage id="cartman.seller" />: {item.seller} - {orderForm.sellers.map((seller, j) => (
                  <span key={j}>{seller.id === item.seller && <span>{seller.name}</span>}</span>
                ))}
              </p>
              <p><FormattedMessage id="cartman.skyId" />: {item.id}</p>
              <div className="mv3">
                <Button secondary onClick={() => this.handleSetSelectedItem(i)}><FormattedMessage id="cartman.viewAllDetails" /></Button>
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
