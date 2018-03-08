import React, { Component } from 'react'
import { canUseDOM } from 'exenv'
import PropTypes from 'prop-types'

class ClientSide extends Component {
  render() {
    if (canUseDOM) {
      return this.props.children
    }
    return null
  }
}

ClientSide.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ClientSide