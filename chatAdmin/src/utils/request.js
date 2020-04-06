import axios from 'axios'
import { message } from 'antd'
import store from './../store'
import { actionCreators } from './../store/modules/app'
import { getToken } from './index'

const instance = axios.create({
  timeout: 7000,
  baseURL: '/api/v1'
})

instance.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = token      
    }
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
    if (Number(response.data.status) === 2002) {
      message.error('请先登录！')
      window.location.href = `${window.location.origin}/login`
    }
    if (Number(response.data.status) === 4001) {
      message.error('没有操作的权限！')
    }
    return response
  },
  err => {
    store.dispatch(actionCreators.toggleLoading(false))
    return Promise.reject(err)
  }
)

export default instance
