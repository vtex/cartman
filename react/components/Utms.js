import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'

class Utms extends Component {
  render() {
    return (
      <div className="ph4">
        <p>
          <Label htmlFor="utmSource">utm_source</Label>
          <Input htmlProps={{ id: 'utm_source' }} />
        </p>
        <p>
          <Label htmlFor="utmCampaign">utm_campaign</Label>
          <Input htmlProps={{ id: 'utmCampaign' }} />
        </p>
        <p>
          <Label htmlFor="utmMedium">utm_medium</Label>
          <Input htmlProps={{ id: 'utmMedium' }} />
        </p>

        <div className="tc">
          <Button primary>Add UTMs to Cart</Button>
        </div>
      </div>
    )
  }
}

Utms.propTypes = {
}

export default Utms
