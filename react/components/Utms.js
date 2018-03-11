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
      utmSource: e.target.value
    })
  }

  handleUtmMediumChange = (e) => {
    this.setState({
      ...this.state,
      utmMedium: e.target.value
    })
  }

  handleUtmCampaignChange = (e) => {
    this.setState({
      ...this.state,
      utmCampaign: e.target.value
    })
  }

  handleUtmiCampaignChange = (e) => {
    this.setState({
      ...this.state,
      utmiCampaign: e.target.value
    })
  }

  handleCouponChange = (e) => {
    this.setState({
      ...this.state,
      coupon: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.setUTMData(this.state)
  }

  componentWillMount() {
    if (!window.vtexjs || !window.vtexjs.checkout || !window.vtexjs.checkout.orderForm) return null
    const { orderForm } = window.vtexjs.checkout
    const mkt = orderForm.marketingData

    console.log(mkt.utmSource)

    this.setState({
      ...this.state,
      utmSource: mkt && mkt.utmSource ? mkt.utmSource : '',
      utmMedium: mkt && mkt.utmMedium ? mkt.utmMedium : '',
      utmCampaign: mkt && mkt.utmCampaign ? mkt.utmCampaign : '',
      utmiCampaign: mkt && mkt.utmCampaign ? mkt.utmiCampaign : '',
      coupon: mkt && mkt.coupon ? mkt.coupon : '',
    })
  }

  render() {
    const { isLoading } = this.props

    return (
      <form className="ph5 mv5" onSubmit={this.handleSubmit}>
        <div className="pb4">
          <Label htmlFor="utmSource">utm_source</Label>
          <Input autoFocus onChange={this.handleUtmSourceChange} id="utmSource" value={this.state.utmSource} />
        </div>
        <div className="pb4">
          <Label htmlFor="utmMedium">utm_medium</Label>
          <Input onChange={this.handleUtmMediumChange} id="utmMedium" value={this.state.utmMedium} />
        </div>
        <div className="pb4">
          <Label htmlFor="utmCampaign">utm_campaign</Label>
          <Input onChange={this.handleUtmCampaignChange} id="utmCampaign" value={this.state.utmCampaign} />
        </div>
        <div className="pb4">
          <Label htmlFor="utmCampaign">utmi_cp</Label>
          <Input onChange={this.handleUtmiCampaignChange} id="utmiCampaign" value={this.state.utmiCampaign} />
        </div>
        <div className="pb4">
          <Label htmlFor="coupon">Coupon</Label>
          <Input onChange={this.handleCouponChange} id="coupon" value={this.state.coupon} />
        </div>

        <div className="tc mt5">
        {
          isLoading
          ? (
            <Button submit disabled>
              <span className="flex items-center">
                <svg className="debug-loader flex-none mr3" version="1.1" x="0px" y="0px" viewBox="0 0 24 24" width="16" height="16">
                  <g transform="rotate(57.229285712486934 12 12)">
                    <circle opacity="0.4" fill="none" stroke="#111111" cx="12" cy="12" r="11"></circle>
                    <path fill="none" stroke="#111111" d="M12,1 c6.0751324,0,11,4.9248676,11,11"></path>
                  </g>
                </svg>
                <span className="flex-auto">
                  Set Marketing data
                </span>
              </span>
            </Button>
          )
          : <Button submit primary>Set Marketing data</Button>
        }
        </div>
      </form>
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
