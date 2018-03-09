import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'

class Read extends Component {
  render() {
    return (
      <div className="ph4 mb5">
        <h1>Cart context</h1>
        <h2>UTMs</h2>
        <p>
          utm_source: instagram
        </p>
        <p>
          utm_medium: newsletter
        </p>
        <p>
          utm_campaign: Dia das Mães
        </p>
        <h1>Items</h1>
        <h2><marquee behavior="alternate">Novalgina</marquee></h2>
        <h3>Applied benefits</h3>
        <p>
          Frete Grátis
        </p>
        <p>
          10% Primeira Compra
        </p>
        <p>
          20% Dia das Mães
        </p>
        <h3>Seller</h3>
        <p>
          Drogaria SP
        </p>
      </div>
    )
  }
}

Read.propTypes = {
}

export default Read
