import request from '@/utils/request'
import { API } from './../index'

export default {
  /**
   * 根据用户名获取其对应的群聊，用户名在user实体中对应name字段
   * @param {Object} data 
   */
  getMyGroup(data) {
    let { userName } = data
    return request.get(`${API}/group/getmygroup?userName=${userName}`)
  },
  /**
   * 根据id获取群聊详情
   * @param {*} data 
   */
  getGroupInfo(data) {
    let { id } = data
    return request.get(`${API}/group/groupinfo?id=${id}`)
  },
  preFetchGroup(data) {
    const { type, q, page, pageSize } = data // type可以是title以及code
    return request.get(`${API}/group/prefetchgroup?type=${type}&q=${q}&page=${page}&pageSize=${pageSize}`)
  },
  /**
   * 创建群聊
   * @param {*} data 
   */
  createGroup(data) {
    return request.post(`${API}/group/create`, data)
  },
  getRecentGroupConversation(data) {
    return request.post(`${API}/group/recent`, data)
  },
  /**
   * ------------------华丽分界线，以下是和群组消息有关的API------------------------
   */
  /**
   * 
   * @param {data} Object
   */
  getRecentGroupNews(data) {
    const { roomid, page, pageSize } = data
    return request.get(`${API}/groupnews/recentnews?roomid=${roomid}&page=${page}&pageSize=${pageSize}`)
  },
  getGroupHistoryMsg(data) {
    return request.post(`${API}/groupnews/historymsg`, data)
  },
  getGroupLastNews(data) {
    return request.post(`${API}/groupnews/lastnews`, data)
  }
}
