import request from '@/utils/request'
import { API } from './../index'

export default {
  /**发布博客 */
  publishBlog(data) {
    return request.post(`${API}/blog/publish`, data)
  },
  /**获取博客列表 */
  getBlogList(data) {
    return request.post(`${API}/blog/getBlogList`, data)
  },
  /**查看博客详情 */
  getBlogInfo(id) {
    return request.get(`${API}/blog/getBlogInfo?id=${id}`)
  },
  /**获取博客的所有分类 */
  getBlogCategory() {
    return request.get(`${API}/blog/getBlogCategory`)
  },
  getBlogTag(cateId) {
    return request.get(`${API}/blog/getBlogTag?cateId=${cateId}`)
  }
}
