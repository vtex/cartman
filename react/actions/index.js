
import {
  parseJSON,
  checkStatus,
  getCheckoutCookie,
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
