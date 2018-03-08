import * as types from '../actions/types'
const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_ORDERFORM: {
      return {
        ...state,
        orderForm: action.orderForm,
      }
    }
    default:
      return state
  }
}