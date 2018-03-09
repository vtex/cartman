
import {
  parseJSON,
  checkStatus,
  getCheckoutCookie,
  buildQueryString,
  selectFromPossibleItems,
} from './utils'

import {
  RECEIVE_ORDERFORM,
} from './types'

export const receiveOrderForm = orderForm => ({
  type: RECEIVE_ORDERFORM,
  orderForm,
})


export const getOrderForm = (account) => dispatch => {
  const checkoutCookie = getCheckoutCookie()
  return fetch(`/api/checkout/pub/orderForm`, {
    credentials: 'same-origin',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then((orderForm) => {
      dispatch(receiveOrderForm(orderForm))
    })

}


export const getPossibleItems = (jsonObject) => dispatch => {
  return fetch(buildQueryString(account,jsonObject), {
    credentials: 'same-origin',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then((possibleItems) => {
      dispatch(selectFromPossibleItems(possibleItems, jsonObject["number"], jsonObject["seller"]))
    })

}

export const selectFromPossibleItems = (possibleItems, number, seller) => dispatch {
  
}