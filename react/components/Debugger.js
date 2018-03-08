import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getOrderForm } from '../actions/index'
import { generateUrl } from '../utils'
import Button from '@vtex/styleguide/lib/Button';

class Debugger extends Component {

  componentDidMount(){
    if (!(window.vtexjs && window.vtexjs.checkout && window.vtexjs.checkout.orderForm)){
      this.props.getOrderForm(this.context.account)
    }
  }

  handleButtonClick = (e) => {
    window.vtexjs && window.vtexjs.checkout && window.vtexjs.checkout.removeAllItems()
  }

  render() {
    if (!window.vtexjs && !this.props.orderForm){
      return (
        <h2> Loading </h2>
      )
    }
    const generatedUrl = generateUrl((window.vtexjs && window.vtexjs.checkout && window.vtexjs.checkout.orderForm) || this.props.orderForm, this.context.account)

    return (
      <div>
      <Button secondary={true} onClick={this.handleButtonClick}> Clear cart</Button>
        <h3> Hello!</h3>
        {generatedUrl}
      </div>
    )
  }
}

Debugger.propTypes = {
  getOrderForm: PropTypes.func.isRequired
}

Debugger.contextTypes = {
  account: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
  orderForm: state.orderForm
})

export default connect(mapStateToProps, {
  getOrderForm,
})(Debugger)
