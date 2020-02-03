import request from '@/utils/request'

export default {
  getMyValidateNews(data) {
    const { id } = data
    return request.get(`/validate/myvalidatenews?id=${id}`)
  }
}
