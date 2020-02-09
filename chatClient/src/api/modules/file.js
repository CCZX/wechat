import request from '@/utils/request'

export default {
  uploadFile(data) {
    return request.post('/file/uploadfile', data)
  }
}
