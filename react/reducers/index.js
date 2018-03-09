import * as types from '../actions/types'
const initialState = {isLoading: true}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_ORDERFORM: {
      return {
        ...state,
        orderForm: action.orderForm,
      }
    }
    case types.ADD_TO_CART: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case types.ADDED_TO_CART: {
      return {
        ...state,
        isLoading: false,
        addedTocart: true,
      }
    }
    default:
      return state
  }
}
