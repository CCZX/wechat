import request from './../../utils/request'

export default {
  getSystemInfo() {
    return request.get('/sys/syssituation')
  },
  getAvatar() {
    return request.get('/sys/faceimg')
  }
}
