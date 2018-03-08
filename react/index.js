import React from 'react'
import { Provider } from 'react-redux'
import ClientSide from './components/ClientSide'
import Debugger from './components/Debugger'
import configureStore from './store/configureStore'

const renderRoot = () => {
  const store = configureStore()
  return (
    <Provider store={store}>
      <ClientSide>
        <Debugger />
      </ClientSide>
    </Provider>
  )
}
export default renderRoot