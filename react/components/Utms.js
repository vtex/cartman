import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import { setUTMData } from '../actions/index'
import { FormattedMessage, intlShape } from 'react-intl'
import { getAccountName } from '../utils';

class Utms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmiCampaign: '',
      coupon: '',
    }
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
    window.logSplunk({
      level: 'Debug',
      type: 'Info',
      workflowType: 'cartman',
      workflowInstance: 'clicked-add-marketing-data',
      event: {isOpen: this.state},
      account: getAccountName(),
    });
  }

  componentWillMount() {
    if (!window.vtexjs || !window.vtexjs.checkout || !window.vtexjs.checkout.orderForm) return null
    const { orderForm } = window.vtexjs.checkout
    const mkt = orderForm.marketingData

    if (mkt) {
      this.setState({
        ...this.state,
        utmSource: mkt.utmSource ? mkt.utmSource : '',
        utmMedium: mkt.utmMedium ? mkt.utmMedium : '',
        utmCampaign: mkt.utmCampaign ? mkt.utmCampaign : '',
        utmiCampaign: mkt.utmCampaign ? mkt.utmiCampaign : '',
        coupon: mkt.coupon ? mkt.coupon : '',
      })
    }

  }

  render() {
    const { intl, isLoading } = this.props

    return (
      <form className="ph5 mv5" onSubmit={this.handleSubmit}>
        <div className="pb4">
          <Label htmlFor="utmSource">utm_source</Label>
          <Input autoComplete="off" autoFocus onChange={this.handleUtmSourceChange} id="utmSource" value={this.state.utmSource} />
        </div>
        <div className="pb4">
          <Label htmlFor="utmMedium">utm_medium</Label>
          <Input autoComplete="off" onChange={this.handleUtmMediumChange} id="utmMedium" value={this.state.utmMedium} />
        </div>
        <div className="pb4">
          <Label htmlFor="utmCampaign">utm_campaign</Label>
          <Input autoComplete="off" onChange={this.handleUtmCampaignChange} id="utmCampaign" value={this.state.utmCampaign} />
        </div>
        <div className="pb4">
          <Label htmlFor="utmiCampaign">utmi_cp</Label>
          <Input autoComplete="off" onChange={this.handleUtmiCampaignChange} id="utmiCampaign" value={this.state.utmiCampaign} />
        </div>
        <div className="pb4">
          <Label htmlFor="coupon"><FormattedMessage id="cartman.coupon"/></Label>
          <Input autoComplete="off" onChange={this.handleCouponChange} id="coupon" value={this.state.coupon} />
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
                  <FormattedMessage id="cartman.setMarketingData"/>
                </span>
              </span>
            </Button>
          )
          : <Button type="submit" primary><FormattedMessage id="cartman.setMarketingData"/></Button>
        }
        </div>
      </form>
    )
  }
}

Utms.propTypes = {
  setUTMData: PropTypes.func.isRequired,
  intl: intlShape,
}

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.isLoading,
})

export default connect(mapStateToProps, {
  setUTMData,
})(Utms)
