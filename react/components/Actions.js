import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@vtex/styleguide/lib/Button'
import { generateUrl, getAccountName } from '../utils'
import { getOrderForm } from '../actions/index'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FormattedMessage, intlShape } from 'react-intl'

class Actions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      copied: 'false'
    }
  }

  handleResetCartButton = () => {
    if (window.vtexjs && window.vtexjs.checkout) {
      window.vtexjs.checkout.removeAllItems()
    }
  }

  handleCopyCartButton = () => {
    this.setState({copied: true})
    setTimeout(
      function() { this.setState({copied: false});
    }.bind(this), 2000)

    window.logSplunk({
      level: 'Debug',
      type: 'Info',
      workflowType: 'cartman',
      workflowInstance: 'clicked-copy',
      account: getAccountName(),
    });

  }

  componentDidMount(){
    if (!(window.vtexjs && window.vtexjs.checkout && window.vtexjs.checkout.orderForm)){
      this.props.getOrderForm(this.context.account)
    }
  }

  render() {

    return (
      <div className="pa5 w-100 cf bb b--light-gray tc">
        <span className="mr4">
          <CopyToClipboard text={generateUrl((window.vtexjs && window.vtexjs.checkout && window.vtexjs.checkout.orderForm) || this.props.orderForm, this.context.account)}
             onCopy={this.handleCopyCartButton}>
            {
              this.state.copied === true
              ? <Button disabled><FormattedMessage id="cartman.copiedCart"/></Button>
              : <Button primary><FormattedMessage id="cartman.copyCart"/></Button>
            }
          </CopyToClipboard>
        </span>
        <span>
          <Button onClick={this.handleResetCartButton} secondary><FormattedMessage id="cartman.emptyCart"/></Button>
        </span>
      </div>
    )
  }
}


Actions.contextTypes = {
  account: PropTypes.string,
  intl: intlShape,
};

const mapStateToProps = (state, ownProps) => ({
  orderForm: state.orderForm
})

export default connect(mapStateToProps, {
  getOrderForm,
})(Actions)
