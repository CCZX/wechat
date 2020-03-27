import request from '@/utils/request'
import { API } from './../index'

export default {
  // 发表朋友圈动态
  publishPyqNews(data) {
    return request.post(`${API}/pyq/publishpyqnews`, data)
  },
  getFriendlyPyq(data) {
    const { id, page, pageSize } = data
    return request.get(`${API}/pyq/getfridenlypyq?id=${id}&page=${page}&pageSize=${pageSize}`)
  },
  // 朋友圈点赞
  doLike(data) {
    return request.post(`${API}/pyq/like`, data)
  },
  // 朋友圈评论
  doComment(data) {
    return request.post(`${API}/pyq/comment`, data)
  },
  deletePyqItem(data) {
    return request.post(`${API}/pyq/deletepyq`, data)
  },
  getPyqItemInfo(data) {
    const  { pyqId, userId } = data
    return request.get(`${API}/pyq/pyqinfo?pyqId=${pyqId}&userId=${userId}`)
  },
  modifyPyqItem(data) {
    return request.post(`${API}/pyq/pyqmodify`, data)
  },
  /**
   * 获取某个用户的朋友圈
   * @param {*} data 
   */
  getUserPyq(data) {
    return request.post(`${API}/pyq/getuserpyq`, data)
  }
}
