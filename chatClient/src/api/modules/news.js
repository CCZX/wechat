import request from '@/utils/request'

export default {
  getRecentNews(data) {
    const { roomid, page, pageSize } = data
    return request.get(`/news/recent?roomid=${roomid}&page=${page}&pageSize=${pageSize}`)
  }
}
