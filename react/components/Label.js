import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Label extends Component {
  render() {
    return (
      <label className="db mb3" htmlFor={this.props.htmlFor}>{this.props.children}</label>
    )
  }
}

Label.propTypes = {
}

export default Label
