import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { isProduction } from './index'
import router from './../router'
let loadingInstance = null
let instance = axios.create({
  timeout: 7000,
  baseURL: isProduction() ? 'http://localhost:3333' : '/api/v1'
})

instance.interceptors.request.use(
  config => {
    return config
  },
  err => {
    Promise.reject(err)
  }
)

// 成功：2000，失败（无数据）：2001，未登录：2002，服务端错误：2003
// 登录成功：1000，登录失败（账号或密码错误）：1001，验证码错误：1002，用户已被注册:1003,注册失败:1004,注册成功:1005
instance.interceptors.response.use(
  response => {
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
    }
    //  else if (response.data.status === 1000) {
    //   Message({
    //     message: '登录成功',
    //     type: 'success',
    //     duration: 3000
    //   })
    // } else if (response.data.status === 1001) {
    //   Message({
    //     message: '账号或密码错误',
    //     type: 'error',
    //     duration: 3000
    //   })
    // }
    return response
  },
  err => {
    if(error.message.includes('timeout')){
      console.log("错误回调", error)
      alert("网络超时")
      return Promise.reject(error)
    }
    return Promise.reject(err)
  }
)

export default instance
