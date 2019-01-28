import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Label from './Label'
import Button from '@vtex/styleguide/lib/Button'
import ReactJson from 'react-json-tree'

const theme = {
  scheme: 'bright',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#000000',
  base01: '#303030',
  base02: '#505050',
  base03: '#b0b0b0',
  base04: '#d0d0d0',
  base05: '#e0e0e0',
  base06: '#f5f5f5',
  base07: '#ffffff',
  base08: '#fb0120',
  base09: '#fc6d24',
  base0A: '#fda331',
  base0B: '#a1c659',
  base0C: '#76c7b7',
  base0D: '#6fb3d2',
  base0E: '#d381c3',
  base0F: '#be643c'
};

const format = (raw, type) => {
  const style = {
    fontFamily: 'monospace',
    fontWeight: 'normal'
  }

  return (
    <strong style={style}>
      {type === 'label'
        ? raw + ': '
        : raw
      }
    </strong>
  )
}


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
              <ReactJson data={item} 
                          theme={theme} 
                          invertTheme={true} 
                          labelRenderer={(objTreePathArray) => format(objTreePathArray[0], 'label')} 
                          valueRenderer={(value) => format(value, 'value')}
              />
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
