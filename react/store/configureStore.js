import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers/index'
import thunkMiddleware from 'redux-thunk'

const initialState = {}
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

const configureStore = (defaultState = {}) => {
  const state = {
    ...initialState,
    ...defaultState,
  }

  return createStoreWithMiddleware(
    reducers,
    state,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
}

export default configureStore