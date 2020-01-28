import request from '@/utils/request'

export default {
  getRecentNews(data) {
    const { roomid } = data
    return request.get(`/news/recent?roomid=${roomid}`)
  }
}
