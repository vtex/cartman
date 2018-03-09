import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import { setUTMData } from '../actions/index'

class Utms extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleUtmSourceChange = (e) => {
    this.setState({
      ...this.state,
      utmMedium: e.target.value
    })
  }

  handleUtmSourceChange = (e) => {
    this.setState({
      ...this.state,
      utmCampaign: e.target.value
    })
  }

  handleUtmSourceChange = (e) => {
    this.setState({
      ...this.state,
      utmSource: e.target.value
    })
  }

  handleSubmit = (e) => {
    this.props.setUTMData(this.state)
  }

  render() {
    return (
      <div className="ph5 mv5">
        <div className="pb4">
          <Label htmlFor="utmSource">utm_source</Label>
          <Input onChange={this.handleUtmSourceChange} id="utmSource" />
        </div>
        <div className="pb4">
          <Label htmlFor="utmCampaign">utm_campaign</Label>
          <Input onChange={this.handleUtmCampaignChange} id="utmCampaign" />
        </div>
        <div className="pb4">
          <Label htmlFor="utmMedium">utm_medium</Label>
          <Input onChange={this.handleUtmMediumChange} id="utmMedium" />
        </div>

        <div className="tc mt5">
          <Button onClick={this.handleSubmit} primary>Set UTMs</Button>
        </div>
      </div>
    )
  }
}

Utms.propTypes = {
  setUTMData: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.isLoading,
})

export default connect(mapStateToProps, {
  setUTMData,
})(Utms)
