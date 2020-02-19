import request from '@/utils/request'

export default {
  // 发表朋友圈动态
  publishPyqNews(data) {
    return request.post('/pyq/publishpyqnews', data)
  },
  getFriendlyPyq(data) {
    const { id, page, pageSize } = data
    return request.get(`/pyq/getfridenlypyq?id=${id}&page=${page}&pageSize=${pageSize}`)
  },
  // 朋友圈点赞
  doLike(data) {
    return request.post('/pyq/like', data)
  },
  // 朋友圈评论
  doComment(data) {
    return request.post('/pyq/comment', data)
  },
  deletePyqItem(data) {
    return request.post('pyq/deletepyq', data)
  }
}
