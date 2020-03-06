import request from '@/utils/request'
import { API } from './../index'

export default {
  getRecentNews(data) {
    const { roomid, page, pageSize } = data
    return request.get(`${API}/news/recent?roomid=${roomid}&page=${page}&pageSize=${pageSize}`)
  }
}
