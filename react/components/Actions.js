import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@vtex/styleguide/lib/Button'

class Actions extends Component {
  render() {
    return (
      <div className="pa4 w-100 cf">
        <div className="fl">
          <Button primary>Copy this Cart</Button>
        </div>
        <div className="fr">
          <Button secondary>Reset Cart</Button>
        </div>
      </div>
    )
  }
}

Actions.propTypes = {
}

export default Actions
