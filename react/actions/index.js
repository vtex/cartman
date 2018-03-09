
import {
  parseJSON,
  checkStatus,
  getCheckoutCookie
} from './utils'
import {
  buildQueryString,
  selectFromPossibleItems,
} from '../utils/'
import {
  RECEIVE_ORDERFORM,
  RECEIVE_SIMULATION,
  ADD_TO_CART,
  ADDED_TO_CART
} from './types'
import Promise from 'bluebird'
import Sidebar from '../components/Sidebar'


export const receiveOrderForm = orderForm => ({
  type: RECEIVE_ORDERFORM,
  orderForm,
})

export const receiveSimulation = simulation => ({
  type: RECEIVE_ORDERFORM,
  simulation,
})

export const addToCart = () => ({
  type: ADD_TO_CART,
})

export const addedToCart = () => ({
  type: ADDED_TO_CART,
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

export const searchCatalog = (jsonObject) => dispatch => {
  dispatch(addToCart())
  return fetch(buildQueryString(jsonObject), {
    credentials: 'same-origin',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then((possibleItems) => {
      dispatch(selectPossibleItems(possibleItems, jsonObject["numberOfItems"], jsonObject["itemsSellers"]))
    })

}

export const selectPossibleItems = (possibleItems, number = 0, seller = 1) => dispatch => {
  const items = selectFromPossibleItems(possibleItems, number, seller)
  console.log("aquiii")
  console.log(items)
  return window.vtexjs.checkout.addToCart(items, null, 1)
  .then(() => {
    dispatch(addedToCart())
  })
}