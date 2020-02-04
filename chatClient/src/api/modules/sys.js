import request from '@/utils/request'

export default {
  getSysUsers() {
    return request.get('/sys/sysusers')
  },
  getQiniuToken() {
    return request.get('/sys/qiniutoken')
  }
}
