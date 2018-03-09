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
    const { isLoading } = this.props
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
        {
          isLoading
          ? (
            <Button disabled>
              <span className="flex items-center">
                <svg className="debug-loader flex-none mr3" version="1.1" x="0px" y="0px" viewBox="0 0 24 24" width="16" height="16">
                  <g transform="rotate(57.229285712486934 12 12)">
                    <circle opacity="0.4" fill="none" stroke="#111111" cx="12" cy="12" r="11"></circle>
                    <path fill="none" stroke="#111111" d="M12,1 c6.0751324,0,11,4.9248676,11,11"></path>
                  </g>
                </svg>
                <span className="flex-auto">
                  Set UTMS
                </span>
              </span>
            </Button>
          )
          : <Button onClick={this.handleSubmit} primary>Set UTMS</Button>
        }
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
