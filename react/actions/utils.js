import Cookies from 'js-cookie'

export const getCheckoutCookie = () => {
  return Cookies.get('checkout.vtex.com')
}

export const getSalesChannelCookie = () => {
  return Cookies.get('VTEXSC')
}

export const parseJSON = response => {
  return response.json()
}

export const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw response
}