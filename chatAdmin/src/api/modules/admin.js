import request from './../../utils/request'

export default {
  /**管理员登录 */
  login(data) {
    return request.post('/superuser/login', data)
  },
  /**添加管理员 */
  add(data) {
    return request.post('/superuser/add', data)
  },
  /**获取所有管理员 */
  getAllSuperUser() {
    return request.get('/superuser/all')
  }
}
