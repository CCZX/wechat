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
  }
}
