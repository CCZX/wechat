import request from '@/utils/request'
import { API } from './../index'

export default {
  publishBlog(data) {
    return request.post(`${API}/blog/publish`, data)
  },
  getBlogList(data) {
    return request.post(`${API}/blog/getBlogList`, data)
  },
  getBlogInfo(id) {
    return request.get(`${API}/blog/getBlogInfo?id=${id}`)
  }
}
