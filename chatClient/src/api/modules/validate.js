import request from '@/utils/request'
import { API } from './../index'

export default {
  getMyValidateNews(data) {
    const { id } = data
    return request.get(`${API}/validate/myvalidatenews?id=${id}`)
  }
}
