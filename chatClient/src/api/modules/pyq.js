import request from '@/utils/request'

export default {
  // 发表朋友圈动态
  publishPyqNews(data) {
    return request.post('/pyq/publishpyqnews', data)
  },
  getFriendlyPyq(id) {
    return request.get(`/pyq/getfridenlypyq?id=${id}`)
  }
}
