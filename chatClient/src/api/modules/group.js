import request from '@/utils/request'

export default {
  /**
   * 根据用户名获取其对应的群聊，用户名在user实体中对应name字段
   * @param {Object} data 
   */
  getMyGroup(data) {
    let { userName } = data
    return request.get(`/group/getmygroup?userName=${userName}`)
  },
  /**
   * 根据id获取群聊详情
   * @param {*} data 
   */
  getGroupInfo(data) {
    let { id } = data
    return request.get(`/group/groupinfo?id=${id}`)
  },
  /**
   * ------------------华丽分界线，以下是和群组消息有关的API------------------------
   */
  /**
   * 
   * @param {data} Object
   */
  getRecentGroupNews(data) {
    const { roomid } = data
    return request.get(`/groupnews/recentnews?roomid=${roomid}`)
  }
}
