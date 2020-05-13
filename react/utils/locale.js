/* global __RUNTIME__ */
import pick from 'lodash/pick'
import isEmpty from 'lodash/isEmpty'
import localMessages from '../locales'

const I18N_GLOBAL_KEYS = [
  'cart',
  'clientProfileData',
  'countries',
  'global',
  'modal',
  'orderBy',
  'paymentData',
  'shippingData',
  'totalizers',
]

let i18nMessages

export const getGlobalI18n = () => (window.vtex && window.vtex.i18n) || {}

export const getGlobalLocale = () => {
  const i18n = getGlobalI18n()
  return (
    (i18n && i18n.getLocale && i18n.getLocale()) || __RUNTIME__.culture.locale
  )
}

const getPrefixedKey = (key, prefix) => (prefix ? `${prefix}.${key}` : key)

const getFlatMessage = (messages, key, prefix) => {
  if (!messages[key] || typeof messages[key] === 'object') {
    return undefined
  }

  const finalKey = getPrefixedKey(key, prefix)
  return {
    [finalKey]: messages[key],
  }
}

export const getFlatMessages = (messages, filter, prefix) => {
  const messagesObj = isEmpty(filter) ? messages : pick(messages, filter)
  let flatMessages = {}
  if (messagesObj) {
    Object.keys(messagesObj).forEach(key => {
      const newMessages =
        typeof messagesObj[key] !== 'object'
          ? getFlatMessage(messagesObj, key, prefix)
          : getFlatMessages(
            messagesObj[key],
            undefined,
            getPrefixedKey(key, prefix)
          )

      flatMessages = {
        ...flatMessages,
        ...newMessages,
      }
    })
  }
  return flatMessages
}

export const getI18nMessages = extra => {
  if (i18nMessages) {
    return i18nMessages
  }

  const locale = getGlobalLocale()
  const localePrefix = locale.split('-')[0]
  const i18n = getGlobalI18n()
  const i18nFlatMessages = getFlatMessages(i18n[locale], I18N_GLOBAL_KEYS)

  i18nMessages = {
    ...extra,
    ...i18nFlatMessages,
    ...localMessages[localePrefix],
    ...localMessages[locale],
  }

  return i18nMessages
}
