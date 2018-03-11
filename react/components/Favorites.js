import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Favorite from './Favorite'

class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { isLoading } = this.props
    return (
      <div>
        <Favorite title="Lot of items" description="3 items" />
        <Favorite title="Free shipping" description="7 items" />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.isLoading,
})

export default connect(mapStateToProps)(Favorites)
