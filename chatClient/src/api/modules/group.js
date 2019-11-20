import request from '@/utils/request'

export default {
  getMyGroup(data) {
    let { userName } = data
    return request.get(`/group/getmygroup?userName=${userName}`)
  },
  getGroupInfo(data) {
    let { id } = data
    return request.get(`/group/groupinfo?id=${id}`)
  }
}
