import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Favorite extends Component {
  render() {
    return (
      <div className="flex items-stretch bb b--light-gray hover-bg-near-white">
        <div className="flex-auto pv4 ph5 pointer hover-bg-blue hover-white" onClick={this.props.onClick}>
          <div className="f4">
            {this.props.title}
          </div>
          <div className="f6 o-60">
            {this.props.description}
          </div>
        </div>
        <div className="flex items-center flex-none ph5 pointer" onClick={this.props.onRemove}>
          <svg className="flex-none" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="#FF4C4C" d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
          </svg>
        </div>
      </div>
    )
  }
}

Favorite.propTypes = {
}

export default Favorite
