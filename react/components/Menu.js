import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Menu extends Component {
  render() {
    return (
      <div onClick={this.props.onClick} className="bt b--light-gray pa6">
        <div className="pa2">
          {this.props.title}
        </div>
        <div className="pa2 gray f6">
          {this.props.description}
        </div>
      </div>
    )
  }
}

Menu.propTypes = {
}

export default Menu
