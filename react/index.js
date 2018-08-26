import React from 'react'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import Sidebar from './components/Sidebar'
import configureStore from './store/configureStore'

import { getGlobalLocale, getI18nMessages } from './utils/locale'

const renderRoot = () => {
  const locale = getGlobalLocale()
  const messages = getI18nMessages()
  const store = configureStore()

  return (
    <Provider store={store}>
      <ClientSide>
        <Sidebar/>
      </ClientSide>
    </Provider>
  )
}
export default renderRoot
 