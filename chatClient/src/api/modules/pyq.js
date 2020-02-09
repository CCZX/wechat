import request from '@/utils/request'

export default {
  // 发表朋友圈动态
  publishPyqNews(data) {
    return request.post('/pyq/publishpyqnews', data)
  },
  getFriendlyPyq(data) {
    const { id, page, pageSize } = data
    return request.get(`/pyq/getfridenlypyq?id=${id}&page=${page}&pageSize=${pageSize}`)
  }
}
