import request from '@/utils/request'

export default {
  login(data) {
    return request.post('/user/login', data)
  },
  getCVCode() { // 获取验证码
    return request.get('/user/getcode')
  },
  register(data) { // 注册
    return request.post('/user/register', data)
  },
  getUserInfo(id) {
    return request.get(`/user/userinfo?id=${id}`)
  },
  preFetchUser(data) {
    let { type, q } = data
    return request.get(`/user/prefetchuser?type=${type}&q=${q}`)
  } 
}
