import request from './../../utils/request'

export default {
  getAllUser() {
    return request.get(`/user/getalluser`)
  },
  getUserBySignTime() {
    return request.get(`/user/getuserbysigntime`)
  },
  getUserInfo(id) {
    return request.get(`/user/userinfo?id=${id}`)
  },
  changeUserStatus(data) { // 更改用户状态：0；正常，1：冻结，2：注销
    return request.post(`/user/changestatus`, data)
  }
}
