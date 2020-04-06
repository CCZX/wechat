import request from './../../utils/request'

export default {
  /**获取所有群聊 */
  getAllGroup() {
    return request.get('/group/all')
  }
}
