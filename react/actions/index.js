
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

export const searchCatalog = (jsonObject, salesChannel) => dispatch => {
  dispatch(addToCart())
  return fetch(buildQueryString(jsonObject), {
    credentials: 'same-origin',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then((possibleItems) => {
      dispatch(selectPossibleItems(possibleItems, jsonObject["numberOfItems"], jsonObject["itemsSellers"], jsonObject["itemsQuantity"], salesChannel))
    })
}

export const selectPossibleItems = (possibleItems, number = 1, seller = 1, quantity = 1, salesChannel) => dispatch => {
  dispatch(addToCart())
  const items = selectFromPossibleItems(possibleItems, number, seller, quantity)
  return window.vtexjs.checkout.addToCart(items, null, salesChannel)
  .then(() => {
    dispatch(addedToCart())
  })
}

export const addSpecifiedSku = (jsonObject, salesChannel) => dispatch => {
  dispatch(addToCart())
  var skuIds = jsonObject["skuIds"].split(",");
  var skuArray = [];
  skuIds.map((skuId) => {
    skuArray.push({id: skuId.trim(), quantity: jsonObject["itemsQuantity"], seller: jsonObject["sellerId"]});
  })
  return window.vtexjs.checkout.addToCart(skuArray, null, salesChannel)
  .then(() => {
    dispatch(addedToCart())
  })
}

export const setUTMData = (jsonObject) => dispatch => {
  dispatch(addToCart())

  return window.vtexjs.checkout.sendAttachment('marketingData', jsonObject)
  .then(() => {
    dispatch(addedToCart())
  })
}
