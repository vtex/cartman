import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Label from './Label'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import Alert from '@vtex/styleguide/lib/Alert'

class FavoriteAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { isLoading } = this.props
    return (
      <div className="ph5 mv5">
        <div className="lh-copy f6 mb6">
          <Alert>
            Save Cart's contexts to easily recover it later.
          </Alert>
        </div>

        <div className="pb4">
          <Label htmlFor="name">Name</Label>
          <Input id="name" autoFocus />
        </div>

        <div className="tc mt5">
        {
          isLoading
          ? (
            <Button disabled>
              <span className="flex items-center">
                <svg className="debug-loader flex-none mr3" version="1.1" x="0px" y="0px" viewBox="0 0 24 24" width="16" height="16">
                  <g transform="rotate(57.229285712486934 12 12)">
                    <circle opacity="0.4" fill="none" stroke="#111111" cx="12" cy="12" r="11"></circle>
                    <path fill="none" stroke="#111111" d="M12,1 c6.0751324,0,11,4.9248676,11,11"></path>
                  </g>
                </svg>
                <span className="flex-auto">
                  Add Favorite
                </span>
              </span>
            </Button>
          )
          : <Button primary>Add Favorite</Button>
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.isLoading,
})

export default connect(mapStateToProps)(FavoriteAdd)
