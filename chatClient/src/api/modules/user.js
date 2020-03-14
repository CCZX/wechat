import request from '@/utils/request'
import { API } from './../index'
const BASE_URL = `${API}/user`

export default {
  login(data) {
    return request.post(`${API}/user/login`, data)
  },
  getCVCode() { // 获取验证码
    return request.get(`${API}/user/getcode`)
  },
  register(data) { // 注册
    return request.post(`${API}/user/register`, data)
  },
  getUserInfo(id) {
    return request.get(`${API}/user/userinfo?id=${id}`)
  },
  preFetchUser(data) {
    let { type, q, page, pageSize } = data
    return request.get(`${API}/user/prefetchuser?type=${type}&q=${q}&page=${page}&pageSize=${pageSize}`)
  },
  addNewFenzu(data) {
    return request.post(`${API}/user/addfenzu`, data)
  },
  modifyuserfenzu(data) {
    return request.post(`${API}/user/modifyuserfenzu`, data)
  },
  modifyFriendBeizhu(data) {
    return request.post(`${API}/user/modifyfriendbeizhu`, data)
  },
  deleteFenzu(data) {
    return request.post(`${API}/user/delfenzu`, data)
  },
  editFeznu(data) { // 编辑某项分组名称
    return request.post(`${API}/user/editfenzu`, data)
  }
}
