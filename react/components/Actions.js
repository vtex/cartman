import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@vtex/styleguide/lib/Button'
import { generateUrl } from '../utils'
import { getOrderForm } from '../actions/index'
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Actions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      copied: 'false'
    }
  }


  handleResetCartButton = () => {
    window.vtexjs && window.vtexjs.checkout && window.vtexjs.checkout.removeAllItems()
  }

  handleCopyCartButton = () => {
    this.setState({copied: true})
    setTimeout(
      function() { this.setState({copied: false});
    }.bind(this), 2000)
  }

  componentDidMount(){
    if (!(window.vtexjs && window.vtexjs.checkout && window.vtexjs.checkout.orderForm)){
      this.props.getOrderForm(this.context.account)
    }
  }

  render() {
      if (!window.vtexjs && !this.props.orderForm){
        return (
          <h2> Loading </h2>
        )
      }
      return (
        <div className="pa4 w-100 cf">
          <div className="fl">
            <CopyToClipboard text={generateUrl((window.vtexjs && window.vtexjs.checkout && window.vtexjs.checkout.orderForm) || this.props.orderForm, this.context.account)}
               onCopy={this.handleCopyCartButton}>
              {
                this.state.copied === true
                ? <Button disabled>Copied to Clipboard!</Button>
                : <Button primary>Copy link to this Cart</Button>
              }
            </CopyToClipboard>
          </div>
          <div className="fr">
            <Button onClick={this.handleResetCartButton} secondary>Reset Cart</Button>
          </div>
        </div>
    )
  }
}


Actions.contextTypes = {
  account: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
  orderForm: state.orderForm
})

export default connect(mapStateToProps, {
  getOrderForm,
})(Actions)
