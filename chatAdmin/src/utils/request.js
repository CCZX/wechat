import axios from 'axios'
import { message } from 'antd'
import { HashRouter } from 'react-router-dom'
import store from './../store'
import { actionCreators } from './../store/modules/app'
import { getToken } from './index'

const Router = new HashRouter()

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
    const statusCode = Number(response.data.status)
    if (statusCode === 2002) {
      message.error('请先登录！')
      Router.history.push('/login')
    }
    if (statusCode === 1006) {
      message.error('请重新登录！')
      Router.history.push('/login')
    }
    if (statusCode === 4001) {
      message.error('没有操作的权限！')
    }
    if (statusCode === 2003) {
      message.error('服务端错误！')
    }
    return response
  },
  err => {
    store.dispatch(actionCreators.toggleLoading(false))
    return Promise.reject(err)
  }
)

export default instance
