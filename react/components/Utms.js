import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'

class Utms extends Component {
  render() {
    return (
      <div className="ph4 mb5">
        <div className="pb4">
          <Label htmlFor="utmSource">utm_source</Label>
          <Input id="utmSource" />
        </div>
        <div className="pb4">
          <Label htmlFor="utmCampaign">utm_campaign</Label>
          <Input id="utmCampaign" />
        </div>
        <div className="pb4">
          <Label htmlFor="utmMedium">utm_medium</Label>
          <Input id="utmMedium" />
        </div>

        <div className="tc">
          <Button primary>Add UTMs to Context</Button>
        </div>
      </div>
    )
  }
}

Utms.propTypes = {
}

export default Utms
