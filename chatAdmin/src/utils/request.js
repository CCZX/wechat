import axios from 'axios'
import store from './../store'
import { actionCreators } from './../store/modules/app'

const instance = axios.create({
  timeout: 7000,
  baseURL: '/api/v1'
})

instance.interceptors.request.use(
  config => {
    store.dispatch(actionCreators.toggleLoading(true))
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    store.dispatch(actionCreators.toggleLoading(false))
    return response
  },
  err => {
    store.dispatch(actionCreators.toggleLoading(false))
    return Promise.reject(err)
  }
)

export default instance
