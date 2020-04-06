import request from '@/utils/request'
import { API } from './../index'

export default {
  getSysUsers() {
    return request.get(`${API}/sys/sysusers`)
  },
  getQiniuToken() {
    return request.get(`${API}/sys/qiniutoken`)
  },
  // 获取天气信息
  getWeather(city) {
    return request.get(`http://wthrcdn.etouch.cn/weather_mini?city=${city}`)
  },
  getFaceImgs() {
    return request.get(`${API}/sys/faceimg`)
  },
  /**上传文件 */
  uploadFile(data) {
    return request.post(`${API}/sys/upfile`, data)
  }
}
