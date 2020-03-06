import axios from 'axios'
import { Message } from 'element-ui'
import { isProduction } from './index'
import router from './../router'
import { getCookie, setCookie, removeCookie } from './token'
let instance = axios.create({
  timeout: 7000,
  // baseURL: '/api/v1'
  baseURL: '/'
})

instance.interceptors.request.use(
  config => {
    const token = getCookie()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  err => {
    Promise.reject(err)
  }
)

// 成功：2000，失败（无数据）：2001，未登录：2002，服务端错误：2003
// 登录成功：1000，登录失败（账号或密码错误）：1001，验证码错误：1002
// 用户已被注册:1003,注册失败:1004,注册成功:1005,用户验证过期：1006
// 验证码过期：1007
instance.interceptors.response.use(
  response => {
    if (response.data.status === 1000) {
      setCookie(response.data.token)
    }
    if (response.data.status === 2002) { // 未登录
      Message({
        message: '请先登录',
        type: 'warning',
        duration: 3000
      })
      router.push('/login')
    } else if (response.data.status === 2003) {
      Message({
        message: '服务端错误,请稍后重试',
        type: 'error',
        duration: 3000
      })
    } else if (response.data.status === 1006) {
      Message({
        message: '登录过期',
        type: 'warning',
        duration: 3000
      })
      removeCookie()
      router.push('/login')
    } else if (response.data.status === 1007) {
      Message({
        message: '验证码过期！',
        type: 'warning',
        duration: 3000
      })
    }
    return response
  },
  error => {
    console.log('请求错误',error)
    Message({
      message: '网络超时！',
      type: 'error',
      duration: 3000
    })
    return Promise.reject(error)
  }
)

export default instance
