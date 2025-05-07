import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@vtex/styleguide/lib/Button'
import Alert from '@vtex/styleguide/lib/Alert'
import { generateUrl, getAccountName } from '../utils'
import { getOrderForm } from '../actions/index'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FormattedMessage, intlShape } from 'react-intl'

class Actions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      copied: 'false',
      orderFormIdCopied: false
    }
  }

  handleResetCartButton = () => {
    if (window.vtexjs && window.vtexjs.checkout) {
      window.vtexjs.checkout.removeAllItems()
    }
  }

  handleCopyOFId = () => {
    this.setState({...this.state, orderFormIdCopied: true})
  }

  handleResetCopyOFIdButton = () => {
    this.setState({...this.state, orderFormIdCopied: false})
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
        <span className="mt5">
          <CopyToClipboard text={window.vtexjs?.checkout?.orderFormId} onCopy={this.handleCopyOFId}>
            {
              this.state.orderFormIdCopied
              ?  <Alert type="success" size="small" onClose={this.handleResetCopyOFIdButton}>
                  <FormattedMessage id="cartman.copiedCart"/>
                </Alert>
              : <Button size="small"><FormattedMessage id="cartman.copyCartId"/></Button>
            }
          </CopyToClipboard>
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
