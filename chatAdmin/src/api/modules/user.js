import request from './../../utils/request'

export default {
  getAllUser() {
    return request.get(`/user/getalluser`)
  },
  /**
   * 
   * @param {*} month 表示获取哪一个月的用户注册数量
   */
  getUserBySignTime(month) {
    const { gt, lt } = month
    return request.get(`/user/getuserbysigntime?gt=${gt}&lt=${lt}`)
  },
  getUserInfo(id) {
    return request.get(`/user/userinfo?id=${id}`)
  },
  changeUserStatus(data) { // 更改用户状态：0；正常，1：冻结，2：注销
    return request.post(`/user/changestatus`, data)
  },
  getOnlineUser() {
    return request.get(`/user/onlineusers`)
  }
}
