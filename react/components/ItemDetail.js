import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Label from './Label'
import Button from '@vtex/styleguide/lib/Button'
import ReactJson from 'react-json-view'

class ItemDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (!window.vtexjs || !window.vtexjs.checkout || !window.vtexjs.checkout.orderForm) return null

    const { orderForm } = window.vtexjs.checkout
    let item = null

    if (orderForm.items && orderForm.items[this.props.selectedItem]) {
      item = orderForm.items[this.props.selectedItem]
    }

    return (
      <div className="ph5 mv5 lh-title">
        {
          item && (
            <Fragment>
              <h2 className="f4 mb3">{item.skuName}</h2>
              <ReactJson src={item} />
            </Fragment>
          )
        }
      </div>
    )
  }
}

ItemDetail.propTypes = {
}

export default ItemDetail
