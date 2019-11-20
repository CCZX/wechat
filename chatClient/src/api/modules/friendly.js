import request from '@/utils/request'

export default {
  getMyFriends(id) {
    return request.get(`/friendly/myfriends?id=${id}`)
  }
}
