import React from 'react'
import ReactDOM from 'react-dom'
import Router from './route'
import { Provider } from 'react-redux'
import store from './store'
import './styles/base.scss'
import './index.css'

const App = (
  <Provider store={store}>
    <Router />
  </Provider>
)

ReactDOM.render(App, document.getElementById('root'))
