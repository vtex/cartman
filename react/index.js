import React from 'react'
import { Provider } from 'react-redux'
import ClientSide from './components/ClientSide'
import Sidebar from './components/Sidebar'
import configureStore from './store/configureStore'

const renderRoot = () => {
  const store = configureStore()

  return (
    <Provider store={store}>
      <ClientSide>
        <Sidebar />
      </ClientSide>
    </Provider>
  )
}
export default renderRoot
