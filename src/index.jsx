import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAPI } from './api'
import App from './App'
import './index.scss'
import LoginAction from './components/Unauthorized/Login/loginActions'
import loginReducer from './components/Unauthorized/Login/loginReducer'

const onUnauthorized = () => {
  store.dispatch({ type: LoginAction.LOG_OUT })
}

const api = createAPI(onUnauthorized)

const reducer = combineReducers({ session: loginReducer })

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById(`root`),
)
