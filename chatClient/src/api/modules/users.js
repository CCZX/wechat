import request from '@/utils/request'
import { API } from './../index'

export default {
  /**登录 */
  login(data) {
    return request.post(`${API}/user/login`, data)
  },
  /**获取验证码 */
  getCVCode() {
    return request.get(`${API}/user/getcode`)
  },
  /**注册 */
  register(data) {
    return request.post(`${API}/user/register`, data)
  },
  /**获取用户详情 */
  getUserInfo(id) {
    return request.get(`${API}/user/userinfo?id=${id}`)
  },
  /**获取用户（搜索） */
  preFetchUser(data) {
    let { type, q, page, pageSize } = data
    return request.get(`${API}/user/prefetchuser?type=${type}&q=${q}&page=${page}&pageSize=${pageSize}`)
  },
  /**添加分组 */
  addNewFenzu(data) {
    return request.post(`${API}/user/addfenzu`, data)
  },
  /**修改好友所在的分组 */
  modifyuserfenzu(data) {
    return request.post(`${API}/user/modifyuserfenzu`, data)
  },
  /**修改好友的备注 */
  modifyFriendBeizhu(data) {
    return request.post(`${API}/user/modifyfriendbeizhu`, data)
  },
  /**删除分组 */
  deleteFenzu(data) {
    return request.post(`${API}/user/delfenzu`, data)
  },
  /**编辑分组 */
  editFeznu(data) {
    return request.post(`${API}/user/editfenzu`, data)
  },
  /**更新用户相关信息 */
  updateUserInfo(data) {
    return request.post(`${API}/user/updateUserInfo`, data)
  },
  /**更新用户密码 */
  updateUserPwd(data) {
    return request.post(`${API}/user/updateUserPwd`, data)
  }
}
