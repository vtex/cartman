import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@vtex/styleguide/lib/Button'
import {generateUrl} from '../utils'
import {getOrderForm} from '../actions/index'
import {CopyToClipboard} from 'react-copy-to-clipboard';

class FavoriteActions extends Component {
	constructor(props) {
		super(props)
	}

	handleImport = () => {
    this.props.goToFavoritesImport()
	}

	handleExport = () => {
	}

	render() {
		return (<div className="pa5 w-100 cf bb b--light-gray tc">
			<div className="dib mr4">
				<Button onClick={this.handleImport} secondary>Import</Button>
			</div>
			<div className="dib">
				<Button onClick={this.handleExport} secondary>Export</Button>
			</div>
		</div>)
	}
}

const mapStateToProps = (state, ownProps) => ({orderForm: state.orderForm})

export default connect(mapStateToProps, {getOrderForm})(FavoriteActions)
